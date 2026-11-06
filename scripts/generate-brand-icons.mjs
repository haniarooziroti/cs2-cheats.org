import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
/** Primary master — PNG (square). Falls back to logo.svg for local/dev without PNG. */
const masterPng = path.join(publicDir, 'logo-master.png');
const sourceSvg = path.join(publicDir, 'logo.svg');

let src;
if (fs.existsSync(masterPng)) {
  src = sharp(masterPng).ensureAlpha();
} else if (fs.existsSync(sourceSvg)) {
  src = sharp(sourceSvg).ensureAlpha();
} else {
  console.error('generate-brand-icons: add public/logo-master.png (or legacy public/logo.svg).');
  process.exit(1);
}

const sourceLabel = fs.existsSync(masterPng) ? 'logo-master.png' : 'logo.svg';

await src
  .clone()
  .resize(180, 180, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await src.clone().resize(32, 32, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(path.join(publicDir, 'favicon-32.png'));

await src.clone().resize(16, 16, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(path.join(publicDir, 'favicon-16.png'));

await src.clone().resize(32, 32, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(path.join(publicDir, 'favicon.ico'));

const png360 = await src.clone().resize(360, 360, { fit: 'cover' }).png({ compressionLevel: 9 }).toBuffer();
fs.writeFileSync(path.join(publicDir, 'favicon-cs2.png'), png360);

/** SVG favicon wraps the 32px PNG so tab icons match without shipping the old M vector. */
const favicon32Path = path.join(publicDir, 'favicon-32.png');
const b64 = fs.readFileSync(favicon32Path).toString('base64');
fs.writeFileSync(
  path.join(publicDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" role="img" aria-label="Site icon"><image width="32" height="32" href="data:image/png;base64,${b64}" /></svg>\n`,
);

console.log(
  `Brand icons generated from ${sourceLabel}: apple-touch-icon.png, favicon.ico, favicon-16/32.png, favicon-cs2.png, favicon.svg`,
);
