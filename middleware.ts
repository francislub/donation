import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access if user has a valid token
        if (token) return true

        // For API routes, require authentication
        if (req.nextUrl.pathname.startsWith("/api/admin")) {
          return false
        }

        // For dashboard routes, require authentication
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return false
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/admin/:path*",
    // Don't run middleware on these paths
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
