"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, TrendingUp, Activity, CreditCard, Settings, Bell, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { demoGetCurrentUser as getCurrentUser, demoSignOut as signOut } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { analytics, trackPageView, trackFeatureUsed } from "@/lib/analytics"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/auth/signin")
        return
      }
      setUser(currentUser)
      
      // Load analytics data
      const userMetrics = analytics.getUserMetrics()
      const revenueMetrics = analytics.getRevenueMetrics()
      const conversionMetrics = analytics.getConversionMetrics()
      const chartData = analytics.getChartData()
      
      setMetrics({
        users: userMetrics,
        revenue: revenueMetrics,
        conversions: conversionMetrics,
        charts: chartData
      })
      
      setIsLoading(false)
      
      // Track page view
      trackPageView('/dashboard', currentUser.id)
    }

    loadUser()
  }, [router])

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      })
      router.push("/")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Dashboard Header */}
      <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back, {user?.user_metadata?.name || user?.email}!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Link href="/settings">
                <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white dark:bg-slate-800 px-4 py-2">
            <div className="space-y-2">
              <Link href="/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics ? metrics.users.totalUsers.toLocaleString() : "Loading..."}
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics ? `+${metrics.users.growth}% from last month` : "Loading..."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics ? `$${metrics.revenue.totalRevenue.toLocaleString()}` : "Loading..."}
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics ? `+${metrics.revenue.growth}% from last month` : "Loading..."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics ? `+${metrics.users.growth}%` : "Loading..."}
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics ? `${metrics.users.newUsers} new users this month` : "Loading..."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics ? metrics.users.activeUsers.toLocaleString() : "Loading..."}
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics ? `${metrics.users.churnRate}% churn rate` : "Loading..."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Subscription Status
              </CardTitle>
              <CardDescription>Your current plan and usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Current Plan</span>
                <Badge>Free Plan</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Users</span>
                  <span>1 / 5</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Storage</span>
                  <span>2GB / 10GB</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <Link href="/pricing">
                <Button className="w-full">Upgrade Plan</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Account created", time: "Just now", type: "user" },
                  { action: "Welcome email sent", time: "1 minute ago", type: "system" },
                  { action: "Profile updated", time: "5 minutes ago", type: "update" },
                  { action: "Dashboard accessed", time: "10 minutes ago", type: "system" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "user"
                          ? "bg-green-500"
                          : activity.type === "payment"
                            ? "bg-blue-500"
                            : activity.type === "update"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/settings">
                <Button variant="outline" className="w-full h-20 flex-col bg-transparent">
                  <Settings className="h-6 w-6 mb-2" />
                  Settings
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="w-full h-20 flex-col bg-transparent">
                  <CreditCard className="h-6 w-6 mb-2" />
                  Upgrade
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                Invite Users
              </Button>
              <Button variant="outline" className="w-full h-20 flex-col bg-transparent">
                <Activity className="h-6 w-6 mb-2" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
