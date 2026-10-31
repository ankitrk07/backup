import type { NextAuthConfig } from "next-auth"

// Edge-safe config: no Prisma adapter, no bcrypt, no providers — those need
// the Node.js runtime and live in auth.ts instead. This file is imported by
// proxy.ts (which runs on the Edge runtime) purely for route-authorization
// decisions based on the JWT already present on the request.
export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      const isAccountRoute = nextUrl.pathname.startsWith("/account")
      const isCheckoutRoute = nextUrl.pathname.startsWith("/checkout")

      if (isAdminRoute) {
        return isLoggedIn && auth?.user.role === "ADMIN"
      }
      if (isAccountRoute || isCheckoutRoute) {
        return isLoggedIn
      }
      return true
    },
    // jwt/session only manipulate the token/session objects (no Prisma, no
    // bcrypt) so — unlike the Credentials provider and PrismaAdapter — they
    // run fine on the Edge runtime too. They live here, not in auth.ts, so
    // proxy.ts's role-based `authorized` check above actually sees
    // `auth.user.role` instead of it always being undefined.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: "CUSTOMER" | "ADMIN" }).role ?? "CUSTOMER"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as "CUSTOMER" | "ADMIN") ?? "CUSTOMER"
      }
      return session
    },
  },
} satisfies NextAuthConfig
