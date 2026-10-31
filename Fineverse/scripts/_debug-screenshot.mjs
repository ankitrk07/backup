import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const outPath = process.argv[3] ?? "screenshot.png";
const width = Number(process.argv[4] ?? 1440);
const height = Number(process.argv[5] ?? 900);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: outPath, fullPage: false });

console.log("Console errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
