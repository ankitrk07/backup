import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

await page.goto(`${BASE}/login`, { waitUntil: "load" });
await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
await page.waitForTimeout(1000);
await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
await page.getByRole("button", { name: "Sign In" }).click();
await page.waitForURL(`${BASE}/`, { timeout: 15000 });

async function scan(label) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  console.log(`\n=== ${label} — ${results.violations.length} violation type(s) ===`);
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
    for (const node of v.nodes.slice(0, 3)) console.log(`    - ${node.target.join(" ")}`);
  }
  return results.violations.length;
}

let total = 0;

await page.goto(`${BASE}/admin/products/new`, { waitUntil: "load" });
await page.waitForTimeout(700);
total += await scan("Product create form");

await page.goto(`${BASE}/admin/categories`, { waitUntil: "load" });
await page.waitForTimeout(600);
await page.getByRole("button", { name: "Add Category" }).click();
await page.waitForTimeout(400);
total += await scan("Category create dialog (open)");
await page.keyboard.press("Escape");

await page.goto(`${BASE}/admin/coupons`, { waitUntil: "load" });
await page.waitForTimeout(600);
await page.getByRole("button", { name: "Add Coupon" }).click();
await page.waitForTimeout(400);
total += await scan("Coupon create dialog (open)");

console.log(`\nTotal: ${total}`);
await browser.close();
