import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';

const root = process.cwd();
const dist = resolveDistRoot(root);
const key = process.env.INDEXNOW_KEY?.trim();

function resolveIndexNowHost() {
  const explicit = process.env.INDEXNOW_HOST?.trim();
  if (explicit) return explicit;
  const origin = process.env.PUBLIC_SITE_ORIGIN?.trim();
  if (origin) {
    try {
      return new URL(origin).hostname;
    } catch {
      /* fall through */
    }
  }
  return 'cs2-cheats.org';
}

const host = resolveIndexNowHost();

if (!key) {
  console.log('IndexNow: skipped (INDEXNOW_KEY not set).');
  process.exit(0);
}

const sitemapPath = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.warn('IndexNow: dist/sitemap.xml missing — skipping ping.');
  process.exit(0);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).slice(0, 10000);

if (urlList.length === 0) {
  console.warn('IndexNow: no URLs found in sitemap.');
  process.exit(0);
}

const keyFile = path.join(dist, `${key}.txt`);
fs.writeFileSync(keyFile, key, 'utf8');

const payload = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList,
};

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (response.ok) {
  console.log(`IndexNow: submitted ${urlList.length} URL(s) (HTTP ${response.status}).`);
} else {
  const body = await response.text();
  console.warn(`IndexNow: ping failed HTTP ${response.status}: ${body.slice(0, 200)}`);
}
