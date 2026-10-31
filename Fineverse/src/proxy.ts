import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Next.js 16 renamed middleware.ts to proxy.ts. Uses the Edge-safe auth
// config (see auth.config.ts) — the full config in auth.ts pulls in Prisma
// and bcrypt, which can't run on the Edge runtime this executes under.
export default NextAuth(authConfig).auth

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/checkout/:path*"],
}
