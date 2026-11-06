/**
 * Post-build checks: every <img> has alt; every /-prefixed img src exists under dist/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';
import { resolveSiteOrigin } from './site-origin.mjs';

resolveSiteOrigin();

const root = process.cwd();
const dist = resolveDistRoot(root);

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtml(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walkHtml(dist);
const imgTagRe = /<img\b[^>]*>/gi;
const srcRe = /\bsrc=["']([^"']+)["']/i;
const altRe = /\balt=["']([^"']*)["']/i;

let missingAlt = [];
let missingFile = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  imgTagRe.lastIndex = 0;
  let m;
  while ((m = imgTagRe.exec(html))) {
    const tag = m[0];
    if (!altRe.test(tag)) {
      missingAlt.push({ file: rel, tag: tag.slice(0, 120) });
    } else {
      const am = tag.match(altRe);
      if (am && am[1] === undefined) missingAlt.push({ file: rel, tag: tag.slice(0, 120) });
    }
    const sm = tag.match(srcRe);
    if (sm) {
      const u = sm[1];
      if (u.startsWith('/') && !u.startsWith('//')) {
        const local = path.join(dist, u.replace(/^\//, ''));
        if (!fs.existsSync(local)) {
          missingFile.push({ file: rel, src: u });
        }
      }
    }
  }
}

if (missingAlt.length || missingFile.length) {
  console.error('verify-dist-html: FAILED');
  if (missingAlt.length) {
    console.error(`  <img> missing alt: ${missingAlt.length}`);
    missingAlt.slice(0, 20).forEach((x) => console.error(`    ${x.file}: ${x.tag}`));
    if (missingAlt.length > 20) console.error(`    ... and ${missingAlt.length - 20} more`);
  }
  if (missingFile.length) {
    console.error(`  missing files for img src: ${missingFile.length}`);
    missingFile.slice(0, 20).forEach((x) => console.error(`    ${x.file} → ${x.src}`));
    if (missingFile.length > 20) console.error(`    ... and ${missingFile.length - 20} more`);
  }
  process.exit(1);
}

console.log(`verify-dist-html: OK (${files.length} HTML files, img alt + local src checks)`);
