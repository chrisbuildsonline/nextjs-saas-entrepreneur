"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Calendar, TrendingUp, AlertCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SubscriptionData {
  plan: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  usage: {
    seats: { used: number; total: number }
    storage: { used: number; total: number }
    requests: { used: number; total: number }
  }
}

export default function SubscriptionManagement() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Mock subscription data - replace with real API call
    const mockSubscription: SubscriptionData = {
      plan: "Pro Plan",
      status: "active",
      currentPeriodStart: "2024-01-01",
      currentPeriodEnd: "2024-02-01",
      cancelAtPeriodEnd: false,
      usage: {
        seats: { used: 3, total: 10 },
        storage: { used: 2.5, total: 100 },
        requests: { used: 1250, total: 10000 }
      }
    }

    setTimeout(() => {
      setSubscription(mockSubscription)
      setLoading(false)
    }, 1000)
  }, [])

  const handleManageBilling = () => {
    // In production, this would open the Stripe customer portal
    toast({
      title: "Redirecting to billing portal",
      description: "You will be redirected to manage your billing information.",
    })
  }

  const handleCancelSubscription = () => {
    if (!subscription) return
    
    setSubscription({
      ...subscription,
      cancelAtPeriodEnd: true
    })
    
    toast({
      title: "Subscription will be canceled",
      description: "Your subscription will be canceled at the end of the current billing period.",
      variant: "destructive"
    })
  }

  const handleReactivateSubscription = () => {
    if (!subscription) return
    
    setSubscription({
      ...subscription,
      cancelAtPeriodEnd: false
    })
    
    toast({
      title: "Subscription reactivated",
      description: "Your subscription has been reactivated and will continue.",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, text: "Active" },
      canceled: { variant: "destructive" as const, text: "Canceled" },
      past_due: { variant: "destructive" as const, text: "Past Due" },
      trialing: { variant: "secondary" as const, text: "Trial" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100)
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!subscription) return null

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Subscription Details
            </span>
            {getStatusBadge(subscription.status)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Current Plan</p>
              <p className="text-2xl font-bold">{subscription.plan}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Billing Cycle</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
          </div>

          {subscription.cancelAtPeriodEnd && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700 dark:text-red-300">
                Your subscription will be canceled on {formatDate(subscription.currentPeriodEnd)}
              </span>
            </div>
          )}

          <div className="flex space-x-2">
            <Button onClick={handleManageBilling} className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Billing
            </Button>
            {subscription.cancelAtPeriodEnd ? (
              <Button variant="outline" onClick={handleReactivateSubscription}>
                Reactivate Subscription
              </Button>
            ) : (
              <Button variant="destructive" onClick={handleCancelSubscription}>
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Team Seats</span>
                <span className="text-sm text-muted-foreground">
                  {subscription.usage.seats.used} / {subscription.usage.seats.total}
                </span>
              </div>
              <Progress value={getUsagePercentage(subscription.usage.seats.used, subscription.usage.seats.total)} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Storage (GB)</span>
                <span className="text-sm text-muted-foreground">
                  {subscription.usage.storage.used} / {subscription.usage.storage.total}
                </span>
              </div>
              <Progress value={getUsagePercentage(subscription.usage.storage.used, subscription.usage.storage.total)} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">API Requests</span>
                <span className="text-sm text-muted-foreground">
                  {subscription.usage.requests.used.toLocaleString()} / {subscription.usage.requests.total.toLocaleString()}
                </span>
              </div>
              <Progress value={getUsagePercentage(subscription.usage.requests.used, subscription.usage.requests.total)} />
            </div>
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            <p>Usage resets on {formatDate(subscription.currentPeriodEnd)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}