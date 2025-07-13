import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Zap,
  Shield,
  Rocket,
  Users,
  Star,
  Check,
  Code,
  Database,
  CreditCard,
  Mail,
  BarChart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FeaturesPage() {
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
          <Badge className="mb-4" variant="secondary">
            ⚡ Production-Ready Features
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Launch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A complete feature set designed to get your SaaS from idea to production in days, not months.
          </p>
        </div>

        {/* Hero Feature Image */}
        <div className="relative mx-auto max-w-4xl mb-16">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
              alt="Modern SaaS Development Workspace"
              width={1000}
              height={600}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Production-Ready Architecture</h3>
              <p className="text-lg opacity-90">Built for scale, security, and performance</p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Shield className="h-8 w-8 text-blue-600" />,
              title: "Authentication & Security",
              description:
                "Complete auth system with social logins, email verification, and role-based access control.",
              features: [
                "Email/Password Auth",
                "Social Logins (Google, GitHub)",
                "Email Verification",
                "Password Reset",
                "2FA Support",
                "JWT Tokens",
              ],
              image:
                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
              icon: <CreditCard className="h-8 w-8 text-green-600" />,
              title: "Stripe Integration",
              description: "Full payment processing with subscriptions, invoices, and webhook handling built-in.",
              features: [
                "Subscription Management",
                "One-time Payments",
                "Invoice Generation",
                "Webhook Handling",
                "Customer Portal",
                "Multi-currency",
              ],
              image:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
              icon: <Database className="h-8 w-8 text-purple-600" />,
              title: "Database & Backend",
              description: "Production-ready database with Supabase, including RLS and real-time features.",
              features: [
                "PostgreSQL Database",
                "Row Level Security",
                "Real-time Updates",
                "Database Migrations",
                "API Routes",
                "Type Safety",
              ],
              image:
                "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
              icon: <Code className="h-8 w-8 text-orange-600" />,
              title: "Modern Tech Stack",
              description: "Built with Next.js 15, TypeScript, Tailwind CSS, and the latest web technologies.",
              features: [
                "Next.js 15 App Router",
                "TypeScript",
                "Tailwind CSS",
                "shadcn/ui Components",
                "Server Components",
                "Edge Runtime",
              ],
              image:
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
              icon: <Users className="h-8 w-8 text-pink-600" />,
              title: "User Management",
              description: "Complete user dashboard with profile management, billing, and subscription controls.",
              features: [
                "User Dashboard",
                "Profile Management",
                "Billing Portal",
                "Subscription Controls",
                "Usage Analytics",
                "Team Management",
              ],
              image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
              icon: <BarChart className="h-8 w-8 text-teal-600" />,
              title: "Analytics & Monitoring",
              description: "Built-in analytics, error tracking, and performance monitoring for your SaaS.",
              features: [
                "User Analytics",
                "Revenue Tracking",
                "Error Monitoring",
                "Performance Metrics",
                "Custom Events",
                "Real-time Dashboard",
              ],
              image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">{feature.icon}</div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Additional Production Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Mail className="h-6 w-6 text-blue-600" />,
                title: "Email System",
                description: "Transactional emails with Resend",
              },
              {
                icon: <Star className="h-6 w-6 text-yellow-600" />,
                title: "SEO Optimized",
                description: "Meta tags, structured data, sitemaps",
              },
              {
                icon: <Rocket className="h-6 w-6 text-purple-600" />,
                title: "Deployment Ready",
                description: "Docker, Vercel, AWS configurations",
              },
              {
                icon: <Shield className="h-6 w-6 text-green-600" />,
                title: "Security First",
                description: "CSRF protection, rate limiting, validation",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Production-Grade Tech Stack</CardTitle>
            <CardDescription>Built with the latest and most reliable technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Next.js 15", description: "React framework with App Router", color: "bg-black text-white" },
                { name: "TypeScript", description: "Type-safe development", color: "bg-blue-600 text-white" },
                { name: "Tailwind CSS", description: "Utility-first CSS framework", color: "bg-cyan-500 text-white" },
                { name: "Supabase", description: "PostgreSQL database & auth", color: "bg-green-600 text-white" },
                { name: "Stripe", description: "Payment processing", color: "bg-purple-600 text-white" },
                { name: "shadcn/ui", description: "Beautiful UI components", color: "bg-gray-900 text-white" },
                { name: "Vercel", description: "Deployment platform", color: "bg-black text-white" },
                { name: "Resend", description: "Email delivery service", color: "bg-orange-600 text-white" },
              ].map((tech, index) => (
                <div key={index} className={`${tech.color} p-4 rounded-lg text-center`}>
                  <h3 className="font-semibold mb-1">{tech.name}</h3>
                  <p className="text-sm opacity-90">{tech.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Build Your SaaS?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with all these features and more. Launch your SaaS in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Building Now
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
