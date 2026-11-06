import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
/** Master artwork — replace this file to update all tab / PWA icons. */
const sourcePng = path.join(publicDir, 'favicon-cs2.png');

if (!fs.existsSync(sourcePng)) {
  console.error('generate-brand-icons: public/favicon-cs2.png not found — add your favicon PNG there first.');
  process.exit(1);
}

const src = sharp(sourcePng).ensureAlpha();

await src
  .clone()
  .resize(180, 180, { fit: 'cover' })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await src.clone().resize(32, 32, { fit: 'cover' }).png().toFile(path.join(publicDir, 'favicon-32.png'));

await src.clone().resize(16, 16, { fit: 'cover' }).png().toFile(path.join(publicDir, 'favicon-16.png'));

await src.clone().resize(32, 32, { fit: 'cover' }).png().toFile(path.join(publicDir, 'favicon.ico'));

// SVG link uses same pixels as the master so it matches favicon-cs2.png in all clients.
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 360 360" role="img" aria-label="CS2 cheats">
  <image href="/favicon-cs2.png" width="360" height="360" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg, 'utf8');

console.log(
  'Brand icons generated from favicon-cs2.png: apple-touch-icon.png, favicon.ico, favicon-16/32.png, favicon.svg',
);
