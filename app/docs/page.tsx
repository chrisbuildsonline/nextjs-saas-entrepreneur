import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Book, Code, Zap, Download, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
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
            📚 Complete Documentation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Documentation & Guides</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to get started with the NextJS SaaS Entrepreneur Starter. From setup to deployment.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-6 w-6 mr-2 text-blue-600" />
              Quick Start (5 Minutes)
            </CardTitle>
            <CardDescription>Get your SaaS up and running in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div># Clone the repository</div>
              <div>git clone https://github.com/yourusername/nextjs-saas-entrepreneur-starter.git</div>
              <div className="mt-2"># Install dependencies</div>
              <div>cd nextjs-saas-entrepreneur-starter</div>
              <div>npm install</div>
              <div className="mt-2"># Set up environment variables</div>
              <div>cp .env.example .env.local</div>
              <div className="mt-2"># Start development server</div>
              <div>npm run dev</div>
            </div>
            <div className="flex gap-4">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Starter
              </Button>
              <Button variant="outline">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Getting Started",
              description: "Installation, setup, and first steps",
              icon: <Book className="h-6 w-6 text-blue-600" />,
              items: ["Installation", "Environment Setup", "Database Configuration", "First Run"],
            },
            {
              title: "Authentication",
              description: "User management and security",
              icon: <Code className="h-6 w-6 text-green-600" />,
              items: ["Supabase Auth", "Social Logins", "Password Reset", "User Roles"],
            },
            {
              title: "Payments",
              description: "Stripe integration and billing",
              icon: <Code className="h-6 w-6 text-purple-600" />,
              items: ["Stripe Setup", "Subscriptions", "Webhooks", "Customer Portal"],
            },
            {
              title: "Database",
              description: "Supabase database and queries",
              icon: <Code className="h-6 w-6 text-orange-600" />,
              items: ["Schema Design", "Row Level Security", "Migrations", "API Routes"],
            },
            {
              title: "UI Components",
              description: "shadcn/ui and custom components",
              icon: <Code className="h-6 w-6 text-pink-600" />,
              items: ["Component Library", "Theming", "Dark Mode", "Responsive Design"],
            },
            {
              title: "Deployment",
              description: "Production deployment guides",
              icon: <Code className="h-6 w-6 text-teal-600" />,
              items: ["Vercel Deploy", "Docker Setup", "Environment Variables", "Domain Setup"],
            },
          ].map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  {section.icon}
                  <span className="ml-2">{section.title}</span>
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 cursor-pointer">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                  View Guide
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
            <CardDescription>Complete API documentation for all endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Authentication Endpoints</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      POST
                    </Badge>
                    <code>/api/auth/signup</code>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      POST
                    </Badge>
                    <code>/api/auth/signin</code>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      POST
                    </Badge>
                    <code>/api/auth/signout</code>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Payment Endpoints</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      POST
                    </Badge>
                    <code>/api/create-checkout-session</code>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      POST
                    </Badge>
                    <code>/api/stripe/webhook</code>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      GET
                    </Badge>
                    <code>/api/subscription</code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Get support from our community and team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Github className="h-6 w-6 mb-2" />
                GitHub Issues
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Book className="h-6 w-6 mb-2" />
                Discord Community
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <ExternalLink className="h-6 w-6 mb-2" />
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
