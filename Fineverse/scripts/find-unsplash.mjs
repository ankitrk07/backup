import { chromium } from 'playwright';

async function fetchUnsplashUrls(searchQuery) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://unsplash.com/s/photos/${searchQuery}`;
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);

  const images = await page.$$eval('img', imgs => imgs.map(img => img.src).filter(src => src.includes('photo-')));
  console.log(`Found ${images.length} images for "${searchQuery}":`);
  const unique = [...new Set(images.map(s => s.split('?')[0]))];
  console.log(unique.slice(0, 15));
  await browser.close();
}

fetchUnsplashUrls('product-white-background');
