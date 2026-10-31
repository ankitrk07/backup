// Dev-only migration helper for the embedded PGlite database.
//
// Prisma's `migrate dev` uses a native Rust engine that connects directly
// over TCP and can't negotiate PGlite's socket emulation (its Postgres wire
// protocol implementation is close enough for the `pg` JS driver — what the
// app actually uses at runtime — but not for Prisma's migration engine).
// This script reproduces what `migrate dev` would do, entirely offline:
//   1. Diff prisma/migrations history against schema.prisma (no DB needed)
//   2. Write the result as a new timestamped migration
//   3. Apply it to the local DB via the plain `pg` driver
//
// Usage: node scripts/migrate-local.mjs <migration-name>
// Real Postgres deployments should keep using `prisma migrate dev`/`deploy` as normal.
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const name = process.argv[2];
if (!name) {
  console.error("Usage: node scripts/migrate-local.mjs <migration-name>");
  process.exit(1);
}

const migrationsDir = "prisma/migrations";
const hasExisting = existsSync(migrationsDir) && readdirSync(migrationsDir).length > 0;

const fromArgs = hasExisting
  ? `--from-migrations ${migrationsDir}`
  : "--from-empty";

const sql = execSync(
  `npx prisma migrate diff ${fromArgs} --to-schema prisma/schema.prisma --script`,
  { encoding: "utf8" }
);

if (!sql.trim() || sql.split("\n").every((l) => l.startsWith("--") || !l.trim())) {
  console.log("[migrate-local] no schema changes detected, nothing to do.");
  process.exit(0);
}

const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
const folder = join(migrationsDir, `${timestamp}_${name}`);
mkdirSync(folder, { recursive: true });
const migrationFile = join(folder, "migration.sql");
writeFileSync(migrationFile, sql);
console.log(`[migrate-local] wrote ${migrationFile}`);

execSync(`node scripts/apply-sql.mjs ${migrationFile}`, { stdio: "inherit" });
