import { supabase } from "./supabase"

export interface AuthResult {
  user?: any
  error?: string
}

export async function signUp(email: string, password: string, name: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { user: data.user }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { user: data.user }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    return {}
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function resetPassword(email: string): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return {}
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      return null
    }

    return user
  } catch (error) {
    return null
  }
}

export async function signInWithGitHub(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { user: data.user }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { user: data.user }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

// Mock functions for demo purposes - replace with real Supabase auth in production
export async function mockSignUp(email: string, password: string, name: string): Promise<AuthResult> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock user object
  const mockUser = {
    id: "mock-user-id",
    email,
    user_metadata: { name },
    created_at: new Date().toISOString(),
  }

  // Store in localStorage for demo
  localStorage.setItem("mock-user", JSON.stringify(mockUser))

  return { user: mockUser }
}

export async function mockSignIn(email: string, password: string): Promise<AuthResult> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, accept any email/password
  const mockUser = {
    id: "mock-user-id",
    email,
    user_metadata: { name: "Demo User" },
    created_at: new Date().toISOString(),
  }

  // Store in localStorage for demo
  localStorage.setItem("mock-user", JSON.stringify(mockUser))

  return { user: mockUser }
}

export async function mockGetCurrentUser() {
  try {
    const stored = localStorage.getItem("mock-user")
    if (stored) {
      return JSON.parse(stored)
    }
    return null
  } catch {
    return null
  }
}

export async function mockSignOut(): Promise<AuthResult> {
  localStorage.removeItem("mock-user")
  return {}
}

export async function mockResetPassword(email: string): Promise<AuthResult> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {}
}

// Use mock functions for demo - replace with real functions when Supabase is configured
export const demoSignUp = mockSignUp
export const demoSignIn = mockSignIn
export const demoGetCurrentUser = mockGetCurrentUser
export const demoSignOut = mockSignOut
export const demoResetPassword = mockResetPassword
