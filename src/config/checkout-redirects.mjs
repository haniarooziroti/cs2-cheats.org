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

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
