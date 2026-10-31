import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

async function scan(label, url) {
  await page.goto(`${BASE}${url}`, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  console.log(`\n=== ${label} (${url}) — ${results.violations.length} violation type(s) ===`);
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
    for (const node of v.nodes.slice(0, 3)) console.log(`    - ${node.target.join(" ")}`);
  }
  return results.violations.length;
}

let total = 0;
total += await scan("Search results", "/search?q=headphones");
total += await scan("Fashion category", "/fashion");
total += await scan("Toys category", "/toys");

await page.goto(`${BASE}/login`, { waitUntil: "load" });
await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
await page.waitForTimeout(1000);
await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
await page.getByRole("button", { name: "Sign In" }).click();
await page.waitForURL(`${BASE}/`, { timeout: 15000 });

total += await scan("Account profile", "/account");
total += await scan("Account orders", "/account/orders");
total += await scan("Account addresses", "/account/addresses");
total += await scan("Wishlist (authed)", "/wishlist");

console.log(`\nGrand total: ${total}`);
await browser.close();
