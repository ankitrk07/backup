import { chromium } from 'playwright';
import fs from 'fs';

const candidates = [
  // Jeans & pants on clean white
  { id: '1576995853123-5a10305d93c0', name: 'jeans-flat-1' },
  { id: '1542272604-780c968595a8', name: 'jeans-flat-2' },
  { id: '1604176354204-926873ff3da9', name: 'jeans-flat-3' },
  { id: '1565084888279-aca607ecce0c', name: 'jeans-flat-4' },

  // Dresses / women's wear on clean white / studio
  { id: '1490481651871-ab68de25d43d', name: 'fashion-flat-1' },
  { id: '1489987707025-afc232f7ea0f', name: 'fashion-flat-2' },
  { id: '1525507119028-ed4c629a60a3', name: 'fashion-flat-3' },
  { id: '1512436991641-6745cdb1723f', name: 'fashion-flat-4' },

  // Plush & Teddy on clean white
  { id: '1559454403-b8fb88521f11', name: 'teddy-white-1' },
  { id: '1561037404-61cd46aa615b', name: 'dog-white-2' },
  { id: '1563245372-f21724e3856d', name: 'toy-3' },
  { id: '1558877385-81a1c7e67d72', name: 'toy-4' },

  // LEGO / Games on clean white
  { id: '1585366119957-e9730b6d0f60', name: 'lego-1' },
  { id: '1618843479313-40f8afb4b4d8', name: 'lego-car-white' },
  { id: '1534447677768-be436bb09401', name: 'lego-blocks-white' },
  { id: '1563941402622-4e7a488bcc57', name: 'domino-white' },

  // Tablets & Gadgets on clean white
  { id: '1561154464-82e9adf32764', name: 'tablet-white' },
  { id: '1512499617640-c74ae3a79d37', name: 'tech-flat-white' },
  { id: '1505740420928-5e560c06d30e', name: 'old-yellow-headphone' },
  { id: '1584438784894-089d6a62b8fa', name: 'phone-white-clean' }
];

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #111; color: #fff; font-family: sans-serif; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .card { background: #222; border-radius: 8px; overflow: hidden; padding: 8px; text-align: center; }
    img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 6px; }
    p { margin: 8px 0 4px; font-size: 11px; word-break: break-all; }
  </style>
</head>
<body>
  <h2>Contact Sheet 3</h2>
  <div class="grid">
    ${candidates.map(c => `
      <div class="card">
        <img src="https://images.unsplash.com/photo-${c.id}?q=80&w=400&auto=format&fit=crop" />
        <p><strong>${c.name}</strong></p>
        <p>${c.id}</p>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

const outPath = 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/contact-sheet-3.html';
fs.writeFileSync(outPath, html, 'utf8');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1800 } });
  await page.goto('file:///' + outPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/screenshots/contact_sheet_3.png', fullPage: true });
  await browser.close();
  console.log('Contact sheet 3 captured!');
}

main().catch(console.error);
