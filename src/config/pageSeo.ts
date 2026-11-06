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
    title: 'CS2 Cheats: ESP, Aim, Wallhack for Steam | cs2-cheats.org',
    description:
      'Compare CS2 cheats: ESP, aim, wallhack-style intel, triggers for Steam. Read modules on-site, then use affiliate checkout for paid keys.',
    keywords:
      'cs2 cheats, counter strike 2 cheats, cs2 esp, cs2 aimbot, cs2 wallhack, cs2 radar hack, cs2 triggerbot, cs2 hack, faceit cs2, steam cs2 cheats, cs2 cheat buy',
  },
  '/products/cs2-cheats/': {
    title: 'CS2 Cheat Catalog: Modules, DMA, HWID | cs2-cheats.org',
    description:
      'CS2 cheat catalog: ESP & aim modules, HWID spoofer, UGC, Cloud DMA. Pick tools for your queue, then open affiliate checkout for keys.',
    keywords:
      'cs2 cheat modules, cs2 esp buy, cs2 aim cheat, cloud dma cs2, hwid spoofer cs2, cs2 vac appeal, cs2 utilities',
  },
  '/products/cs2-cheats/cs2-store/': {
    title: 'CS2 Cheats Catalog Page: ESP, Aim & Buy | cs2-cheats.org',
    description:
      'CS2 cheat modules: ESP, aim, triggers, Faceit notes. Read scope on-site, then open affiliate checkout for store pricing and keys.',
    keywords:
      'cs2 cheat buy, cs2 esp, cs2 aim assist, cs2 wallhack, cs2 triggerbot, faceit cs2 cheat, cs2 cheat modules, zadeyo cs2',
  },
  '/products/cs2-cheats/cloud-dma/': {
    title: 'CS2 Cloud DMA: Hardware Add-On Before Buy | cs2-cheats.org',
    description:
      'Cloud DMA basics for CS2: second PC, firmware, cabling expectations. Read risks here before you add hardware on the linked affiliate store checkout.',
    keywords: 'cloud dma cs2, dma cheat cs2, external dma cs2, cs2 dma hardware, cs2 second pc dma',
  },
  '/products/cs2-cheats/utilities/': {
    title: 'CS2 Utilities: HWID Spoofer & UGC Appeals | cs2-cheats.org',
    description:
      'Compare HWID spoofing and UGC appeals beside the CS2 cheat catalog. Match each utility to your issue here, then open affiliate store checkout to buy.',
  },
  '/blog/': {
    title: 'CS2 Guides: ESP, Aim, Loader Articles | cs2-cheats.org',
    description:
      'Guides on CS2 ESP tuning, aim smoothing, wallhack layout, Faceit caveats, and loader steps. Filter topics, read posts, then open the product hub to buy.',
  },
  '/forum/': {
    title: 'CS2 Forums: Loader Tips, Buyer Threads | cs2-cheats.org',
    description:
      'Threads on loaders, aim, ESP clutter, Faceit notes, and VAC after patches—text only. Open a thread or follow article links when you need more context.',
  },
  '/faq/': {
    title: 'CS2 Cheat FAQ: Risk, VAC, Store & Checkout | cs2-cheats.org',
    description:
      'FAQ on CS2 cheat risk, VAC rules, cheat modules, HWID tools, Cloud DMA, and affiliate checkout. Scan answers first, then open support or articles.',
  },
  '/terms/': {
    title: 'Site Terms: Content, Store Links, Liability | cs2-cheats.org',
    description:
      'Terms for cs2-cheats.org, affiliate disclaimers, liability caps. Read before guides; seller sets refunds and access after payment.',
  },
  '/privacy/': {
    title: 'Privacy: Analytics, Cookies on cs2-cheats.org | cs2-cheats',
    description:
      'How we use cookies and analytics while you browse, and how to ask data questions. Checkout data is handled by the linked seller under their policy.',
  },
  '/about/': {
    title: 'About: CS2 Guides and Product Catalog | cs2-cheats.org',
    description:
      'We explain CS2 cheat modules, publish setup articles, host buyer forums—checkout stays on the linked store. Read scope before you follow buy links.',
  },
  '/support/': {
    title: 'CS2 Support: FAQ, Articles, Store Help | cs2-cheats.org',
    description:
      'Paths for buyers: FAQ, guides, forums, and store tickets after purchase. Gather receipt email, Windows build, and error text before you message support.',
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
