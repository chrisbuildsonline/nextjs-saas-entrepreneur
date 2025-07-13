import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ["/dashboard", "/settings", "/billing"]
  const authRoutes = ["/auth/signin", "/auth/signup"]

  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirect to signin if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/auth/signin", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing auth routes with session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Rate limiting for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const ip = req.ip ?? "127.0.0.1"
    // Implement rate limiting logic here
    // You can use Redis or a similar solution for production
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
