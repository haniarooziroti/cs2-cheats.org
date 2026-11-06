export interface SiteConfig {
  name: string;
  domain: string;
  title: string;
  description: string;
  discord: string;
  /** Short alt for favicon / mark in header and footer */
  brandMarkAlt: string;
}

export interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
  /** When the target section exists on the current page, scroll instead of navigating. */
  scrollTarget?: string;
}

export interface FeatureItem {
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  bullets?: string[];
  /** Tailwind classes: sm:col-span-2 stack; lg: explicit col/row start + span */
  bento?: string;
}

export interface TierCard {
  /** Secondary status pill (e.g. Intel / Faceit note) */
  badge: string;
  /** Primary tier label (shown in first pill with tier icon) */
  tier: string;
  /** Maps to cheatTierIcons (Lite | Pro | Elite) */
  name: string;
  title: string;
  desc: string;
  features: string[];
  more: number;
  href: string;
  variant: 'essential' | 'popular' | 'limited';
  /** Optional extra outline pills after badge + variant chips */
  extraBadges?: string[];
}

export interface ProductCard {
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  href: string;
}

export interface BlogPost {
  tag: string;
  title: string;
  slug: string;
  image: string;
  desc: string;
  /** 120–155 chars for `<meta name="description">`; defaults to `desc` if omitted */
  seoDescription?: string;
  /** Shorter line for share dialogs (optional) */
  shareTitle?: string;
  date: string;
  readTime: string;
  /** Complete 50–60 character `<title>` when the post title plus brand would truncate. */
  seoTitle?: string;
}

export interface FaqItem {
  num: string;
  q: string;
  a: string;
}

export interface StepItem {
  step: string;
  title: string;
  desc: string;
}

export interface ToolkitItem {
  num: string;
  label: string;
  title: string;
  desc: string;
}

export interface WorkflowItem {
  num: string;
  phase: string;
  title: string;
  desc: string;
}

export interface WhyCompareRow {
  title: string;
  desc: string;
}

export interface WhyMetric {
  value: string;
  title: string;
  desc: string;
}

export interface Translations {
  site: SiteConfig;
  nav: NavLink[];
  hero: {
    status: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaDiscord: string;
    modesLabel: string;
    modes: string[];
    metrics: { label: string; strong: string }[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    usLabel: string;
    otherLabel: string;
    rows: WhyCompareRow[];
    metrics: WhyMetric[];
  };
  setup: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaPrimaryHref: string;
    ctaSecondaryHref: string;
    steps: StepItem[];
  };
  compatibility: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  cheats: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    explore: string;
    items: TierCard[];
  };
  products: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    get: string;
    explore: string;
    items: ProductCard[];
  };
  blog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    latestTitle: string;
    latestSubtitle: string;
    filterAll: string;
    sortLabel: string;
    sortNewest: string;
    sortOldest: string;
    sortShortRead: string;
    sortLongRead: string;
    emptyFilter: string;
    viewAll: string;
    read: string;
    items: BlogPost[];
  };
  toolkit: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ToolkitItem[];
  };
  workflow: {
    eyebrow: string;
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter?: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    items: WorkflowItem[];
  };
  fieldNotes: {
    eyebrow: string;
    title: string;
    items: { num: string; title: string; desc: string }[];
  };
  support: {
    eyebrow: string;
    title: string;
    subtitle: string;
    channels: {
      icon: string;
      title: string;
      desc: string;
      linkLabel: string;
      href: string;
    }[];
    ticketTitle: string;
    ticketItems: { title: string; desc: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  footer: {
    tagline: string;
    explore: string;
    exploreLinks: NavLink[];
    support: string;
    legal: string;
    privacy: string;
    terms: string;
    about: string;
  };
  legalPages: {
    about: {
      title: string;
      description: string;
      sections: { heading: string; paragraphs: string[] }[];
    };
    privacy: {
      title: string;
      description: string;
      sections: { heading: string; paragraphs: string[] }[];
    };
    terms: {
      title: string;
      description: string;
      sections: { heading: string; paragraphs: string[] }[];
    };
    support: {
      title: string;
      description: string;
    };
  };
  ui: {
    skipLink: string;
    browseCheats: string;
    browseCheatsMobile: string;
    homeAria: string;
    checkoutAria: string;
    discordAria: string;
    menuOpen: string;
    menuClose: string;
    themeLight: string;
    themeDark: string;
  };
}
