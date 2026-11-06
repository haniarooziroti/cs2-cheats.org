/**
 * Post-build SEO validation (run after `npm run build`).
 * Recursively reads all `.html` under `dist/` (also supports `dist/client/` layouts).
 */

import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';
import { SITE_ORIGIN, resolveSiteOrigin } from './site-origin.mjs';

resolveSiteOrigin();
const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 155;

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

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Decode common HTML entities in head/meta text (length checks use visible characters). */
function decodeHtmlEntities(raw) {
  if (!raw) return raw;
  return raw
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ');
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? decodeHtmlEntities(stripTags(m[1])) : '';
}

function extractMetaDesc(html) {
  const m = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  if (m) return decodeHtmlEntities(m[1].trim());
  const m2 = html.match(
    /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i,
  );
  return m2 ? decodeHtmlEntities(m2[1].trim()) : '';
}

function extractCanonical(html) {
  const m = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (m) return m[1];
  const m2 = html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m2 ? m2[1] : '';
}

function extractHreflangs(html) {
  const out = [];
  const re = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi;
  let x;
  while ((x = re.exec(html))) out.push({ hreflang: x[1], href: x[2] });
  const re2 = /<link[^>]*href=["']([^"']+)["'][^>]*hreflang=["']([^"']+)["'][^>]*rel=["']alternate["']/gi;
  while ((x = re2.exec(html))) out.push({ hreflang: x[2], href: x[1] });
  return out;
}

function extractH1s(html) {
  const out = [];
  const re = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  let m;
  while ((m = re.exec(html))) out.push(decodeHtmlEntities(stripTags(m[1])));
  return out;
}

/** Astro redirect stubs: noindex + refresh to canonical URL — not evaluated like full pages. */
function isRedirectStub(html) {
  return /http-equiv=["']refresh["']/i.test(html) && /name=["']robots["'][^>]*content=["']noindex/i.test(html);
}

function fileToUrlPath(file, distRoot) {
  let rel = path.relative(distRoot, file).replace(/\\/g, '/');
  if (rel.endsWith('index.html')) rel = rel.slice(0, -'index.html'.length);
  else if (rel.endsWith('.html')) rel = rel.slice(0, -'.html'.length);
  const u = '/' + rel.replace(/^\/+/, '');
  if (u === '/') return '/';
  return u.endsWith('/') ? u : `${u}/`;
}

function titleMainKeyword(title) {
  const pipe = title.split('|')[0].split('—')[0];
  return pipe.replace(/\s+/g, ' ').trim().toLowerCase();
}

const STOP = new Set([
  'the',
  'and',
  'for',
  'with',
  'from',
  'that',
  'this',
  'your',
  'are',
  'but',
  'not',
  'you',
  'how',
  'our',
  'use',
]);

function tokenizeKeywords(phrase) {
  return phrase
    .toLowerCase()
    .replace(/&/g, ' ')
    .split(/[^a-z0-9]+/i)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function h1ContainsKeyword(h1Text, titleKeywordPhrase) {
  const h = h1Text.toLowerCase();
  const words = tokenizeKeywords(titleKeywordPhrase);
  if (!words.length) return true;
  return words.some((w) => h.includes(w));
}

const root = process.cwd();
const distRoot = resolveDistRoot(root);
const htmlFiles = walkHtml(distRoot).filter((f) => !f.includes(`${path.sep}404.html`) && !/404\.html$/.test(f));

let exit = 0;
const issues = [];

for (const file of htmlFiles.sort()) {
  const html = fs.readFileSync(file, 'utf8');
  if (isRedirectStub(html)) continue;

  const urlPath = fileToUrlPath(file, distRoot);
  const expectedCanonical = `${SITE_ORIGIN}${urlPath === '/' ? '/' : urlPath}`;

  const title = extractTitle(html);
  const desc = extractMetaDesc(html);
  const canonical = extractCanonical(html);
  const hreflangs = extractHreflangs(html);
  const h1s = extractH1s(html);

  const relFile = path.relative(root, file);

  if (canonical !== expectedCanonical) {
    issues.push(`${relFile}: canonical mismatch\n  got: ${canonical}\n  exp: ${expectedCanonical}`);
    exit = 1;
  }

  const en = hreflangs.filter((h) => h.hreflang === 'en');
  const xd = hreflangs.filter((h) => h.hreflang === 'x-default');
  if (en.length !== 1 || en[0].href !== expectedCanonical) {
    issues.push(`${relFile}: need exactly one hreflang="en" → ${expectedCanonical}`);
    exit = 1;
  }
  if (xd.length !== 1 || xd[0].href !== expectedCanonical) {
    issues.push(`${relFile}: need exactly one hreflang="x-default" → ${expectedCanonical}`);
    exit = 1;
  }

  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    issues.push(`${relFile}: title length ${title.length} (want ${TITLE_MIN}–${TITLE_MAX}): "${title}"`);
    exit = 1;
  }

  if (!desc || desc.length < DESC_MIN || desc.length > DESC_MAX) {
    issues.push(`${relFile}: meta description length ${desc?.length ?? 0} (want ${DESC_MIN}–${DESC_MAX})`);
    exit = 1;
  }

  if (h1s.length !== 1) {
    issues.push(`${relFile}: expected exactly one <h1>, found ${h1s.length}`);
    exit = 1;
  } else {
    const kw = titleMainKeyword(title);
    if (!h1ContainsKeyword(h1s[0], kw)) {
      issues.push(`${relFile}: H1 should reflect title keywords\n  title: ${title}\n  h1: ${h1s[0]}`);
      exit = 1;
    }
  }
}

if (issues.length) {
  console.error('SEO check failed:\n\n' + issues.join('\n\n'));
} else {
  console.log(`seo-check: OK (${htmlFiles.length} pages checked)`);
}

process.exit(exit);
