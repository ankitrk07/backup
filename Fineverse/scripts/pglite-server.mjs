// Zero-install local Postgres for development.
// Spins up a real Postgres-wire-protocol server backed by PGlite (embedded
// WASM Postgres) so `prisma migrate`, `prisma db seed`, and `next dev` all
// talk to a genuine Postgres instance without requiring Docker or a native
// install. Production deployments should point DATABASE_URL at a real
// managed Postgres instead — this script is dev-only.

import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";

const dataDir = process.env.PGLITE_DATA_DIR ?? "./.pglite-data";
const port = Number(process.env.PGLITE_PORT ?? 5433);
const host = process.env.PGLITE_HOST ?? "127.0.0.1";

const db = await PGlite.create(dataDir);
const server = new PGLiteSocketServer({ db, port, host });

await server.start();
console.log(`[pglite] local Postgres ready at postgresql://postgres:postgres@${host}:${port}/postgres`);
console.log(`[pglite] data persisted to ${dataDir}`);

const shutdown = async () => {
  console.log("\n[pglite] shutting down...");
  await server.stop();
  await db.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
