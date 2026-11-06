/** Single store destination — buy buttons use internal /go/ paths only. */
const STORE_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcs2-faceit';

export const CHECKOUT_URLS = {
  cs2: STORE_URL,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/cs2', CHECKOUT_URLS.cs2],
  ['/go/cs2/', CHECKOUT_URLS.cs2],
  ['/go/store', CHECKOUT_URLS.cs2],
  ['/go/store/', CHECKOUT_URLS.cs2],
]);

/** Old product slugs → current paths (302). Keys must match trailingSlash: 'always' URLs. */
export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/cs2-cheats/lite/', '/products/cs2-cheats/cs2-store/'],
  ['/products/cs2-cheats/pro/', '/products/cs2-cheats/cs2-store/'],
  ['/products/cs2-cheats/elite/', '/products/cs2-cheats/cs2-store/'],
  ['/products/cs2-cheats/unlock-all/', '/products/cs2-cheats/cloud-dma/'],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

export function resolveLegacyProductRedirect(pathname) {
  const direct = LEGACY_PRODUCT_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return LEGACY_PRODUCT_REDIRECTS.get(`${pathname}/`) ?? null;
  }
  return null;
}
