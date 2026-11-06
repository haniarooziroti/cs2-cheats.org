import type { ProductPage } from '../data/products';
import { t } from '../i18n';
import { SITE_DOMAIN, SITE_URL } from './site';
import { getPageSeoEntry, type PageSeoEntry } from './pageSeo';
import { DEFAULT_OG_IMAGE_ABSOLUTE } from './media';

function normalizeOrigin(url: string): string {
  return url.replace(/\/$/, '');
}

/**
 * Canonical / OG / hreflang base URL — always production (cs2-cheats.org).
 * Preview hosts must not leak into canonicals or sitemap-facing meta.
 */
export const SITE_ORIGIN = normalizeOrigin(SITE_URL);

/** Hostname only — IndexNow key file location must match this host when deploying. */
export const SITE_HOSTNAME = (() => {
  try {
    return new URL(SITE_ORIGIN).hostname;
  } catch {
    return SITE_DOMAIN;
  }
})();

/** Default social preview image (remote WebP on Supabase). */
export const DEFAULT_OG_IMAGE = DEFAULT_OG_IMAGE_ABSOLUTE;

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string): PageSeoEntry {
  const entry = getPageSeoEntry(pathname);
  if (entry) return entry;
  return { title: t.site.title, description: t.site.description };
}

const TITLE_MIN = 50;
const TITLE_MAX = 60;

/** Brand suffix for `<title>` when building from a keyword phrase. */
export function titleBrandSuffix(): string {
  return ` | ${t.site.domain}`;
}

/** Article / thread titles: keyword + brand, trimmed to 50–60 characters total. */
export function pageTitle(keyword: string, suffixSite = t.site.domain): string {
  const suffix = ` | ${suffixSite}`;
  const maxKeyword = TITLE_MAX - suffix.length;
  let k = keyword.replace(/\s+/g, ' ').trim();
  if (k.length > maxKeyword) {
    k = k.slice(0, maxKeyword);
    const lastSpace = k.lastIndexOf(' ');
    if (lastSpace > 12) k = k.slice(0, lastSpace);
    k = k.trim();
  }
  let out = `${k}${suffix}`;
  if (out.length < TITLE_MIN) {
    const pad = ' — CS2 cheats';
    k = `${k}${pad}`.slice(0, maxKeyword).trim();
    out = `${k}${suffix}`;
    if (out.length > TITLE_MAX) out = out.slice(0, TITLE_MAX);
  }
  return out;
}

/** Product detail `<title>` — 50–60 chars with main cheat page vs utility phrasing. */
export function productPageTitle(product: Pick<ProductPage, 'title' | 'kind' | 'slug'>): string {
  if (product.slug === 'cs2-store') {
    return pageTitle('CS2 cheats: ESP, aim modules & checkout');
  }
  const phrase =
    product.kind === 'tier'
      ? `${product.title}: CS2 cheat modules`
      : `${product.title}: CS2 cheat utility overview`;
  return pageTitle(phrase);
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = SITE_HOSTNAME;
