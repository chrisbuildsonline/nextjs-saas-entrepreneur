export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export interface PasswordValidation {
  isValid: boolean
  errors: string[]
  requirements: Array<{ text: string; met: boolean }>
}

export function validatePassword(password: string): PasswordValidation {
  const requirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  const errors: string[] = []
  const unmetRequirements = requirements.filter((req) => !req.met)

  if (unmetRequirements.length > 0) {
    errors.push(`Password must meet all requirements`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    requirements,
  }
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}
