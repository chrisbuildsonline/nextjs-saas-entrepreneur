import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using NextJS SaaS Entrepreneur Starter, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of NextJS SaaS Entrepreneur Starter per purchase for
            personal, non-commercial transitory viewing only.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on NextJS SaaS Entrepreneur Starter are provided on an 'as is' basis. NextJS SaaS Entrepreneur
            Starter makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties
            including without limitation, implied warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall NextJS SaaS Entrepreneur Starter or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption) arising out of the
            use or inability to use the materials on NextJS SaaS Entrepreneur Starter, even if NextJS SaaS Entrepreneur
            Starter or a NextJS SaaS Entrepreneur Starter authorized representative has been notified orally or in
            writing of the possibility of such damage.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on NextJS SaaS Entrepreneur Starter could include technical, typographical, or
            photographic errors. NextJS SaaS Entrepreneur Starter does not warrant that any of the materials on its
            website are accurate, complete, or current.
          </p>

          <h2>6. Links</h2>
          <p>
            NextJS SaaS Entrepreneur Starter has not reviewed all of the sites linked to our website and is not
            responsible for the contents of any such linked site.
          </p>

          <h2>7. Modifications</h2>
          <p>
            NextJS SaaS Entrepreneur Starter may revise these terms of service for its website at any time without
            notice. By using this website, you are agreeing to be bound by the then current version of these terms of
            service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the United States
            and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </div>
    </div>
  )
}
