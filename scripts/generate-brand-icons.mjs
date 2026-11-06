import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
/** Vector master — CS2 “2” mark; PNG favicons are rasterized from this in CI/build. */
const sourceSvg = path.join(publicDir, 'logo.svg');

if (!fs.existsSync(sourceSvg)) {
  console.error('generate-brand-icons: public/logo.svg not found.');
  process.exit(1);
}

const src = sharp(sourceSvg).ensureAlpha();

await src
  .clone()
  .resize(180, 180, { fit: 'cover' })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await src.clone().resize(32, 32, { fit: 'cover' }).png().toFile(path.join(publicDir, 'favicon-32.png'));

await src.clone().resize(16, 16, { fit: 'cover' }).png().toFile(path.join(publicDir, 'favicon-16.png'));

await src.clone().resize(32, 32, { fit: 'cover' }).png().toFile(path.join(publicDir, 'favicon.ico'));

// Inline vector favicon (no embedded raster) for clients that prefer SVG.
fs.copyFileSync(sourceSvg, path.join(publicDir, 'favicon.svg'));

const png360 = await src.clone().resize(360, 360, { fit: 'cover' }).png().toBuffer();
fs.writeFileSync(path.join(publicDir, 'favicon-cs2.png'), png360);

console.log(
  'Brand icons generated from logo.svg: apple-touch-icon.png, favicon.ico, favicon-16/32.png, favicon-cs2.png, favicon.svg',
);
