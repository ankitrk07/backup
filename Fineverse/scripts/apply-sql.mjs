// Dev-only helper: applies a raw SQL file to the local embedded Postgres
// (scripts/pglite-server.mjs). Needed because Prisma's migrate/db-execute
// commands use a native Rust engine that can't negotiate PGlite's socket
// emulation, while the plain `pg` driver (same one the app uses at runtime)
// connects fine. Usage: node scripts/apply-sql.mjs <path-to-sql-file>
import { readFileSync } from "node:fs";
import { Client } from "pg";
import "dotenv/config";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/apply-sql.mjs <path-to-sql-file>");
  process.exit(1);
}

const sql = readFileSync(file, "utf8");
const client = new Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
try {
  await client.query(sql);
  console.log(`[apply-sql] applied ${file}`);
} finally {
  await client.end();
}
