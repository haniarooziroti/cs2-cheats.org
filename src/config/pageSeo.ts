/**
 * Central titles/descriptions for high-traffic routes.
 * Titles: 50–60 chars; descriptions: 120–155 chars (see scripts/seo-check.mjs).
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'CS2 Cheats: ESP, Aim, Wallhack for Steam | cs2-cheats.org',
    description:
      'Compare CS2 cheats with ESP, aim, and wallhack-style overlays for Steam. Read modules here, then open the linked store checkout when you want paid access.',
  },
  '/products/cs2-cheats/': {
    title: 'CS2 Cheat Shop: ESP, Aim Tiers One Page | cs2-cheats.org',
    description:
      'Browse CS2 cheat tiers with ESP, aim, radar, triggers in one catalog. Pick a queue, then open the external store for pricing, keys, delivery.',
  },
  '/products/cs2-cheats/elite/': {
    title: 'CS2 Elite Cheats: Full Aim and ESP Stack | cs2-cheats.org',
    description:
      'Elite stacks ESP, aim, radar, and priority loader updates. Read Faceit limits here, then use the store checkout when the portal shows open slots.',
  },
  '/products/cs2-cheats/utilities/': {
    title: 'CS2 Utilities: HWID, UGC, Skin Preview | cs2-cheats.org',
    description:
      'Compare HWID spoofing, UGC appeals, and local skin previews beside the loader. Match each add-on to your issue here, then open the store listing to buy.',
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
    title: 'CS2 Cheat FAQ: Risk, Tiers, Checkout | cs2-cheats.org',
    description:
      'FAQ on cheat risk, VAC rules, tier picks, HWID tools, and linked store checkout. Scan answers first, then open support or articles before you buy.',
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
