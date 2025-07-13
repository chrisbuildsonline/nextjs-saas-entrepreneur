"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for side projects and small apps",
    features: ["Up to 1,000 users", "Basic analytics", "Email support", "Core features", "5GB storage"],
    popular: false,
    priceId: "price_starter",
  },
  {
    name: "Pro",
    price: "$99",
    description: "Best for growing businesses",
    features: [
      "Up to 10,000 users",
      "Advanced analytics",
      "Priority support",
      "All features",
      "Custom integrations",
      "50GB storage",
      "API access",
    ],
    popular: true,
    priceId: "price_pro",
  },
  {
    name: "Enterprise",
    price: "$299",
    description: "For large-scale applications",
    features: [
      "Unlimited users",
      "Custom analytics",
      "24/7 phone support",
      "White-label options",
      "Dedicated account manager",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
    priceId: "price_enterprise",
  },
]

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleGetStarted = async (priceId: string) => {
    setLoadingPlan(priceId)

    try {
      // For demo purposes, redirect to signup
      // In production, this would create a Stripe checkout session
      toast({
        title: "Redirecting to signup",
        description: "You'll be able to select this plan after creating your account.",
      })

      setTimeout(() => {
        router.push("/auth/signup")
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setLoadingPlan(null)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">SaaS Entrepreneur</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade at any time. All plans include a 14-day free
            trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? "border-blue-500 shadow-xl scale-105 dark:border-blue-400"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleGetStarted(plan.priceId)}
                  disabled={loadingPlan === plan.priceId}
                >
                  {loadingPlan === plan.priceId ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  14-day free trial • No credit card required
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I change plans at any time?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your
                next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What happens after the free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                After your 14-day free trial ends, you'll be automatically charged for your selected plan. You can
                cancel at any time during the trial period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us for a
                full refund.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of entrepreneurs building successful SaaS businesses.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
