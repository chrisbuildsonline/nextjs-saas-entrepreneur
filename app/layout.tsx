import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "NextJS SaaS Entrepreneur Starter",
    template: "%s | NextJS SaaS Entrepreneur Starter",
  },
  description:
    "Launch your SaaS startup in days, not months. Complete Next.js boilerplate with authentication, payments, and everything you need.",
  keywords: ["nextjs", "saas", "startup", "boilerplate", "stripe", "authentication", "entrepreneur"],
  authors: [{ name: "NextJS SaaS Entrepreneur Starter" }],
  creator: "NextJS SaaS Entrepreneur Starter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextjs-saas-entrepreneur.vercel.app",
    title: "NextJS SaaS Entrepreneur Starter",
    description: "Launch your SaaS startup in days, not months",
    siteName: "NextJS SaaS Entrepreneur Starter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextJS SaaS Entrepreneur Starter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJS SaaS Entrepreneur Starter",
    description: "Launch your SaaS startup in days, not months",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            {children}
            <Toaster />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
