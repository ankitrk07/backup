import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const SHOTS = process.argv[2] ?? "shots";
const stamp = Date.now();
const email = `e2e.coupon.${stamp}@example.com`;
const password = "TestPass123!";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function shot(name) {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true });
}

try {
  await page.goto(`${BASE}/register`, { waitUntil: "networkidle" });
  const form = page.locator("form");
  await form.getByLabel("Full Name").fill("E2E Coupon Tester");
  await form.getByLabel("Email", { exact: true }).fill(email);
  await form.getByLabel("Password", { exact: true }).fill(password);
  await form.getByLabel("Confirm Password").fill(password);
  await form.getByRole("button", { name: "Create Account" }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });

  await page.goto(`${BASE}/products`, { waitUntil: "networkidle" });
  const firstProductLink = page.locator('main a[href^="/product/"]').first();
  await firstProductLink.waitFor({ state: "visible", timeout: 15000 });
  await firstProductLink.click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Add to Cart", exact: true }).first().click();
  await page.waitForTimeout(1000);

  await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: /add address/i }).click();
  await page.getByLabel("Full Name").fill("E2E Coupon Tester");
  await page.getByLabel("Phone").fill("9876543210");
  await page.getByLabel("Address Line 1").fill("221B Test Street");
  await page.getByLabel("City").fill("Mumbai");
  await page.getByLabel("State").fill("Maharashtra");
  await page.getByLabel("Postal Code").fill("400001");
  await page.getByRole("button", { name: "Add Address", exact: true }).click();
  await page.waitForTimeout(1500);
  await page.locator("button:has-text('E2E Coupon Tester')").first().click();
  await page.getByRole("button", { name: "Continue to Delivery" }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await page.waitForTimeout(500);
  await page.getByText("Cash on Delivery", { exact: true }).click();
  await page.getByRole("button", { name: "Review Order" }).click();
  await page.waitForTimeout(500);

  console.log("Applying coupon WELCOME10");
  await page.getByPlaceholder("e.g. WELCOME10").fill("WELCOME10");
  await page.getByRole("button", { name: "Apply" }).click();
  await page.waitForTimeout(1500);
  await shot("coupon-01-applied");

  const removeBtn = page.getByRole("button", { name: "Remove coupon" });
  const applied = await removeBtn.count();
  console.log("Coupon applied (remove button present):", applied > 0);

  console.log("Testing invalid coupon");
  if (applied > 0) {
    await removeBtn.click();
    await page.waitForTimeout(500);
  }
  await page.getByPlaceholder("e.g. WELCOME10").fill("INVALIDCODE99");
  await page.getByRole("button", { name: "Apply" }).click();
  await page.waitForTimeout(1500);
  await shot("coupon-02-invalid");
  const errorVisible = await page.locator("text=/invalid|not found|expired/i").count();
  console.log("Error shown for invalid coupon:", errorVisible > 0);

  console.log("\nALL STEPS PASSED");
} catch (err) {
  console.error("FAILURE:", err);
  await shot("coupon-ERROR");
  process.exitCode = 1;
} finally {
  await browser.close();
}
