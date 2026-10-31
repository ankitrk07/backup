import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to Home...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000); // let Next.js hydrate & images load

  console.log('Capturing Home...');
  await page.screenshot({ path: path.join(outDir, '01_home_above_fold.png') });

  // Scroll to Categories & Curated Grid
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, '02_home_categories_and_grid.png') });

  console.log('Navigating to Electronics...');
  await page.goto('http://localhost:3000/electronics', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(outDir, '03_electronics_catalog.png') });

  console.log('Capturing zoomed product card...');
  const cards = page.locator('article');
  const count = await cards.count();
  console.log(`Found ${count} articles/cards`);
  
  if (count > 0) {
    const firstCard = cards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    // Hover state capture
    await firstCard.hover();
    await page.waitForTimeout(800);
    await firstCard.screenshot({ path: path.join(outDir, '04_product_card_zoom.png') });
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(err => {
  console.error('Error in capture-screenshots:', err);
  process.exit(1);
});
