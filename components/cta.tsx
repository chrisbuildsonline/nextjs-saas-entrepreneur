import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <Zap className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch Your SaaS?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of entrepreneurs who've accelerated their startup journey with our production-ready
            boilerplate. Stop building the same features over and over again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View Documentation
              </Button>
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-75">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
