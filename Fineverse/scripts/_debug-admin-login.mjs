import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const target = "/" + (process.argv[2] ?? "admin").replace(/^\/+/, "");
const out = process.argv[3] ?? "shots/admin.png";
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });

await page.goto(`${BASE}/login`, { waitUntil: "load", timeout: 45000 });
await page.getByLabel("Email", { exact: true }).waitFor({ state: "visible", timeout: 45000 });
await page.waitForTimeout(1000); // let Auth.js set its CSRF cookie before submitting
await page.getByLabel("Email", { exact: true }).fill("admin@fineverse.example");
await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
await page.getByRole("button", { name: "Sign In" }).click();
try {
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });
} catch {
  console.log("Did not redirect. Current URL:", page.url());
  await page.screenshot({ path: out.replace(/\.png$/, "-login-fail.png"), fullPage: true });
}

console.log("cookies after login:", (await page.context().cookies()).map((c) => c.name));
const sessionRes = await page.request.get(`${BASE}/api/auth/session`);
console.log("session via request:", await sessionRes.text());
await page.goto(`${BASE}/account`, { waitUntil: "load" });
console.log("account URL:", page.url());

const adminReq = await page.request.get(`${BASE}${target}`, { maxRedirects: 0 }).catch((e) => e);
console.log("raw /admin request status:", adminReq.status ? adminReq.status() : adminReq);
if (adminReq.status) {
  console.log("raw /admin location header:", adminReq.headers()["location"]);
}

await page.goto(`${BASE}${target}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: out, fullPage: true });

console.log("URL:", page.url());
console.log("Errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
