import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const SHOTS = process.argv[2] ?? "shots";
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });

async function shot(name) {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: false });
}

await page.goto(`${BASE}/login`, { waitUntil: "load" });
await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
await page.waitForTimeout(1000);
await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
await page.getByRole("button", { name: "Sign In" }).click();
await page.waitForURL(`${BASE}/`, { timeout: 15000 });

for (const route of ["categories", "orders", "customers", "reviews", "coupons"]) {
  await page.goto(`${BASE}/admin/${route}`, { waitUntil: "load" });
  await page.waitForTimeout(700);
  await shot(`tour-${route}`);
  console.log(`captured /admin/${route}`);
}

// drill into first order detail
await page.goto(`${BASE}/admin/orders`, { waitUntil: "load" });
await page.waitForTimeout(500);
const firstOrderLink = page.locator('a[href^="/admin/orders/"]').first();
if (await firstOrderLink.count()) {
  await firstOrderLink.click();
  await page.waitForTimeout(700);
  await shot("tour-order-detail");
  console.log("captured order detail");
}

// drill into first customer detail
await page.goto(`${BASE}/admin/customers`, { waitUntil: "load" });
await page.waitForTimeout(500);
const firstCustomerLink = page.locator('a[href^="/admin/customers/"]').first();
if (await firstCustomerLink.count()) {
  await firstCustomerLink.click();
  await page.waitForTimeout(700);
  await shot("tour-customer-detail");
  console.log("captured customer detail");
}

console.log("Errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
