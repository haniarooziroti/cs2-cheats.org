import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic = 'all' | 'plans' | 'esp' | 'scripts' | 'safety' | 'products' | 'blog' | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const elite = link('CS2 Elite', productPath('elite'));
const lite = link('Lite tier (ESP & intel)', ROUTES.products);
const pro = link('Pro tier (aim + ESP)', ROUTES.products);
const productsHub = link('CS2 products hub', ROUTES.products);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const ugc = link('UGC appeals', productPath('ugc'));
const skin = link('Skin preview utility', productPath('unlock-all'));
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('articles', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if the CS2 loader is online?',
    a: a('Use the status banner on cs2-cheats.org and your operator portal. Re-check after every Counter-Strike 2 or VAC Live update.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('The store emails a license key and portal login. Download only from that portal—never from random links or DMs.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using CS2 cheats?',
    a: a('Yes. VAC Live, replays, and league clients can flag software. You accept that risk when you inject third-party tools.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('Counter-Strike 2 through Steam on Windows 10 or 11 64-bit. macOS and Linux are not supported here.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Use the HWID reset in the portal or open a ticket on the linked store with your key. Limits depend on tier.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are tiers and utilities listed?',
    a: `${productsHub} lists Lite, Pro, Elite, ${hwid}, ${ugc}, and ${skin}. Buy buttons open the external store.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is CS2 ESP?',
    a: `ESP draws players, weapons, and bomb info on your screen. ${lite} focuses on overlays without aim automation.`,
    scopes: ['lite', 'pro', 'elite'],
  },
  {
    id: 'esp-vs-aim',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between ESP and aim assist?',
    a: `ESP is information only. Aim smoothing and trigger timing are combat assists on ${pro} and ${elite}.`,
  },
  {
    id: 'which-tier-esp',
    topic: 'plans',
    icon: 'faqWhichTierEsp',
    q: 'Which tier is ESP-only?',
    a: `${lite} is intel-only: boxes, bomb flags, radar hints—no aim modules. ${pro} adds aim and trigger layers.`,
    scopes: ['lite'],
  },
  {
    id: 'which-tier-aim',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'Which tier includes aimbot-style smoothing?',
    a: `${pro} and ${elite} ship legit aim curves, FOV caps, and trigger timing. ${lite} has none of that.`,
    scopes: ['pro'],
  },
  {
    id: 'rank-lite-vs-pro',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How do Lite, Pro, and Elite differ?',
    a: `${lite} = overlays. ${pro} = overlays plus aim and trigger. ${elite} = full stack with priority rebuilds when slots are open.`,
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why is Elite limited?',
    a: a('Limited slots keep patch turnaround predictable. Check the banner before you pay for Elite-specific access.'),
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Will OBS show my overlay?',
    a: `Stream-safe toggles try to hide layers from capture APIs—still record a local test before you broadcast. See the ${blog} piece on stream setup.`,
  },
  {
    id: 'status-not-promise',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Does “online” on the banner mean I am safe forever?',
    a: a('No. Online means the build passed current checks—Valve can ship changes any week. Stop when the banner shows testing or offline.'),
  },
  {
    id: 'esp-quieter',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is ESP quieter than aim assist in demos?',
    a: a('Usually, but both still violate rules when used in protected queues. Replays can still look suspicious if you spam glow.'),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When do I need the HWID Spoofer?',
    a: `Use ${hwid} when new Steam accounts fail on one PC but work elsewhere—hardware-level blocks. Pure account bans may need ${ugc} paperwork instead.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'ugc-what',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What is UGC?',
    a: `${ugc} is an appeal workspace—templates, uploads, timelines—not a promised overturn.`,
    scopes: ['ugc'],
  },
  {
    id: 'skin-changer',
    topic: 'products',
    icon: 'faqSkinChanger',
    q: 'Does skin preview change Steam inventory?',
    a: `${skin} shows cosmetics locally. Everyone else still sees your real items. Bundled into ${elite} or sold alone.`,
    scopes: ['unlock-all'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Is the loader external?',
    a: a('Yes—runs alongside CS2 with overlays instead of pasting files into the game folder. Risk still exists—read the status banner.'),
  },
  {
    id: 'faceit-extra',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What about Faceit?',
    a: `The Faceit client adds checks beyond Steam. Read ${link('Faceit constraints article', '/blog/faceit-cs2-cheats-constraints/')} before paying only for that use case.`,
  },
  {
    id: 'vac-update',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What should I do after a patch?',
    a: a('Verify CS2 files, restart Steam, wait for the banner to show online, then import a conservative preset from the portal.'),
  },
  {
    id: 'discord-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get install help?',
    a: a('Open a ticket on the linked store with your order address, Windows build, and CS2 version. Avoid posting keys in public threads.'),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `Use the ${faqPage} for every topic, or browse ${blog} for longer reads.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'Help center',
  title: 'FAQ for cheats, products & articles',
  subtitle:
    'Everything about Lite, Pro, Elite tiers, utilities, safety, and on-site articles. Filter tiers, ESP, aim, safety, products, setup, and articles below.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = ['all', 'plans', 'esp', 'scripts', 'safety', 'products', 'blog', 'setup'];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for everything.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) => !f.scopes && ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) => ['rank-lite-vs-pro', 'status-not-promise', 'vac-update'].includes(f.id));

  const combined =
    kind === 'tier' ? [...scoped, ...tierCompare, ...general.slice(0, 8)] : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from the operator portal linked in your receipt—not from forum DMs.'),
    },
  ],
  Features: [
    {
      id: 'blog-feat-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Will these ESP settings work on every map?',
      a: a('Layouts are a starting point—tweak thickness per map and resolution after you test in deathmatch.'),
    },
  ],
  Faceit: [
    {
      id: 'blog-faceit-risk',
      topic: 'safety',
      icon: 'faqBlogSecVac',
      q: 'Does Faceit allow these modules?',
      a: a('No league client allows cheats. The article explains conflicts; assume league play is off-limits.'),
    },
  ],
  Troubleshooting: [
    {
      id: 'blog-vac-article',
      topic: 'setup',
      icon: 'faqBlogGuideStatus',
      q: 'VAC flagged me after I followed the setup article—why?',
      a: a('Articles reduce mistakes; they do not remove platform risk. Stop injecting until support answers your ticket.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are these articles official manuals?',
    a: `They explain workflows and link to ${productsHub}. Tier pages list modules for checkout decisions.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Who do I contact if I am stuck?',
    a: `Open a ticket on the linked store with your order email and CS2 build number, or read ${faqPage} and ${blog} while you wait.`,
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('wallhack')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which tier matches these ESP tips?',
      a: `${lite} is ESP-first. ${pro} keeps the same overlays and adds aim layers.`,
    });
  }
  if (slug.includes('aimbot') || slug.includes('trigger')) {
    slugHints.push({
      id: 'blog-slug-aim',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Where is aim assist included?',
      a: `${pro} and ${elite} include smoothing and trigger timing—not ${lite}.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('vac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this replace HWID or UGC tools?',
      a: `Articles complement ${hwid} and ${ugc}—read those product pages for scope.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

export const compareRows = [
  { feature: 'Player ESP & skeleton', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Bomb & kit markers', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Radar reinforcement', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Smoke silhouette assist', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Capture / stream-safe toggles', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Legit aim smoothing', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Trigger timing modes', icon: 'compareOrbwalker' as const, lite: false, pro: true, elite: true },
  { feature: 'Recoil compensation', icon: 'compareActivator' as const, lite: false, pro: true, elite: true },
  { feature: 'Advanced radar stacking', icon: 'compareAbilityRadius' as const, lite: false, pro: false, elite: true },
  { feature: 'Misc movement assists', icon: 'compareSmokeAlert' as const, lite: false, pro: false, elite: true },
  { feature: 'Priority rebuild queue', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
  { feature: 'Cosmetic preview module', icon: 'compareSkinChanger' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];
