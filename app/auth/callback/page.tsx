"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/auth/signin?error=Authentication failed')
          return
        }

        if (data.session) {
          router.push('/dashboard')
        } else {
          router.push('/auth/signin')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/auth/signin?error=Authentication failed')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  )
}