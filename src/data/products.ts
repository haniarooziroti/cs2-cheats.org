import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { PRODUCT_BASE } from '../config/site';
import { SEO_MEDIA, SEO_MEDIA_LEGACY } from '../config/media';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductFeatureGroup {
  heading: string;
  items: string[];
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  /** Short catalog blurb (cards, body). */
  desc: string;
  /** Meta description for `<meta name="description">` (120–155 chars). */
  seoDescription: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  /** Flat list (catalog cards) or fallback when featureGroups omitted */
  fullFeatures: string[];
  /** Grouped modules on product detail — takes precedence over fullFeatures when set */
  featureGroups?: ProductFeatureGroup[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

export const productRelatedBlogSlugs: Record<string, string[]> = {
  'cs2-store': [
    'cs2-esp-settings-clutches',
    'cs2-wallhack-crosshair-layout',
    'cs2-radar-hack-audio',
    'cs2-vac-error-after-patch',
    'cs2-aimbot-smoothing-ranked',
    'faceit-cs2-cheats-constraints',
    'how-to-install-cs2-cheats',
  ],
  'hwid-spoofer': ['hwid-spoof-new-cs2-account', 'cs2-vac-error-after-patch', 'how-to-install-cs2-cheats'],
  ugc: ['cs2-vac-error-after-patch', 'hwid-spoof-new-cs2-account', 'how-to-install-cs2-cheats'],
  'cloud-dma': ['faceit-cs2-cheats-constraints', 'how-to-install-cs2-cheats', 'cs2-vac-error-after-patch'],
};

const productBase = PRODUCT_BASE;

/** SERP snippets for product detail pages (`npm run seo:check` enforces length). */
const productPageSeoDescription: Record<string, string> = {
  'cs2-store':
    'CS2 cheat modules: ESP, aim, intel, triggers, Faceit notes. Compare here, then open affiliate checkout for keys and pricing.',
  'hwid-spoofer':
    'HWID Spoofer resets disk and MAC IDs when Steam blocks new accounts on one PC. Follow the checklist here, then open the store listing to buy.',
  ugc:
    'UGC organizes VAC and trade-lock appeals with timelines—not a guaranteed unban. Read scope here, then open the store when paperwork fits your case.',
  'cloud-dma':
    'Cloud DMA info for CS2: what the add-on is for, cabling and second-PC expectations, plus store checkout. Read here before you buy hardware.',
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check live status',
    desc: 'Read the banner on cs2-cheats.org and the portal—pause if the build shows updating after a CS2 patch.',
  },
  {
    num: '02',
    title: 'Pick modules on-site',
    desc: 'Read the CS2 cheat and utility pages here—ESP-only, full combat stack, HWID, appeals, or Cloud DMA—then match checkout to your queue.',
  },
  {
    num: '03',
    title: 'Complete store checkout',
    desc: 'Finish payment on the linked store; keep the receipt email beside your license message for support.',
  },
  {
    num: '04',
    title: 'Install and test',
    desc: 'Download only from the portal, run a deathmatch verification, then sync presets to the cloud before Premier.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Counter-Strike 2 and VAC Live receive frequent updates. Confirm loader compatibility on the status panel at cs2-cheats.org before you launch. Overlay density can change between competitive, wingman, and community servers.';

const sharedLimitations =
  'Third-party software may violate Steam, Faceit, or tournament rules and can lead to bans or league bans. You accept all risk. Availability can change after game or anti-cheat updates without notice.';

const cs2PlatformSecurity: SystemRequirement[] = [
  { icon: 'compatShield', text: 'HVCI (Hypervisor-protected code integrity) enabled where the portal requires it.' },
  { icon: 'compatMonitor', text: 'Memory integrity / core isolation enabled for supported Faceit-oriented builds.' },
  { icon: 'compatRefresh', text: 'TPM present and enabled for secure boot paths the operator documents.' },
  { icon: 'compatPackage', text: 'Secure Boot on when the checklist lists it for your loader branch.' },
];

const cs2SystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: '64-bit Windows 10 or Windows 11 with current updates.' },
  { icon: 'reqSteam', text: 'Steam Counter-Strike 2 client with the same branch as the loader build.' },
  ...cs2PlatformSecurity,
  { icon: 'reqSettings', text: 'Administrator rights for the loader when the portal requires it.' },
  { icon: 'reqWifi', text: 'Stable connection for portal downloads and key checks.' },
  { icon: 'reqCpu', text: 'Hardware that meets Valve’s published CS2 recommendations for your resolution.' },
];

const faceitPosition: ProductFeatureGroup = {
  heading: 'Faceit build',
  items: [
    'Faceit-oriented build when you buy the Faceit tier—tuned for the Faceit client’s extra checks, not Valve-only Premier.',
    'Read the Faceit constraints article before you queue; official rules still prohibit cheats.',
    'Premier / Competitive on Steam still differ from Faceit sessions—use separate presets.',
  ],
};

const storefrontFeatureGroups: ProductFeatureGroup[] = [
  {
    heading: 'Intel & ESP',
    items: [
      'Player ESP boxes and skeleton toggles',
      'Bomb carrier and dropped C4 markers',
      'Defuse kit and radar reinforcement',
      'Smoke silhouette assist where supported',
      'Stream and capture hide toggles',
    ],
  },
  {
    heading: 'Combat assists',
    items: [
      'Legit aim with FOV caps and smoothing',
      'Per-weapon recoil assist',
      'Trigger delay and hitchance-style gates',
      'Team damage safeguards and observer-safe presets',
    ],
  },
  faceitPosition,
  {
    heading: 'Cloud & delivery',
    items: [
      'Portal auto updater and status banner',
      'Cloud profile backup slots',
      'Optional Cloud DMA add-on from the store (see Cloud DMA utility page)',
    ],
  },
];

type GalleryKey = keyof typeof galleryRaw;

const galleryRaw = {
  cs2EspPlayers: {
    src: SEO_MEDIA.dustyCourtyardAk,
    alt: 'Counter-Strike 2 style FPS firefight in a sunlit courtyard with tactical positioning',
    caption: 'Player ESP in CS2',
    captionDesc: 'Boxes, distances, and team colors tuned for mid fights.',
  },
  cs2AimRecoil: {
    src: SEO_MEDIA.mediterraneanAlleyRifle,
    alt: 'Rifle duel in a narrow Mediterranean-style alley in a CS2-like map',
    caption: 'Aim smoothing',
    captionDesc: 'FOV-limited pull with recoil overlay for rifle sprays.',
  },
  cs2Radar: {
    src: SEO_MEDIA.mediterraneanVillageBanana,
    alt: 'Banana alley and Mediterranean village lane — map rotation reads',
    caption: 'Radar reinforcement',
    captionDesc: 'Height-aware dots for flank timing on map rotations.',
  },
  cs2Trigger: {
    src: SEO_MEDIA.desertCorridorEsp,
    alt: 'Long sightline duel in a desert corridor — timing and peek discipline',
    caption: 'Trigger timing',
    captionDesc: 'Delay profiles for jiggle duels and long-range peeks.',
  },
  cs2Skin: {
    src: SEO_MEDIA_LEGACY.css11,
    alt: 'Counter-Strike style first-person scene — loadout and inspect context',
    caption: 'Local skin preview',
    captionDesc: 'Client-side inspect for thumbnails—not a live inventory edit.',
  },
  cs2Smoke: {
    src: SEO_MEDIA.underpassSmokeGraffiti,
    alt: 'Smoke and graffiti under an urban overpass — silhouette and smoke reads',
    caption: 'Smoke edge reads',
    captionDesc: 'Silhouette assist layered under crosshair-safe HUD space.',
  },
  cs2Bomb: {
    src: SEO_MEDIA.bananaAlleyBSite,
    alt: 'B-site banana alley clash — bomb site retake timing',
    caption: 'Bomb intel',
    captionDesc: 'Carrier tags and drop markers for retake planning.',
  },
  cs2StreetShowdown: {
    src: SEO_MEDIA.sunnyMiddleEasternStreet,
    alt: 'Sunny middle-eastern street lane firefight in a competitive FPS map',
    caption: 'Mid control',
    captionDesc: 'Intel for wide lanes and early map control.',
  },
  cs2OverpassSmoke: {
    src: SEO_MEDIA.tacticalSmokeOverpass,
    alt: 'Tactical smoke placement beneath highway overpass arches',
    caption: 'Execute smokes',
    captionDesc: 'Layering utility before site hits.',
  },
  cs2LegacyCs1: {
    src: SEO_MEDIA_LEGACY.cs1,
    alt: 'Classic Counter-Strike inspired lane duel',
    caption: 'Legacy pacing',
    captionDesc: 'Reference mood for older CS pacing and angles.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'cs2-cheats';
}

const storefrontAbout: ProductPage['about'] = [
  {
    type: 'p',
    text: 'This page lists what the linked seller bundles: Counter-Strike 2 ESP and wallhack-style intel, aim smoothing, triggers, and Faceit-facing notes when the portal ships that branch.',
  },
  { type: 'h2', text: 'How to pick modules' },
  {
    type: 'p',
    text: 'Start conservative: thin ESP, no glow spam, and low smoothing before Premier. Add combat assists only after deathmatch verification and after you read the Faceit constraints article if you queue there.',
  },
];

const storefrontBody: ProductPage['body'] = [
  { type: 'h2', text: 'What this page is for' },
  {
    type: 'p',
    text: 'Use it to compare scope before you open affiliate checkout. Exact SKUs, keys, and renewal terms live on the store; this site explains modules and risk.',
  },
  { type: 'h2', text: 'Articles before you pay' },
  {
    type: 'p',
    text: 'Read [ESP in clutches](/blog/cs2-esp-settings-clutches/), [aim smoothing](/blog/cs2-aimbot-smoothing-ranked/), and [Faceit constraints](/blog/faceit-cs2-cheats-constraints/) so you buy with realistic expectations.',
  },
  { type: 'h2', text: 'Hardware add-ons' },
  {
    type: 'p',
    text: 'Some operators sell Cloud DMA as a separate hardware path—see the [Cloud DMA utility page](/products/cs2-cheats/cloud-dma/) for cabling and second-PC expectations before checkout.',
  },
];

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When it fits' },
    {
      type: 'p',
      text: 'Use when fresh Steam accounts fail on one rig but work elsewhere—hardware-level conflicts. It is not a fix for pure account bans; see [UGC](/products/cs2-cheats/ugc/) for paperwork paths.',
    },
    { type: 'h2', text: 'Workflow' },
    {
      type: 'p',
      text: 'Restore point, uninstall conflicting tools, apply spoof, cold reboot, verify identifiers, then load a conservative cheat profile. Follow [HWID article](/blog/hwid-spoof-new-cs2-account/) step for step.',
    },
  ],
  ugc: [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'Structured appeals for VAC and trade-lock cases—templates, timelines, and upload slots. Outcomes still depend on platform review.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some penalties do not revert. When hardware is suspect, pair paperwork with [HWID Spoofer](/products/cs2-cheats/hwid-spoofer/); when reputation is burned, a new account may be the honest answer.',
    },
  ],
  'cloud-dma': [
    { type: 'h2', text: 'What Cloud DMA means here' },
    {
      type: 'p',
      text: 'Cloud DMA is an external hardware and firmware path some sellers bundle beside software cheats—memory is read from another machine so the gaming PC runs fewer risky hooks. Availability and fit depend on what the store lists when you checkout.',
    },
    { type: 'h2', text: 'Before you buy' },
    {
      type: 'p',
      text: 'Confirm cabling, second PC or laptop requirements, and BIOS or IOMMU notes in the seller’s listing. Pair with [installation hygiene](/blog/how-to-install-cs2-cheats/) and never stack mystery drivers.',
    },
    { type: 'h2', text: 'Related reading' },
    {
      type: 'p',
      text: 'Faceit and league clients add checks beyond Steam—read [Faceit constraints](/blog/faceit-cs2-cheats-constraints/) before paying only for that path.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<
    ProductPage,
    | 'overview'
    | 'images'
    | 'fullFeatures'
    | 'featureGroups'
    | 'goodToKnow'
    | 'limitations'
    | 'systemRequirements'
  >
> = {
  'cs2-store': {
    images: slide('cs2EspPlayers', 'cs2AimRecoil', 'cs2Trigger', 'cs2Smoke', 'cs2Radar'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: cs2SystemRequirements,
    featureGroups: storefrontFeatureGroups,
    fullFeatures: [
      'Player ESP boxes and skeleton',
      'Bomb and defuse kit markers',
      'Radar reinforcement',
      'Smoke silhouette assist',
      'Legit aim with FOV and smoothing',
      'Trigger delay profiles',
      'Recoil assist per weapon',
      'Stream and capture hide toggles',
      'Cloud profile backup',
      'Auto updater and status banner',
      'Optional Cloud DMA (store listing)',
    ],
    overview: {
      title: 'Counter-Strike 2 cheat overview',
      paragraphs: [
        'Compare ESP, aim, wallhack-style overlays, and trigger timing in one place, then open the affiliate checkout when you are ready to buy keys from the linked seller.',
        'Faceit adds its own client—trim modules and read constraints before you queue there; Steam Premier and scrims are the common fit for most buyers.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('cs2EspPlayers', 'cs2Radar', 'cs2Bomb'),
    goodToKnow:
      'Create a restore point, uninstall other spoof tools, and verify identifiers after a cold boot before opening CS2.',
    limitations:
      'Spoofing does not fix reputation bans alone. Never stack two drivers blindly. Work machines may be locked down by IT policy.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with admin rights.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point first.' },
      { icon: 'reqShieldGuide', text: 'Follow portal verification before launching cheats.' },
      { icon: 'reqWifi', text: 'Internet for identifier diff uploads.' },
    ],
    fullFeatures: [
      'Disk serial profiles',
      'MAC rotation',
      'Motherboard-friendly presets',
      'Restore checklist',
      'Conflict scanner',
      'Post-spoof diff export',
      'Cold boot walkthrough',
      'Discord recovery queue',
    ],
    overview: {
      title: 'Hardware reset workflow',
      paragraphs: [
        'Use the spoofer when CS2 or Steam IDs refuse fresh accounts on a single PC.',
        'Pair with conservative cheat profiles after spoof success.',
      ],
    },
  },
  ugc: {
    images: slide('cs2Bomb', 'cs2EspPlayers', 'cs2Radar'),
    goodToKnow:
      'Collect emails, ban notices, and receipts before opening a case. UGC organizes—they do not bypass human reviewers.',
    limitations:
      'No guaranteed unban. Some VAC marks are permanent; documentation only helps transparent appeals.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Receipt email from the external store.' },
      { icon: 'reqShieldAccount', text: 'Steam ID and penalty screenshots if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for uploads and responses.' },
    ],
    fullFeatures: [
      'Appeal templates',
      'Evidence timelines',
      'Status dashboard',
      'Multi-platform notes',
      'Secure uploads',
      'Follow-up reminders',
    ],
    overview: {
      title: 'Appeal workspace',
      paragraphs: [
        'Track VAC or marketplace restrictions with structured paperwork instead of scattered tickets.',
        'Use HWID tools when the platform hints at device fingerprints.',
      ],
    },
  },
  'cloud-dma': {
    images: slide('cs2EspPlayers', 'cs2Radar', 'cs2Bomb'),
    goodToKnow:
      'Cloud DMA is hardware-heavy: confirm firmware, cabling, and a stable second PC with the seller before you pay.',
    limitations:
      'Misconfigured DMA or firmware can brick boards or trigger platform bans. League and Faceit rules prohibit cheats—this page is informational only.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Primary gaming PC: 64-bit Windows 10 or 11 with current updates.' },
      { icon: 'reqCpu', text: 'Second machine or approved FPGA path per the store listing (not optional for most Cloud DMA kits).' },
      { icon: 'reqWifi', text: 'Stable LAN for portal sync if the operator requires cloud profile pairing.' },
      { icon: 'reqShieldGuide', text: 'Read seller IOMMU or virtualization notes before changing BIOS settings.' },
    ],
    fullFeatures: [
      'External memory read path (seller-dependent)',
      'Reduced on-PC injection vs pure software builds',
      'Firmware and cable notes from listing',
      'Portal pairing when the seller enables it',
      'Works alongside software tiers when listed',
    ],
    overview: {
      title: 'Cloud DMA overview',
      paragraphs: [
        'Use this page to understand what Cloud DMA add-ons are before you add hardware on checkout—exact boards and bundles are defined on the linked store.',
        'It is not a replacement for reading Faceit or tournament rules; treat it as a high-friction hardware option.',
      ],
    },
  },
};

