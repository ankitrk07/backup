# Fineverse

A premium multi-category e-commerce platform — Electronics, Fashion, and Toys — built with Next.js 16, TypeScript, Tailwind CSS, Prisma/PostgreSQL, and Auth.js.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix primitives) + Framer Motion
- **Data:** PostgreSQL via Prisma 7 (driver adapters, `@prisma/adapter-pg`)
- **Auth:** Auth.js (NextAuth v5), credentials provider, OAuth-ready
- **State:** Zustand (cart/wishlist/recently-viewed, persisted)
- **Payments:** Provider-abstracted (`lib/services/payment-service`), Stripe-ready — never fakes a successful charge

## Getting started

1. **Install dependencies** (already done if you're reading this in the scaffolded repo):
   ```bash
   npm install
   ```

2. **Provision PostgreSQL.** Two options:

   - **Zero-install (default for local dev):** this repo ships a tiny embedded Postgres
     (PGlite, a real WASM build of Postgres) exposed over the normal Postgres wire
     protocol, so the rest of the stack — Prisma, `pg`, migrations — behaves exactly
     as it would against a real server:
     ```bash
     npm run db:local
     ```
     This starts a server at `postgresql://postgres:postgres@127.0.0.1:5433/postgres`
     (data persisted to `.pglite-data/`), matching the default `DATABASE_URL` already
     in `.env`. Leave it running in a separate terminal during development.

   - **Real Postgres** (recommended before shipping): local install, Docker
     (`docker run --name fineverse-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16`),
     or a hosted free tier ([Neon](https://neon.tech), [Supabase](https://supabase.com)).
     Point `DATABASE_URL` at it and unset `DB_POOL_MAX` in `.env`.

3. **Environment variables** are already scaffolded in `.env` with working local
   defaults; see `.env.example` for the full list (auth, payments, email).

4. **Apply the schema and seed data:**
   ```bash
   # Against the embedded PGlite server:
   npm run db:migrate:local -- init
   npm run db:seed

   # Against a real Postgres instance, use standard Prisma commands instead:
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
   (`db:migrate:local` exists because Prisma's migration engine is a native binary
   that can't negotiate PGlite's socket emulation — it diffs `schema.prisma`
   offline and applies the SQL via the plain `pg` driver, the same one the app
   uses at runtime. Regular `prisma migrate dev`/`deploy` work as documented
   against any real Postgres instance.)

5. **Start the dev server:**
   ```bash
   npm run dev
   ```

## Project structure

See `prisma/schema.prisma` for the full data model and the architecture notes in the initial project brief for folder layout (`src/app`, `src/components`, `src/lib`, `src/store`, `src/hooks`, `src/types`).

## Scripts

- `npm run dev` — start dev server (Turbopack)
- `npm run build` / `npm run start` — production build/serve
- `npm run lint` — ESLint
- `npx prisma studio` — browse the database
- `npx prisma migrate dev` — apply schema changes
- `npx prisma db seed` — populate demo catalog data
