import { chromium } from "playwright";
const SHOTS = process.argv[2] ?? "shots";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

// FAQ accordion
await page.goto("http://localhost:3000/faq", { waitUntil: "load" });
await page.waitForTimeout(500);
await page.getByText("How long does delivery take?").click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${SHOTS}/page-faq-expanded.png`, fullPage: false });

// Contact form submission
await page.goto("http://localhost:3000/contact", { waitUntil: "load" });
await page.waitForTimeout(500);
await page.getByLabel("Full Name").fill("Test User");
await page.getByLabel("Email", { exact: true }).fill("test.contact@example.com");
await page.getByLabel("Subject").fill("Question about an order");
await page.getByLabel("Message").fill("This is a test message from the automated Playwright verification script.");
await page.getByRole("button", { name: "Send Message" }).click();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${SHOTS}/page-contact-submitted.png`, fullPage: false });

// Privacy + Terms quick check
await page.goto("http://localhost:3000/privacy", { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOTS}/page-privacy.png`, fullPage: false });
await page.goto("http://localhost:3000/terms", { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOTS}/page-terms.png`, fullPage: false });

console.log("Errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
