import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerClient } from "@/lib/supabase"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = headers()
  const sig = headersList.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createServerClient()

  try {
    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
        const subscriptionCreated = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(supabase, subscriptionCreated)
        break

      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(supabase, subscriptionUpdated)
        break

      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(supabase, subscriptionDeleted)
        break

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(supabase, invoice)
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(supabase, failedInvoice)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleSubscriptionCreated(supabase: any, subscription: Stripe.Subscription) {
  const { error } = await supabase.from("subscriptions").insert({
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer,
    stripe_price_id: subscription.items.data[0].price.id,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000),
    current_period_end: new Date(subscription.current_period_end * 1000),
  })

  if (error) {
    console.error("Error creating subscription:", error)
    throw error
  }
}

async function handleSubscriptionUpdated(supabase: any, subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: subscription.status,
      stripe_price_id: subscription.items.data[0].price.id,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
    })
    .eq("stripe_subscription_id", subscription.id)

  if (error) {
    console.error("Error updating subscription:", error)
    throw error
  }
}

async function handleSubscriptionDeleted(supabase: any, subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("stripe_subscription_id", subscription.id)

  if (error) {
    console.error("Error deleting subscription:", error)
    throw error
  }
}

async function handlePaymentSucceeded(supabase: any, invoice: Stripe.Invoice) {
  const { error } = await supabase.from("payments").insert({
    stripe_payment_intent_id: invoice.payment_intent,
    stripe_customer_id: invoice.customer,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: "succeeded",
  })

  if (error) {
    console.error("Error recording payment:", error)
    throw error
  }
}

async function handlePaymentFailed(supabase: any, invoice: Stripe.Invoice) {
  // Handle failed payment - send email, update user status, etc.
  console.log("Payment failed for invoice:", invoice.id)

  // You can implement logic here to:
  // - Send notification emails
  // - Update user subscription status
  // - Implement dunning management
}
