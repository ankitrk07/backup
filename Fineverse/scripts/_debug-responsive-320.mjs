import { chromium } from "playwright";
const SHOTS = process.argv[2] ?? "shots";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

const pages = [
  ["home", "/"],
  ["products", "/products"],
  ["product-detail", "/product/apple-macbook-air-m3"],
  ["cart", "/cart"],
  ["login", "/login"],
  ["about", "/about"],
  ["faq", "/faq"],
  ["contact", "/contact"],
];

for (const [name, url] of pages) {
  await page.goto(`http://localhost:3000${url}`, { waitUntil: "load" });
  await page.waitForTimeout(600);
  // check for horizontal overflow (a common responsiveness bug)
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  console.log(`${name}: horizontal overflow = ${hasOverflow}`);
  await page.screenshot({ path: `${SHOTS}/r320-${name}.png`, fullPage: true });
}

console.log("Errors:", errors.length ? JSON.stringify(errors) : "none");
await browser.close();
