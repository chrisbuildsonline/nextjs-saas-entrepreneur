// Email service for sending transactional emails
// This is a basic implementation that can be extended with Resend, SendGrid, etc.

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface EmailSendRequest {
  to: string
  subject: string
  html: string
  text?: string
}

// Email templates
export const EmailTemplates = {
  welcome: (name: string): EmailTemplate => ({
    subject: "Welcome to SaaS Entrepreneur!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to SaaS Entrepreneur!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining SaaS Entrepreneur! We're excited to have you on board.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Complete your profile setup</li>
          <li>Explore our dashboard features</li>
          <li>Check out our pricing plans</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The SaaS Entrepreneur Team</p>
      </div>
    `,
    text: `Welcome to SaaS Entrepreneur!

Hi ${name},

Thank you for joining SaaS Entrepreneur! We're excited to have you on board.

Here's what you can do next:
- Complete your profile setup
- Explore our dashboard features
- Check out our pricing plans

If you have any questions, feel free to reach out to our support team.

Best regards,
The SaaS Entrepreneur Team`
  }),

  passwordReset: (name: string, resetLink: string): EmailTemplate => ({
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Reset Your Password</h1>
        <p>Hi ${name},</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <p style="margin: 20px 0;">
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>Best regards,<br>The SaaS Entrepreneur Team</p>
      </div>
    `,
    text: `Reset Your Password

Hi ${name},

You requested to reset your password. Click the link below to create a new password:

${resetLink}

If you didn't request this, please ignore this email.

This link will expire in 1 hour.

Best regards,
The SaaS Entrepreneur Team`
  }),

  subscriptionCreated: (name: string, planName: string): EmailTemplate => ({
    subject: "Subscription Confirmed",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Subscription Confirmed!</h1>
        <p>Hi ${name},</p>
        <p>Your subscription to the <strong>${planName}</strong> plan has been confirmed.</p>
        <p>You now have access to all the features included in your plan.</p>
        <p>Visit your dashboard to get started:</p>
        <p style="margin: 20px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        </p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The SaaS Entrepreneur Team</p>
      </div>
    `,
    text: `Subscription Confirmed!

Hi ${name},

Your subscription to the ${planName} plan has been confirmed.

You now have access to all the features included in your plan.

Visit your dashboard to get started:
${process.env.NEXT_PUBLIC_APP_URL}/dashboard

If you have any questions, feel free to reach out to our support team.

Best regards,
The SaaS Entrepreneur Team`
  }),

  paymentFailed: (name: string): EmailTemplate => ({
    subject: "Payment Failed - Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">Payment Failed</h1>
        <p>Hi ${name},</p>
        <p>We were unable to process your payment. Your subscription may be affected.</p>
        <p>Please update your payment method to continue using our services:</p>
        <p style="margin: 20px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Update Payment Method</a>
        </p>
        <p>If you need help, please contact our support team.</p>
        <p>Best regards,<br>The SaaS Entrepreneur Team</p>
      </div>
    `,
    text: `Payment Failed

Hi ${name},

We were unable to process your payment. Your subscription may be affected.

Please update your payment method to continue using our services:
${process.env.NEXT_PUBLIC_APP_URL}/settings

If you need help, please contact our support team.

Best regards,
The SaaS Entrepreneur Team`
  })
}

// Mock email service for development
export async function sendEmail(request: EmailSendRequest): Promise<{ success: boolean; error?: string }> {
  // For development, just log the email
  console.log('📧 Email would be sent:', {
    to: request.to,
    subject: request.subject,
    html: request.html.substring(0, 100) + '...'
  })

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100))

  return { success: true }
}

// Production email service (implement with your preferred provider)
export async function sendEmailWithResend(request: EmailSendRequest): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: request.to,
        subject: request.subject,
        html: request.html,
        text: request.text
      })
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Helper functions for common email scenarios
export async function sendWelcomeEmail(email: string, name: string) {
  const template = EmailTemplates.welcome(name)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

export async function sendPasswordResetEmail(email: string, name: string, resetLink: string) {
  const template = EmailTemplates.passwordReset(name, resetLink)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

export async function sendSubscriptionEmail(email: string, name: string, planName: string) {
  const template = EmailTemplates.subscriptionCreated(name, planName)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

export async function sendPaymentFailedEmail(email: string, name: string) {
  const template = EmailTemplates.paymentFailed(name)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}