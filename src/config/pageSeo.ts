/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Counter-Strike 2 Cheats & Hacks | CS2 Aimbot & ESP',
    description:
      'CS2 cheats with aimbot, ESP, wallhack-style overlays, and radar for PC—Premier and Competitive on Steam. Faceit’s client adds its own checks. Compare modules on cs2-cheats.org, then open the linked store for access.',
  },
  '/products/cs2-cheats/': {
    title: 'CS2 Cheats | Faceit-Ready ESP, Aimbot & More',
    description:
      'Paid CS2 cheat tiers for Steam: ESP, aimbot, radar hack, triggerbot, and optional skin changer utility. Subscription-style access depends on the store—review each card, then checkout.',
  },
  '/products/cs2-cheats/elite/': {
    title: 'CS2 Elite Cheats | Full ESP & Aimbot Suite',
    description:
      'Elite CS2 build with full ESP, aimbot tuning, radar, trigger assist, and priority loader updates.',
  },
  '/products/cs2-cheats/utilities/': {
    title: 'CS2 Utilities | HWID & Companion Tools',
    description:
      'CS2 cheat utilities: HWID tools, appeals workspace, and a local skin changer preview—pair with the main loader subscription from the product hub.',
  },
  '/blog/': {
    title: 'CS2 Cheat Articles | ESP, Aimbot & Setup',
    description:
      'CS2 hack and cheat guides: ESP, aimbot, wallhack layout, radar hack vs audio, triggerbot timing, Premier queues, and Faceit client caveats.',
  },
  '/forum/': {
    title: 'CS2 Cheat Forums | Setup & Feature Talk',
    description:
      'CS2 cheats forum: loader first boot, aimbot levels, ESP clutter, paid tier questions, Faceit vs Premier play, and subscription or key handoffs.',
  },
  '/faq/': {
    title: 'FAQ | CS2 Cheats, Loader & Checkout',
    description:
      'FAQ on CS2 cheats: VAC is never “safe”—we explain risk, paid access, cheat loader problems, ESP and aimbot scope, and how to buy CS2 cheats through the store.',
  },
  '/terms/': {
    title: 'Terms | cs2-cheats.org',
    description:
      'Terms of use, checkout disclaimers, and refund policy for visitors of cs2-cheats.org.',
  },
  '/privacy/': {
    title: 'Privacy | cs2-cheats.org',
    description:
      'How cs2-cheats.org uses analytics and cookies when you browse, and how store-side tickets work after purchase.',
  },
  '/about/': {
    title: 'About | Counter-Strike 2 Cheat Resource',
    description:
      'What cs2-cheats.org covers: CS2 ESP, aimbot, wallhack-style overlays, utilities, and articles—no unrelated games.',
  },
  '/support/': {
    title: 'Support | cs2-cheats.org',
    description:
      'Contact support for loader, checkout, or HWID questions related to CS2 cheat access from cs2-cheats.org.',
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
