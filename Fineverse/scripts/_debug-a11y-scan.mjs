import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3000";
const pages = [
  { name: "Homepage", url: "/" },
  { name: "Products Listing", url: "/products" },
  { name: "Product Detail", url: "/product/apple-macbook-air-m3" },
  { name: "Electronics Category", url: "/electronics" },
  { name: "Cart", url: "/cart" },
  { name: "Login", url: "/login" },
  { name: "Register", url: "/register" },
  { name: "About", url: "/about" },
  { name: "FAQ", url: "/faq" },
  { name: "Contact", url: "/contact" },
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

let totalViolations = 0;
for (const p of pages) {
  await page.goto(`${BASE}${p.url}`, { waitUntil: "load" });
  await page.waitForTimeout(800);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  console.log(`\n=== ${p.name} (${p.url}) — ${results.violations.length} violation type(s) ===`);
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
    for (const node of v.nodes.slice(0, 3)) {
      console.log(`    - ${node.target.join(" ")}`);
    }
  }
  totalViolations += results.violations.length;
}

console.log(`\nTotal violation types across all pages: ${totalViolations}`);
await browser.close();
