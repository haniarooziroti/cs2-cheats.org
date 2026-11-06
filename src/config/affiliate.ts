/** Paid-link attributes for /go/ hops and zadeyo.com. Same-tab; do not add target=_blank. */
export const AFFILIATE_REL = 'sponsored nofollow noopener';

export const AFFILIATE_DISCLOSURE_SHORT =
  'Affiliate disclosure: we earn a commission if you buy through our links.';

export const AFFILIATE_DISCLOSURE_LONG =
  'Affiliate disclosure: checkout links on this site go through an affiliate path to the linked store. We may earn a commission if you buy. Prices, keys, refunds, and support after payment are handled by that store, not by cs2-cheats.org.';

export function isAffiliateHref(href: string | undefined): boolean {
  if (!href) return false;
  return href.includes('/go/') || /zadeyo\.com/i.test(href);
}

export function affiliateRel(href: string | undefined): string | undefined {
  return isAffiliateHref(href) ? AFFILIATE_REL : undefined;
}
