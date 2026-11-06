import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';

const root = process.cwd();
const dist = resolveDistRoot(root);

const siteOrigin = (
  process.env.PUBLIC_SITE_ORIGIN ? String(process.env.PUBLIC_SITE_ORIGIN).trim().replace(/\/$/, '') : ''
) || 'https://cs2-cheats.org';
const source = path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  const rel = path.relative(root, source) || 'sitemap-0.xml';
  console.error(`finalize-sitemap: ${rel} not found — run astro build first.`);
  process.exit(1);
}

const raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

const formatted = formatUrlset(raw);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteOrigin}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

const robotsTxt = `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${siteOrigin}/sitemap.xml

# RSS: ${siteOrigin}/rss.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robotsTxt, 'utf8');

const outRel = path.relative(root, path.join(dist, 'sitemap.xml')) || 'dist/sitemap.xml';
console.log(`Sitemap finalized: ${urlCount} URLs → ${outRel}`);
console.log(`robots.txt sitemap line → ${siteOrigin}/sitemap.xml`);
