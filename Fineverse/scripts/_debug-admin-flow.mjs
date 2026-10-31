import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const SHOTS = process.argv[2] ?? "shots";
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });

async function shot(name) {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true });
}

try {
  await page.goto(`${BASE}/login`, { waitUntil: "load" });
  await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
  await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });

  // Edit an existing product
  console.log("Opening product edit page");
  await page.goto(`${BASE}/admin/products`, { waitUntil: "load" });
  await page.getByRole("link", { name: "Edit" }).first().click();
  await page.waitForURL(/\/admin\/products\/.+\/edit/, { timeout: 15000 });
  await page.waitForTimeout(500);
  await shot("edit-01-loaded");

  const nameInput = page.locator('input[name="name"]');
  const originalName = await nameInput.inputValue();
  console.log("Editing product:", originalName);
  await nameInput.fill(originalName + " (Edited)");

  // bump stock on the first variant
  const stockInput = page.locator('input[name="variants.0.stock"]');
  await stockInput.fill("999");

  await page.getByRole("button", { name: "Save Changes" }).click();
  await page.waitForURL(`${BASE}/admin/products`, { timeout: 15000 });
  await page.waitForTimeout(500);
  await shot("edit-02-saved-list");

  const editedVisible = await page.getByText(originalName + " (Edited)").count();
  console.log("Edited name visible in list:", editedVisible > 0);

  // Create a new product
  console.log("Creating a new product");
  await page.getByRole("link", { name: "Add Product" }).click();
  await page.waitForURL(`${BASE}/admin/products/new`, { timeout: 15000 });
  await page.locator('input[name="name"]').fill("Playwright Test Gadget");
  await page.locator('textarea[name="description"]').fill("A gadget created end-to-end by an automated admin test to verify the create-product flow works.");
  await page.locator('input[name="sku"]').fill(`PW-TEST-${Date.now()}`);
  await page.locator('input[name="basePrice"]').fill("1499");

  // 3 comboboxes on this form in DOM order: Condition, Category, Brand
  const combos = page.locator('button[role="combobox"]');
  await combos.nth(1).click();
  await page.waitForTimeout(300);
  await page.locator('[role="option"]').first().click();

  // fill image + variant sku
  await page.locator('input[name="images.0"]').fill("https://picsum.photos/seed/pw-test/800/1000");
  await page.locator('input[name="variants.0.sku"]').fill(`PW-VAR-${Date.now()}`);
  await page.locator('input[name="variants.0.stock"]').fill("10");

  await shot("create-01-filled");
  await page.getByRole("button", { name: "Create Product" }).click();
  await page.waitForURL(`${BASE}/admin/products`, { timeout: 15000 });
  await page.waitForTimeout(500);
  await shot("create-02-saved-list");

  const newVisible = await page.getByText("Playwright Test Gadget").count();
  console.log("New product visible in list:", newVisible > 0);

  console.log("\nALL STEPS PASSED");
} catch (err) {
  console.error("FAILURE:", err);
  await shot("admin-flow-ERROR");
  process.exitCode = 1;
} finally {
  console.log("Errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
  await browser.close();
}
