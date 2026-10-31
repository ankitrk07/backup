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

const pages = ["/admin", "/admin/products", "/admin/orders", "/admin/categories", "/admin/coupons"];
let total = 0;
for (const url of pages) {
  await page.goto(`${BASE}${url}`, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  console.log(`\n=== ${url} — ${results.violations.length} violation type(s) ===`);
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
    for (const node of v.nodes.slice(0, 3)) console.log(`    - ${node.target.join(" ")}`);
  }
  total += results.violations.length;
}
console.log(`\nTotal: ${total}`);
await browser.close();
