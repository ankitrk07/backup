import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Known popular Unsplash tech/fashion/toy photos
const candidates = [
  // Laptops / Tech on clean background
  { id: '1496181133206-80ce9b88a853', name: 'laptop-1' },
  { id: '1541807084-5c52b6b3adef', name: 'laptop-2' },
  { id: '1588872657578-7efd1f1555ed', name: 'laptop-3' },
  { id: '1531297484001-80022131f5a1', name: 'laptop-4' },
  { id: '1611186871348-b1ce696e52c9', name: 'laptop-5' },
  { id: '1517336714731-489689fd1ca8', name: 'laptop-6' },
  // Phones on clean background
  { id: '1580910051074-3eb694886505', name: 'phone-1-good' },
  { id: '1598327105666-5b89351aff97', name: 'phone-2' },
  { id: '1567581935884-3349723552ca', name: 'phone-3' },
  { id: '1585060544812-6b45742d762f', name: 'phone-4' },
  { id: '1565849904461-04a58ad377e0', name: 'phone-5' },
  { id: '1592899677977-9c10ca588bbd', name: 'phone-6' },
  // Tablets / Gadgets
  { id: '1544244015-0df4b3ffc6b0', name: 'ipad-1' },
  { id: '1561154464-82e9adf32764', name: 'ipad-2' },
  { id: '1585792180666-f7347c490ee2', name: 'ipad-3' },
  { id: '1527977966376-1c8408f9f108', name: 'drone-1' },
  { id: '1526170375885-4d8ecf77b99f', name: 'camera-1' },
  { id: '1593508512255-86ab42a8e620', name: 'vr-1' },
  { id: '1550745165-9bc0b252726f', name: 'retro-gadget' },
  // Headphones & Audio
  { id: '1546435770-a3e426bf472b', name: 'headphones-1-good' },
  { id: '1583394838336-acd977736f90', name: 'headphones-2' },
  { id: '1484704849700-f032a568e944', name: 'headphones-3' },
  { id: '1600294037681-c80b4cb5b434', name: 'airpods-1' },
  { id: '1590658268037-6bf12165a8df', name: 'earbuds-1' },
  { id: '1545454675-3531b543be5d', name: 'speaker-1' },
  { id: '1608043152269-423dbba4e7e1', name: 'speaker-2' },
  // Watches & Accessories
  { id: '1523275335684-37898b6baf30', name: 'watch-1' },
  { id: '1508685096489-7aacd43bd3b1', name: 'watch-2' },
  { id: '1527864550417-7fd91fc51a46', name: 'mouse-1' },
  { id: '1615663245857-ac93bb7c39e7', name: 'mouse-2' },
  { id: '1609091839311-d5365f9ff1c5', name: 'powerbank-1' },
  { id: '1628191010210-a59de33e5941', name: 'dock-1' },
  // Toys & Games
  { id: '1585366119957-e9730b6d0f60', name: 'lego-street' },
  { id: '1566576912321-d58ddd7a6088', name: 'lego-bricks' },
  { id: '1587654780291-39c9404d746b', name: 'wooden-toy' },
  { id: '1515488042361-ee00e0ddd4e4', name: 'blocks' },
  { id: '1581235720704-06d3acfcb36f', name: 'car-1' },
  { id: '1594787318286-3d835c1d207f', name: 'car-2' },
  { id: '1610890716171-6b1bb98ffd09', name: 'board-game' },
  { id: '1558060370-d644479cb6f7', name: 'teddy-1' },
  { id: '1563245372-f21724e3856d', name: 'plush-1' }
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
  <h2>Candidate Image Contact Sheet</h2>
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

const outPath = 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/contact-sheet.html';
fs.writeFileSync(outPath, html, 'utf8');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 2400 } });
  await page.goto('file:///' + outPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:/Users/sudip/.gemini/antigravity-ide/brain/38fb1861-50a8-4992-8a92-2a2dda49d607/screenshots/contact_sheet.png', fullPage: true });
  await browser.close();
  console.log('Contact sheet captured!');
}

main().catch(console.error);
