import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const masterPng = path.join(publicDir, 'logo-master.png');

if (!fs.existsSync(masterPng)) {
  console.error('generate-brand-icons: add public/logo-master.png (square PNG).');
  process.exit(1);
}

const src = sharp(masterPng).ensureAlpha();
const sourceLabel = 'logo-master.png';

/** PWA / manifest — same artwork at high resolution */
await src
  .clone()
  .resize(360, 360, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'favicon-v2-360.png'));

await src
  .clone()
  .resize(180, 180, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'apple-touch-icon-v2.png'));

await src
  .clone()
  .resize(32, 32, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'favicon-v2-32.png'));

/** Tab / shortcut icon — 48×48 as requested */
await src
  .clone()
  .resize(48, 48, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'favicon-v2.ico'));

const favicon32Path = path.join(publicDir, 'favicon-v2-32.png');
const b64 = fs.readFileSync(favicon32Path).toString('base64');
fs.writeFileSync(
  path.join(publicDir, 'favicon-v2.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" role="img" aria-label="Site icon"><image width="32" height="32" href="data:image/png;base64,${b64}" /></svg>\n`,
);

/** Default OG/Twitter image — on-site so previews match current brand (cache-busted filename). */
const ogW = 1200;
const ogH = 630;
const logoForOg = await src
  .clone()
  .resize(520, 520, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .ensureAlpha()
  .png()
  .toBuffer();

await sharp({
  create: {
    width: ogW,
    height: ogH,
    channels: 4,
    background: { r: 13, g: 10, b: 20, alpha: 1 },
  },
})
  .composite([{ input: logoForOg, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'og-image-v2.png'));

fs.copyFileSync(path.join(publicDir, 'favicon-v2.ico'), path.join(publicDir, 'favicon.ico'));

const legacy = [
  'logo.svg',
  'favicon.svg',
  'favicon-16.png',
  'favicon-32.png',
  'favicon-cs2.png',
  'apple-touch-icon.png',
];
for (const name of legacy) {
  const p = path.join(publicDir, name);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log(
  `Brand icons from ${sourceLabel}: favicon-v2.ico (48px), favicon.ico (copy), favicon-v2-32.png, favicon-v2-360.png, apple-touch-icon-v2.png, favicon-v2.svg, og-image-v2.png; removed legacy favicon names.`,
);
