import fs from 'fs';

const content = fs.readFileSync('prisma/seed.ts', 'utf8');
const regex = /name:\s*"([^"]+)",\s*\n\s*category:\s*"([^"]+)"/g;
let match;
const products = [];
while ((match = regex.exec(content)) !== null) {
  products.push({ name: match[1], category: match[2] });
}
console.log(`Found ${products.length} products:`);
console.log(JSON.stringify(products, null, 2));
