import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// DB_POOL_MAX: PGlite (used for zero-install local dev, see scripts/pglite-server.mjs)
// only supports a single physical connection, so local dev sets this to 1.
// Real Postgres in staging/production should leave it unset to use pg's pool default.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  max: process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : undefined,
})

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
