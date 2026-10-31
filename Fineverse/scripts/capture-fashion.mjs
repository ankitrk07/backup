import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/screenshots';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to Fashion...');
  await page.goto('http://localhost:3000/fashion', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(outDir, '05_fashion_catalog.png') });

  await browser.close();
  console.log('Fashion screenshot captured!');
}

main().catch(console.error);
