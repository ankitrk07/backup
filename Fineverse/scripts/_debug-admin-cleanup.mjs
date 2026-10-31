import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${BASE}/login`, { waitUntil: "load" });
await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
await page.waitForTimeout(1000);
await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
await page.getByRole("button", { name: "Sign In" }).click();
await page.waitForURL(`${BASE}/`, { timeout: 15000 });

// Fix the LEGO product name back to its seeded value
await page.goto(`${BASE}/admin/products?q=LEGO Star Wars`, { waitUntil: "load" });
await page.waitForTimeout(500);
const editLink = page.getByRole("link", { name: "Edit" }).first();
if (await editLink.count()) {
  await editLink.click();
  await page.waitForURL(/\/admin\/products\/.+\/edit/, { timeout: 15000 });
  await page.locator('input[name="name"]').fill("LEGO Star Wars Action Figure Set");
  await page.locator('input[name="variants.0.stock"]').fill("3");
  await page.getByRole("button", { name: "Save Changes" }).click();
  await page.waitForURL(`${BASE}/admin/products`, { timeout: 15000 });
  console.log("Renamed LEGO product back to original + restored stock");
}

// Deactivate (soft-delete) the Playwright test product
await page.goto(`${BASE}/admin/products?q=Playwright Test Gadget`, { waitUntil: "load" });
await page.waitForTimeout(500);
const testEditLink = page.getByRole("link", { name: "Edit" }).first();
if (await testEditLink.count()) {
  await testEditLink.click();
  await page.waitForURL(/\/admin\/products\/.+\/edit/, { timeout: 15000 });
  await page.getByRole("button", { name: "Deactivate" }).click();
  await page.getByRole("button", { name: "Deactivate", exact: true }).last().click();
  await page.waitForTimeout(1000);
  console.log("Deactivated Playwright Test Gadget");
}

await browser.close();
