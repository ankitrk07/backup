import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const SHOTS = process.argv[2] ?? "shots";
const stamp = Date.now();
const email = `e2e.checkout.${stamp}@example.com`;
const password = "TestPass123!";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

async function shot(name) {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true });
}

try {
  // 1. Register a fresh user
  console.log("Step 1: register");
  await page.goto(`${BASE}/register`, { waitUntil: "networkidle" });
  const registerForm = page.locator("form");
  await registerForm.getByLabel("Full Name").fill("E2E Checkout Tester");
  await registerForm.getByLabel("Email", { exact: true }).fill(email);
  await registerForm.getByLabel("Password", { exact: true }).fill(password);
  await registerForm.getByLabel("Confirm Password").fill(password);
  await registerForm.getByRole("button", { name: "Create Account" }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });
  console.log("  registered + logged in as", email);

  // 2. Go to products, open first product
  console.log("Step 2: open a product");
  await page.goto(`${BASE}/products`, { waitUntil: "networkidle" });
  const firstProductLink = page.locator('main a[href^="/product/"]').first();
  await firstProductLink.waitFor({ state: "visible", timeout: 15000 });
  const productHref = await firstProductLink.getAttribute("href");
  await firstProductLink.click();
  await page.waitForURL(`${BASE}${productHref}`, { timeout: 15000 });
  await shot("01-pdp");

  // 3. Add to cart
  console.log("Step 3: add to cart");
  await page.getByRole("button", { name: "Add to Cart", exact: true }).first().click();
  await page.waitForTimeout(1000);

  // 4. Go to cart, verify item present
  console.log("Step 4: view cart");
  await page.goto(`${BASE}/cart`, { waitUntil: "networkidle" });
  await shot("02-cart");
  const cartItemCount = await page.locator('main a[href^="/product/"]').count();
  if (cartItemCount === 0) throw new Error("Cart appears empty after add-to-cart");

  // 5. Proceed to checkout
  console.log("Step 5: go to checkout");
  await page.getByRole("link", { name: /checkout/i }).click();
  await page.waitForURL(`${BASE}/checkout`, { timeout: 15000 });
  await page.waitForTimeout(1000);
  await shot("03-checkout-address-empty");

  // 6. Add a new address
  console.log("Step 6: add address");
  await page.getByRole("button", { name: /add address/i }).click();
  await page.getByLabel("Full Name").fill("E2E Checkout Tester");
  await page.getByLabel("Phone").fill("9876543210");
  await page.getByLabel("Address Line 1").fill("221B Test Street");
  await page.getByLabel("City").fill("Mumbai");
  await page.getByLabel("State").fill("Maharashtra");
  await page.getByLabel("Postal Code").fill("400001");
  await page.getByRole("button", { name: "Add Address", exact: true }).click();
  await page.waitForTimeout(1500);
  await shot("04-checkout-address-added");

  // 7. Select shipping address (first card) and continue
  console.log("Step 7: select address + continue");
  await page.locator("button:has-text('E2E Checkout Tester')").first().click();
  await page.getByRole("button", { name: "Continue to Delivery" }).click();
  await page.waitForTimeout(500);
  await shot("05-checkout-delivery");

  // 8. Delivery step - keep standard, continue
  console.log("Step 8: delivery -> payment");
  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await page.waitForTimeout(500);
  await shot("06-checkout-payment");

  // 9. Payment step - select COD, continue
  console.log("Step 9: select COD -> review");
  await page.getByText("Cash on Delivery", { exact: true }).click();
  await page.getByRole("button", { name: "Review Order" }).click();
  await page.waitForTimeout(500);
  await shot("07-checkout-review");

  // 10. Place order
  console.log("Step 10: place order");
  await page.getByRole("button", { name: "Place Order" }).click();
  await page.waitForURL(/\/checkout\/success/, { timeout: 20000 });
  await page.waitForTimeout(1000);
  await shot("08-checkout-success");
  const successUrl = page.url();
  console.log("  order placed, landed on", successUrl);

  // 11. Go to My Orders, verify it appears
  console.log("Step 11: verify orders list");
  await page.goto(`${BASE}/account/orders`, { waitUntil: "networkidle" });
  await shot("09-orders-list");
  const orderLinks = page.locator('a[href^="/account/orders/"]');
  const orderCount = await orderLinks.count();
  if (orderCount === 0) throw new Error("No orders found in /account/orders after placing order");

  // 12. Open order details
  console.log("Step 12: open order details");
  await orderLinks.first().click();
  await page.waitForURL(/\/account\/orders\/.+/, { timeout: 15000 });
  await page.waitForTimeout(500);
  await shot("10-order-details");

  // 13. Cancel the order
  console.log("Step 13: cancel order");
  const cancelBtn = page.getByRole("button", { name: "Cancel Order" });
  if (await cancelBtn.count()) {
    await cancelBtn.click();
    await page.getByRole("button", { name: "Yes, Cancel Order" }).click();
    await page.waitForTimeout(1500);
    await shot("11-order-cancelled-after-refresh");
    let cancelledBadge = await page.getByText("Cancelled", { exact: true }).count();
    console.log("  after router.refresh() wait, Cancelled badge count:", cancelledBadge);
    if (cancelledBadge === 0) {
      console.log("  retrying with manual page.reload() to isolate refresh-vs-data issue");
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      await shot("11b-order-cancelled-after-manual-reload");
      cancelledBadge = await page.getByText("Cancelled", { exact: true }).count();
      console.log("  after manual reload, Cancelled badge count:", cancelledBadge);
    }
    if (cancelledBadge === 0) throw new Error("Order status did not update to Cancelled after cancel action");
  } else {
    console.log("  No cancel button found (unexpected for a fresh PENDING order)");
  }

  console.log("\nALL STEPS PASSED");
} catch (err) {
  console.error("FAILURE:", err);
  await shot("ERROR-state");
  process.exitCode = 1;
} finally {
  console.log("\nConsole/page errors captured:", errors.length ? JSON.stringify(errors, null, 2) : "none");
  await browser.close();
}
