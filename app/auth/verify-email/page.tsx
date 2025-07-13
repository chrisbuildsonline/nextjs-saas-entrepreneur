"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VerifyEmailPage() {
  const [emailSent, setEmailSent] = useState(false)

  const resendEmail = () => {
    setEmailSent(true)
    // In a real app, this would call your resend email API
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">SaaS Entrepreneur</span>
          </div>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address. Please click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {emailSent && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Verification email sent successfully!</AlertDescription>
            </Alert>
          )}

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or click below to resend.
            </p>
            <Button onClick={resendEmail} variant="outline" disabled={emailSent}>
              {emailSent ? "Email Sent!" : "Resend Email"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <Link href="/auth/signin" className="text-blue-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
