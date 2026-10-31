import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const SHOTS = process.argv[2] ?? "shots";
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });

async function shot(name) {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: false });
}

try {
  // 0. Place a fresh order as a new customer so there's a non-final-state
  // order for the admin status-update test below.
  console.log("Placing a fresh order to test status updates against");
  const custEmail = `e2e.admin-interact.${Date.now()}@example.com`;
  await page.goto(`${BASE}/register`, { waitUntil: "load" });
  await page.getByLabel("Full Name").waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  await page.getByLabel("Full Name").fill("Admin Interact Tester");
  await page.getByLabel("Email", { exact: true }).fill(custEmail);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm Password").fill("TestPass123!");
  await page.getByRole("button", { name: "Create Account" }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });

  await page.goto(`${BASE}/products`, { waitUntil: "load" });
  await page.locator('main a[href^="/product/"]').first().waitFor({ state: "visible" });
  await page.locator('main a[href^="/product/"]').first().click();
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Add to Cart", exact: true }).first().click();
  await page.waitForTimeout(800);
  await page.goto(`${BASE}/checkout`, { waitUntil: "load" });
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: /add address/i }).click();
  await page.getByLabel("Full Name").fill("Admin Interact Tester");
  await page.getByLabel("Phone").fill("9876543210");
  await page.getByLabel("Address Line 1").fill("1 Test Way");
  await page.getByLabel("City").fill("Delhi");
  await page.getByLabel("State").fill("Delhi");
  await page.getByLabel("Postal Code").fill("110001");
  await page.getByRole("button", { name: "Add Address", exact: true }).click();
  await page.waitForTimeout(1200);
  await page.locator("button:has-text('Admin Interact Tester')").first().click();
  await page.getByRole("button", { name: "Continue to Delivery" }).click();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await page.waitForTimeout(400);
  await page.getByText("Cash on Delivery", { exact: true }).click();
  await page.getByRole("button", { name: "Review Order" }).click();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Place Order" }).click();
  await page.waitForURL(/\/checkout\/success/, { timeout: 20000 });
  const freshOrderNumber = new URL(page.url()).searchParams.get("order");
  console.log("Fresh order placed:", freshOrderNumber);

  await page.context().clearCookies();

  await page.goto(`${BASE}/login`, { waitUntil: "load" });
  await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
  await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });

  // 1. Order status update on the fresh order
  console.log("Testing order status update");
  await page.goto(`${BASE}/admin/orders?q=${freshOrderNumber}`, { waitUntil: "load" });
  await page.waitForTimeout(500);
  await page.locator('a[href^="/admin/orders/"]').first().click();
  await page.waitForTimeout(500);
  const updateSelect = page.locator('button[role="combobox"]');
  if (await updateSelect.count()) {
    await updateSelect.click();
    await page.waitForTimeout(300);
    const firstOption = page.locator('[role="option"]').first();
    const optionText = await firstOption.innerText();
    await firstOption.click();
    await page.getByRole("button", { name: "Update" }).click();
    await page.waitForTimeout(1000);
    await shot("interact-01-order-status-updated");
    console.log("Attempted status update to:", optionText);
  } else {
    console.log("Order already in final state, no status selector (expected for our cancelled test orders)");
    await shot("interact-01-order-final-state");
  }

  // 2. Coupon create + delete
  console.log("Testing coupon create + delete");
  await page.goto(`${BASE}/admin/coupons`, { waitUntil: "load" });
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Add Coupon" }).click();
  await page.waitForTimeout(300);
  const code = `PWTEST${Date.now().toString().slice(-6)}`;
  await page.locator('input[name="code"]').fill(code);
  await page.locator('input[name="value"]').fill("15");
  await shot("interact-02-coupon-dialog-filled");
  await page.getByRole("button", { name: "Add Coupon", exact: true }).click();
  await page.waitForTimeout(1000);
  const couponVisible = await page.getByText(code).count();
  console.log("New coupon visible after create:", couponVisible > 0);
  await shot("interact-03-coupon-created");

  // delete it
  const couponRow = page.locator("tr", { hasText: code });
  const trashBtn = couponRow.locator("button").last();
  await trashBtn.click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await page.waitForTimeout(1000);
  const couponGoneCheck = await page.getByText(code).count();
  console.log("Coupon removed after delete:", couponGoneCheck === 0);

  console.log("\nALL INTERACTIONS COMPLETE");
} catch (err) {
  console.error("FAILURE:", err);
  await shot("interact-ERROR");
  process.exitCode = 1;
} finally {
  console.log("Errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
  await browser.close();
}
