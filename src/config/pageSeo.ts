/**
 * Central titles/descriptions for high-traffic routes.
 * Titles: 50–60 chars; descriptions: 120–155 chars (see scripts/seo-check.mjs).
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  /** Optional comma-separated keywords for high-traffic templates. */
  keywords?: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'CS2 cheats: ESP, aim, radar overview | cs2-cheats.org',
    description:
      'CS2 cheats overview: ESP, aim, radar, and wallhack-style intel for Steam. Read modules here, then open the catalog for pricing and subscription plans.',
    keywords:
      'cs2 cheats, counter strike 2 cheats, cs2 esp, cs2 aimbot, cs2 wallhack, cs2 radar hack, cs2 triggerbot, cs2 hack, steam cs2 cheats',
  },
  '/products/cs2-cheats/': {
    title: 'Buy CS2 cheats: pricing and plans | cs2-cheats.org',
    description:
      'Buy CS2 cheats: compare pricing, subscription plans, HWID tools, UGC, and Cloud DMA notes, then open affiliate checkout when you are ready to pay.',
    keywords:
      'buy cs2 cheats, cs2 cheat pricing, cs2 cheat subscription, cloud dma cs2, hwid spoofer cs2, cs2 cheat catalog',
  },
  '/products/cs2-cheats/cs2-store/': {
    title: 'CS2 cheat modules: ESP, aim, checkout | cs2-cheats.org',
    description:
      'CS2 cheat modules: ESP, aim, triggers, Faceit notes. Read scope on this page, then open affiliate checkout for store pricing and keys.',
    keywords:
      'cs2 cheat modules, cs2 esp, cs2 aim assist, cs2 wallhack, cs2 triggerbot, faceit cs2 cheat, zadeyo cs2',
  },
  '/products/cs2-cheats/cloud-dma/': {
    title: 'CS2 Cloud DMA add-on: hardware notes | cs2-cheats.org',
    description:
      'Cloud DMA basics for CS2: second PC, firmware, cabling expectations. Read risks here before you add hardware on the linked affiliate store checkout.',
    keywords: 'cloud dma cs2, dma cheat cs2, external dma cs2, cs2 dma hardware, cs2 second pc dma',
  },
  '/products/cs2-cheats/utilities/': {
    title: 'CS2 utilities: HWID spoofer and UGC | cs2-cheats.org',
    description:
      'Compare HWID spoofing and UGC appeals beside the CS2 cheat catalog. Match each utility to your issue here, then open affiliate store checkout to buy.',
  },
  '/blog/': {
    title: 'CS2 cheat guides: ESP, aim, loaders | cs2-cheats.org',
    description:
      'Guides on CS2 ESP tuning, aim smoothing, wallhack layout, Faceit caveats, and loader steps. Filter topics, read posts, then open the product hub to buy.',
  },
  '/forum/': {
    title: 'CS2 cheat editorial notes and FAQs | cs2-cheats.org',
    description:
      'Editorial CS2 cheat notes on loaders, aim, ESP clutter, Faceit, and VAC after patches. These pages are not live user posts; follow article links for setup.',
  },
  '/faq/': {
    title: 'CS2 cheat FAQ: VAC, risk, and store | cs2-cheats.org',
    description:
      'FAQ on CS2 cheat risk, VAC rules, cheat modules, HWID tools, Cloud DMA, and affiliate checkout. Scan answers first, then open support or articles.',
  },
  '/terms/': {
    title: 'Site terms: content, store, liability | cs2-cheats.org',
    description:
      'Terms for cs2-cheats.org, affiliate disclaimers, liability caps. Read before guides; seller sets refunds and access after payment.',
  },
  '/privacy/': {
    title: 'Privacy and cookies on this CS2 site | cs2-cheats.org',
    description:
      'How we use cookies and analytics while you browse, and how to ask data questions. Checkout data is handled by the linked seller under their policy.',
  },
  '/about/': {
    title: 'About CS2 cheat guides and catalog | cs2-cheats.org',
    description:
      'We explain CS2 cheat modules, publish setup articles, and keep checkout on the linked store. Read scope before you follow buy links.',
  },
  '/support/': {
    title: 'CS2 cheat support: FAQ and tickets | cs2-cheats.org',
    description:
      'Paths for buyers: FAQ, guides, and store tickets after purchase. Gather receipt email, Windows build, and error text before you message support.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
