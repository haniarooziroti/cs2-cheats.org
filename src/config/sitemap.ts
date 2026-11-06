import type { SitemapItem } from '@astrojs/sitemap';
import { blogPosts } from '../data/blog';
import { parseBlogDate } from '../utils/schema';

const buildDate = new Date().toISOString();
/** Stable lastmod for static hub/legal pages (blog keeps real post dates). */
const STATIC_HUB_LASTMOD = '2025-11-01';

const blogLastmod = new Map(
  blogPosts.map((post) => [`/blog/${post.slug}/`, parseBlogDate(post.date)] as const),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (
    path.includes('/404') ||
    path.startsWith('/go/') ||
    path.includes('/rss.xml') ||
    path.startsWith('/cheats/') ||
    path === '/contact/' ||
    path.startsWith('/products/dota-2-cheats/') ||
    path === '/products/cs2-cheats/lite/' ||
    path === '/products/cs2-cheats/pro/' ||
    path === '/products/cs2-cheats/elite/' ||
    path === '/products/cs2-cheats/unlock-all/' ||
    path === '/forum/' ||
    path.startsWith('/forum/')
  ) {
    return undefined;
  }

  if (path === '/') {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 1;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/blog/') {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 0.9;
    item.changefreq = 'weekly';
    return item;
  }

  if (path.startsWith('/blog/')) {
    item.priority = 0.7;
    item.changefreq = 'monthly';
    item.lastmod = blogLastmod.get(path) ?? buildDate;
    return item;
  }

  if (path.startsWith('/products/')) {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 0.8;
    item.changefreq = 'weekly';
    return item;
  }

  if (
    path === '/about/' ||
    path === '/support/' ||
    path === '/privacy/' ||
    path === '/terms/' ||
    path === '/faq/'
  ) {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 0.5;
    item.changefreq = 'yearly';
    return item;
  }

  item.lastmod = STATIC_HUB_LASTMOD;
  item.priority = 0.6;
  item.changefreq = 'monthly';
  return item;
}
