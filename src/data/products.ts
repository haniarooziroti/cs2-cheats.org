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
  lite: ['cs2-esp-settings-clutches', 'cs2-wallhack-crosshair-layout', 'cs2-radar-hack-audio', 'cs2-vac-error-after-patch'],
  pro: [
    'cs2-aimbot-smoothing-ranked',
    'cs2-triggerbot-peek-timing',
    'cs2-stream-proof-overlays',
    'faceit-cs2-cheats-constraints',
  ],
  elite: [
    'faceit-cs2-cheats-constraints',
    'cs2-aimbot-smoothing-ranked',
    'cs2-esp-settings-clutches',
    'cs2-vac-error-after-patch',
    'how-to-install-cs2-cheats',
  ],
  'hwid-spoofer': ['hwid-spoof-new-cs2-account', 'cs2-vac-error-after-patch', 'how-to-install-cs2-cheats'],
  ugc: ['cs2-vac-error-after-patch', 'hwid-spoof-new-cs2-account', 'how-to-install-cs2-cheats'],
  'unlock-all': ['cs2-stream-proof-overlays', 'cs2-esp-settings-clutches', 'how-to-install-cs2-cheats'],
};

const productBase = PRODUCT_BASE;

/** SERP snippets for product detail pages (`npm run seo:check` enforces length). */
const productPageSeoDescription: Record<string, string> = {
  lite:
    'CS2 Lite: ESP, bomb flags, radar hints, stream capture for Steam—no aim automation. Review modules here, then open the linked store for your key.',
  pro:
    'CS2 Pro adds aim smoothing, trigger delay, recoil assist on Lite ESP for Premier. Read Faceit notes here, then open the external store for pricing.',
  elite:
    'CS2 Elite: Faceit-oriented aim and ESP when the portal allows. Confirm HVCI, TPM, secure boot here, then checkout on the linked external store.',
  'hwid-spoofer':
    'HWID Spoofer resets disk and MAC IDs when Steam blocks new accounts on one PC. Follow the checklist here, then open the store listing to buy.',
  ugc:
    'UGC organizes VAC and trade-lock appeals with timelines—not a guaranteed unban. Read scope here, then open the store when paperwork fits your case.',
  'unlock-all':
    'Skin preview loads knives and gloves locally without changing live Steam inventory. Read limits here, then open the store listing to buy.',
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check live status',
    desc: 'Read the banner on cs2-cheats.org and the portal—pause if the build shows updating after a CS2 patch.',
  },
  {
    num: '02',
    title: 'Choose tier or utility',
    desc: 'Match modules to how you queue: Lite for ESP-only nights, Pro for aim assist, utilities for hardware or appeal work.',
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

const aimbotGroup: ProductFeatureGroup = {
  heading: 'Aimbot',
  items: ['Smooth aim', 'FOV control', 'Bone selection', 'Visible check'],
};

const visualsGroup: ProductFeatureGroup = {
  heading: 'Visuals',
  items: ['Player ESP', 'Skeleton', 'Box', 'Health', 'Radar reinforcement', 'Stream-proof overlay where supported'],
};

const miscGroup: ProductFeatureGroup = {
  heading: 'Misc',
  items: ['Config save / load', 'Hotkeys', 'Cloud profile slots via portal'],
};

const miscWithTrigger: ProductFeatureGroup = {
  heading: 'Misc',
  items: [...miscGroup.items, 'Trigger delay profiles'],
};

const eliteFeatureGroups: ProductFeatureGroup[] = [
  faceitPosition,
  aimbotGroup,
  visualsGroup,
  miscGroup,
];

const proFeatureGroups: ProductFeatureGroup[] = [
  {
    heading: 'Scope',
    items: ['Steam Premier and Competitive focused—adds aim and trigger on top of full ESP; Faceit needs extra care (see article).'],
  },
  aimbotGroup,
  visualsGroup,
  miscWithTrigger,
];

const liteFeatureGroups: ProductFeatureGroup[] = [
  {
    heading: 'Scope',
    items: ['Intel-only tier for Steam CS2—ESP, radar hints, and bomb flags without aim or trigger automation.'],
  },
  {
    heading: 'Visuals',
    items: ['Player ESP', 'Box and skeleton toggles', 'Bomb and kit markers', 'Radar reinforcement', 'Stream-proof overlay where supported'],
  },
  {
    heading: 'Misc',
    items: ['Config save / load', 'Hotkeys'],
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

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'CS2 Lite keeps the screen readable: ESP boxes, bomb carrier flags, and radar hints without aim automation. Built for players who want information first.',
    },
    { type: 'h2', text: 'Why start with Lite' },
    {
      type: 'p',
      text: 'It skips trigger and aim modules so your clips stay closer to manual aim while you still read executes faster. Pair with conservative colors from the ESP article before Premier.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'CS2 Pro adds legit aim smoothing, trigger timing, and recoil assistance on top of every Lite overlay.',
    },
    { type: 'h2', text: 'Ranked-minded defaults' },
    {
      type: 'p',
      text: 'Start with wide FOV and slow smoothing, then tighten after a week of demo review—not after one lucky clutch.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'CS2 Elite is the Faceit-client-oriented build: full aim, ESP, and misc stack when the portal lists that scope—official Faceit rules still prohibit cheats, so read constraints before you pay only for that path.',
    },
    { type: 'h2', text: 'Use Elite with discipline' },
    {
      type: 'p',
      text: 'Elite power needs boring presets first. Test in deathmatch, export configs, add Cloud DMA on the store if required, then queue when the banner shows online.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included overlays' },
    {
      type: 'p',
      text: 'Player ESP with distance, dormant tinting, bomb and kit markers, radar reinforcement, and stream capture toggles. No aim or trigger modules—see [Pro](/products/cs2-cheats/pro/) when you want those.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'License upgrades run through the portal so you keep cloud backups. Compare modules on the [products hub](/products/cs2-cheats/) before checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Combat layer' },
    {
      type: 'p',
      text: 'Legit aim with FOV caps, trigger delay modes, and per-weapon recoil curves. Read [aim smoothing](/blog/cs2-aimbot-smoothing-ranked/) before your first ranked session.',
    },
    { type: 'h2', text: 'Faceit note' },
    {
      type: 'p',
      text: 'Faceit adds its own client—see [Faceit constraints](/blog/faceit-cs2-cheats-constraints/) and trim glow before you pay solely for that path.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full operator set' },
    {
      type: 'p',
      text: 'Everything in Pro plus advanced radar logic, movement assists, and priority support channels. Slots stay limited so rebuilds stay fast.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'When Elite shows waitlisted on the banner, contact the store or portal with your tier choice—do not buy until a slot clears.',
    },
  ],
};

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
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Inspect knives, gloves, and stickers on your client for thumbnails and video boards—other players still see your real Steam inventory.',
    },
    { type: 'h2', text: 'Bundled in Elite' },
    {
      type: 'p',
      text: 'Elite includes cosmetic preview alongside combat modules. Buy standalone if you only need visuals.',
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
  lite: {
    images: slide('cs2EspPlayers', 'cs2Bomb', 'cs2Radar'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: cs2SystemRequirements,
    featureGroups: liteFeatureGroups,
    fullFeatures: [
      'Player ESP boxes & skeleton toggle',
      'Dormant enemy tint',
      'Bomb carrier & dropped C4 markers',
      'Defuse kit indicator',
      'Radar reinforcement overlay',
      'Smoke silhouette assist',
      'Capture hide toggles',
      'Distance readouts',
      'Team color filters',
      'Cloud profile backup',
      'Auto updater',
    ],
    overview: {
      title: 'Awareness-only CS2 workflow',
      paragraphs: [
        'Lite focuses on Counter-Strike 2 intel—who is swinging, where the bomb sits, and when flanks cross radar—without aim automation.',
        'Use it when you want faster reads in Premier but plan to keep crosshair movement yours. Upgrade to Pro when you are ready to tune aim curves.',
      ],
    },
  },
  pro: {
    images: slide('cs2AimRecoil', 'cs2EspPlayers', 'cs2Trigger'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: cs2SystemRequirements,
    featureGroups: proFeatureGroups,
    fullFeatures: [
      'Everything in Lite',
      'Legit aim with FOV + smoothing',
      'Per-weapon recoil assist',
      'Trigger delay + hitchance-style gates',
      'Separate ADS profiles',
      'Anti-team-fire safeguards',
      'Observer-safe presets',
      'Deathmatch tuning layout',
      'Cloud cfg sync',
      'Discord operator queue',
    ],
    overview: {
      title: 'Combat-ready CS2 workflow',
      paragraphs: [
        'Pro layers aim and trigger assists on top of the full Lite ESP stack for ranked and Faceit-style queues—still start soft and review demos weekly.',
        'Most operators settle here: enough automation to win duels without maxing every slider on day one.',
      ],
    },
  },
  elite: {
    images: slide('cs2Smoke', 'cs2Trigger', 'cs2Skin'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: cs2SystemRequirements,
    featureGroups: eliteFeatureGroups,
    fullFeatures: [
      'Everything in Pro',
      'Advanced radar stacking',
      'Misc movement assists',
      'Velocity and strafe helpers',
      'Elite-only preset packs',
      'Priority patch queue',
      'Direct support escalation',
      'LAN export bundle',
      'Cosmetic preview module',
      'Private slot control',
    ],
    overview: {
      title: 'Faceit-client stack',
      paragraphs: [
        'Elite targets the full Counter-Strike 2 module set when you need Faceit build notes, Cloud DMA add-ons from the store, and priority rebuilds after Valve maintenance.',
        'Limited slots keep turnaround predictable—check the banner before you commit; trim overlays before any Faceit queue.',
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
  'unlock-all': {
    images: slide('cs2Skin', 'cs2EspPlayers', 'cs2Bomb'),
    goodToKnow:
      'Preview is client-only—matchmaking spectators still see your real inventory. Included in Elite.',
    limitations:
      'Does not grant Steam Market ownership. Other players cannot see previewed skins in-server.',
    systemRequirements: cs2SystemRequirements,
    fullFeatures: [
      'Knife & glove preview',
      'Sticker layering',
      'Inspect animations locally',
      'Loadout favorites',
      'Thumbnail export',
      'FPS-safe toggles',
    ],
    overview: {
      title: 'Cosmetic preview workflow',
      paragraphs: [
        'Build thumbnails and offline showcases without buying every knife outright.',
        'Pair with stream-safe capture settings from the dedicated article.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName =
      cheat.name === 'Lite' ? 'CS2 Lite' : cheat.name === 'Pro' ? 'CS2 Pro' : 'CS2 Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      seoDescription: productPageSeoDescription[slug] ?? cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      featureGroups: content.featureGroups,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
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

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

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
  description: 'Counter-Strike 2 cheat tiers, HWID tools, and cosmetic utilities for Steam PC.',
  buyUrl: checkoutPath('cs2'),
};
