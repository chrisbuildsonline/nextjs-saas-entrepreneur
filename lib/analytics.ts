// Analytics service for tracking user interactions and business metrics
// This is a basic implementation that can be extended with Google Analytics, Mixpanel, etc.

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: Date
}

export interface UserMetrics {
  totalUsers: number
  activeUsers: number
  newUsers: number
  churnRate: number
  growth: number
}

export interface RevenueMetrics {
  totalRevenue: number
  monthlyRevenue: number
  averageRevenuePerUser: number
  growth: number
}

export interface ConversionMetrics {
  signupRate: number
  activationRate: number
  subscriptionRate: number
  churnRate: number
}

// Mock analytics service for development
export class AnalyticsService {
  private static instance: AnalyticsService
  private events: AnalyticsEvent[] = []

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  // Track events
  track(event: string, properties?: Record<string, any>, userId?: string) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      userId,
      timestamp: new Date()
    }

    this.events.push(analyticsEvent)
    
    // In development, log to console
    console.log('📊 Analytics Event:', analyticsEvent)

    // In production, send to analytics service
    this.sendToAnalyticsService(analyticsEvent)
  }

  // Track page views
  trackPageView(page: string, userId?: string) {
    this.track('page_view', { page }, userId)
  }

  // Track user actions
  trackUserAction(action: string, properties?: Record<string, any>, userId?: string) {
    this.track('user_action', { action, ...properties }, userId)
  }

  // Track business events
  trackBusinessEvent(event: string, properties?: Record<string, any>, userId?: string) {
    this.track('business_event', { event, ...properties }, userId)
  }

  // Get user metrics (mock data for development)
  getUserMetrics(): UserMetrics {
    return {
      totalUsers: 1247,
      activeUsers: 892,
      newUsers: 156,
      churnRate: 2.4,
      growth: 12.5
    }
  }

  // Get revenue metrics (mock data for development)
  getRevenueMetrics(): RevenueMetrics {
    return {
      totalRevenue: 48750,
      monthlyRevenue: 12400,
      averageRevenuePerUser: 39.2,
      growth: 18.3
    }
  }

  // Get conversion metrics (mock data for development)
  getConversionMetrics(): ConversionMetrics {
    return {
      signupRate: 3.2,
      activationRate: 68.5,
      subscriptionRate: 14.2,
      churnRate: 2.4
    }
  }

  // Get chart data for dashboard
  getChartData() {
    return {
      userGrowth: [
        { month: 'Jan', users: 800 },
        { month: 'Feb', users: 950 },
        { month: 'Mar', users: 1100 },
        { month: 'Apr', users: 1200 },
        { month: 'May', users: 1350 },
        { month: 'Jun', users: 1450 },
      ],
      revenue: [
        { month: 'Jan', revenue: 8500 },
        { month: 'Feb', revenue: 9200 },
        { month: 'Mar', revenue: 10100 },
        { month: 'Apr', revenue: 11000 },
        { month: 'May', revenue: 11800 },
        { month: 'Jun', revenue: 12400 },
      ],
      conversions: [
        { stage: 'Visitors', count: 12500 },
        { stage: 'Signups', count: 1247 },
        { stage: 'Activated', count: 854 },
        { stage: 'Subscribed', count: 177 },
      ]
    }
  }

  private async sendToAnalyticsService(event: AnalyticsEvent) {
    // In production, implement actual analytics service integration
    // Example: Google Analytics, Mixpanel, PostHog, etc.
    
    // For now, just store in localStorage for demo
    try {
      const stored = localStorage.getItem('analytics_events')
      const events = stored ? JSON.parse(stored) : []
      events.push(event)
      localStorage.setItem('analytics_events', JSON.stringify(events.slice(-100))) // Keep last 100 events
    } catch (error) {
      console.error('Error storing analytics event:', error)
    }
  }
}

// Common tracking functions
export const analytics = AnalyticsService.getInstance()

// Page tracking
export const trackPageView = (page: string, userId?: string) => {
  analytics.trackPageView(page, userId)
}

// User action tracking
export const trackUserSignup = (userId: string, method: 'email' | 'github' | 'google') => {
  analytics.trackUserAction('user_signup', { method }, userId)
}

export const trackUserLogin = (userId: string, method: 'email' | 'github' | 'google') => {
  analytics.trackUserAction('user_login', { method }, userId)
}

export const trackUserLogout = (userId: string) => {
  analytics.trackUserAction('user_logout', {}, userId)
}

// Business event tracking
export const trackSubscriptionCreated = (userId: string, planId: string, amount: number) => {
  analytics.trackBusinessEvent('subscription_created', { planId, amount }, userId)
}

export const trackSubscriptionCancelled = (userId: string, planId: string) => {
  analytics.trackBusinessEvent('subscription_cancelled', { planId }, userId)
}

export const trackPaymentSucceeded = (userId: string, amount: number) => {
  analytics.trackBusinessEvent('payment_succeeded', { amount }, userId)
}

export const trackPaymentFailed = (userId: string, amount: number, error: string) => {
  analytics.trackBusinessEvent('payment_failed', { amount, error }, userId)
}

// Feature usage tracking
export const trackFeatureUsed = (feature: string, userId?: string) => {
  analytics.trackUserAction('feature_used', { feature }, userId)
}

export const trackButtonClicked = (button: string, page: string, userId?: string) => {
  analytics.trackUserAction('button_clicked', { button, page }, userId)
}

// Error tracking
export const trackError = (error: string, context: string, userId?: string) => {
  analytics.track('error', { error, context }, userId)
}