function buildStorefrontPage(): ProductPage {
  const slug = 'cs2-store';
  const content = productContent[slug];
  return {
    slug,
    kind: 'tier',
    badge: 'Store',
    tier: 'Counter-Strike 2',
    name: 'CS2',
    title: 'CS2 cheats',
    subtitle: 'One linked seller: ESP, aim, triggers, Faceit notes—checkout on the store after you read scope.',
    desc: content.overview.paragraphs[0],
    seoDescription: productPageSeoDescription[slug],
    features: [
      'ESP and bomb intel',
      'Aim smoothing + triggers',
      'Faceit-oriented notes',
      'Cloud DMA add-on info',
    ],
    more: 7,
    variant: 'popular',
    buyUrl: checkoutForSlug(slug),
    images: content.images,
    overview: content.overview,
    acquisition: acquisitionFor('CS2 cheats'),
    goodToKnow: content.goodToKnow,
    limitations: content.limitations,
    fullFeatures: content.fullFeatures,
    featureGroups: content.featureGroups,
    systemRequirements: content.systemRequirements,
    about: storefrontAbout,
    body: storefrontBody,
    relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
  };
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        seoDescription: productPageSeoDescription[slug] ?? product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        featureGroups: content.featureGroups,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [buildStorefrontPage(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

/** Homepage hero carousel — keep to five slides for faster LCP and clearer focus */
export const heroSlides = slide(
  'cs2EspPlayers',
  'cs2AimRecoil',
  'cs2Radar',
  'cs2Smoke',
  'cs2Trigger',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Counter-Strike 2 cheat catalog, HWID tools, UGC appeals, and Cloud DMA info for Steam PC.',
  buyUrl: checkoutPath('cs2'),
};
