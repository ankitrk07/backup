import { chromium } from 'playwright';
import fs from 'fs';

// Curate candidates for Fashion, Toys, and remaining tech
const candidates = [
  // Fashion - Shoes on white background
  { id: '1549298916-b41d501d3772', name: 'shoe-1-white' },
  { id: '1595950653106-6c9ebd614d3a', name: 'shoe-2-white' },
  { id: '1600185365483-26d7a4cc7519', name: 'shoe-3-white' },
  { id: '1584735935682-2f2b69dff9d2', name: 'shoe-4-white' },
  { id: '1525966222134-fcfa99b8ae77', name: 'shoe-5-vans' },
  { id: '1560769629-975ec94e6a86', name: 'shoe-6' },

  // Fashion - T-shirts & Shirts on white background
  { id: '1521572267360-ee0c2909d518', name: 'shirt-1-white' },
  { id: '1583743814966-8936f5b7be1a', name: 'shirt-2-black' },
  { id: '1596755094514-f87e34085b2c', name: 'shirt-3-formal' },
  { id: '1602810318383-e386cc2a3ccf', name: 'shirt-4-casual' },
  { id: '1562157873-818bc0726f68', name: 'shirt-5-folded' },
  { id: '1618354691373-d851c5c3a990', name: 'tshirt-hanger' },

  // Fashion - Jeans & Jackets on white background
  { id: '1541099649105-f69ad21f3246', name: 'jeans-1' },
  { id: '1582552938357-32b906df40cb', name: 'jeans-2' },
  { id: '1544441893-675973e31985', name: 'jacket-1' },
  { id: '1551028719-00167b16eac5', name: 'jacket-2' },
  { id: '1591047139829-d91aecb6caea', name: 'blazer-1' },
  { id: '1576566588028-4147f3842f27', name: 'sweater-1' },
  { id: '1515372039744-b8f02a3ae446', name: 'dress-1' },
  { id: '1595777457583-95e059d581b8', name: 'dress-2' },

  // Toys & Games on white background
  { id: '1587654780291-39c9404d746b', name: 'toy-wooden' },
  { id: '1558060370-d644479cb6f7', name: 'toy-teddy' },
  { id: '1596461404969-9ae70f2830c1', name: 'toy-rubiks' },
  { id: '1611996575749-79a3a250f948', name: 'toy-chess' },
  { id: '1587654780291-39c9404d746b', name: 'toy-blocks' },
  { id: '1594787318286-3d835c1d207f', name: 'toy-car' },
  { id: '1535572292327-11f6c77f805a', name: 'toy-bear' },
  { id: '1560969184-10fe8719e047', name: 'toy-robot' },

  // Tech items on white
  { id: '1508685096489-7aacd43bd3b1', name: 'watch-clean' },
  { id: '1527864550417-7fd91fc51a46', name: 'mouse-clean' },
  { id: '1608043152269-423dbba4e7e1', name: 'speaker-clean' },
  { id: '1583394838336-acd977736f90', name: 'headphone-white' }
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
  <h2>Fashion & Toys Contact Sheet</h2>
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

const outPath = 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/contact-sheet-2.html';
fs.writeFileSync(outPath, html, 'utf8');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 2400 } });
  await page.goto('file:///' + outPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/screenshots/contact_sheet_2.png', fullPage: true });
  await browser.close();
  console.log('Contact sheet 2 captured!');
}

main().catch(console.error);
