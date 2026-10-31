import { chromium } from "playwright";
const SHOTS = process.argv[2] ?? "shots";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto("http://localhost:3000/login", { waitUntil: "load" });
await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible" });
await page.waitForTimeout(1000);
await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
await page.getByRole("button", { name: "Sign In" }).click();
await page.waitForURL("http://localhost:3000/", { timeout: 15000 });
await page.goto("http://localhost:3000/admin", { waitUntil: "load" });
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS}/mobile-01-dashboard.png`, fullPage: false });

await page.getByLabel("Open admin menu").click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${SHOTS}/mobile-02-nav-open.png`, fullPage: false });
await browser.close();
