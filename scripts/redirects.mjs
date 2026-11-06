import { resolveSiteOrigin } from './site-origin.mjs';

resolveSiteOrigin();

/** Must match PRODUCT_BASE in src/config/site.ts */
const PRODUCT_BASE = '/products/cs2-cheats/';
const productsBase = PRODUCT_BASE.replace(/\/$/, '');
const utilitiesPath = `${productsBase}/utilities/`;

/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/forum', '/forum/'],
  ['/cheats', PRODUCT_BASE],
  ['/cheats/', PRODUCT_BASE],
  ['/cheats/lite', `${productsBase}/cs2-store/`],
  ['/cheats/lite/', `${productsBase}/cs2-store/`],
  ['/cheats/pro', `${productsBase}/cs2-store/`],
  ['/cheats/pro/', `${productsBase}/cs2-store/`],
  [`/cheats/elite`, `${productsBase}/cs2-store/`],
  [`/cheats/elite/`, `${productsBase}/cs2-store/`],
  [`${productsBase}/lite`, `${productsBase}/cs2-store/`],
  [`${productsBase}/lite/`, `${productsBase}/cs2-store/`],
  [`${productsBase}/pro`, `${productsBase}/cs2-store/`],
  [`${productsBase}/pro/`, `${productsBase}/cs2-store/`],
  [`${productsBase}/elite`, `${productsBase}/cs2-store/`],
  [`${productsBase}/elite/`, `${productsBase}/cs2-store/`],
  [`${productsBase}/unlock-all`, `${productsBase}/cloud-dma/`],
  [`${productsBase}/unlock-all/`, `${productsBase}/cloud-dma/`],
  ['/cheats/compare', '/blog/cs2-esp-settings-clutches/'],
  ['/cheats/compare/', '/blog/cs2-esp-settings-clutches/'],
  ['/products/dota-2-cheats/utilities', utilitiesPath],
  ['/products/dota-2-cheats/utilities/', utilitiesPath],
  ['/products/dota-2-cheats', PRODUCT_BASE],
  ['/products/dota-2-cheats/', PRODUCT_BASE],
  ['/products/dota-2-cheats/account-recovery', `${productsBase}/ugc/`],
  ['/products/dota-2-cheats/account-recovery/', `${productsBase}/ugc/`],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
