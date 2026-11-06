import type { FaqItem } from '../i18n/types';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';
import { DISCORD_URL } from '../config/site';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'cs2-cheats.org',
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'en-US',
    description:
      'Counter-Strike 2 cheat tiers with ESP, aim assist, and wallhack-style overlays—plus articles and forums about setup.',
  };
}

export function organizationSchema() {
  const envSameAs = getOrganizationSameAs();
  const fallback = DISCORD_URL ? [DISCORD_URL] : [];
  const sameAs = [...new Set([...envSameAs, ...fallback])];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'cs2-cheats.org',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/favicon-v2-32.png`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: canonicalUrl('/support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'cs2-cheats.org',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'cs2-cheats.org',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const href = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${href}`;
}

/** Real checkout offer only — omit unless a numeric price exists in product data. */
export interface ProductOfferInput {
  url: string;
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  availability?: string;
}

function toOfferNode(offer: ProductOfferInput) {
  return {
    '@type': 'Offer' as const,
    url: offerUrl(offer.url),
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    ...(offer.priceValidUntil ? { priceValidUntil: offer.priceValidUntil } : {}),
    ...(offer.availability ? { availability: offer.availability } : {}),
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  /** Product detail page path for Offer.url (canonical product URL). Checkout CTAs stay on /go/ in the UI. */
  offerPagePath?: string;
  image?: string;
  sku?: string;
  /** Present only when `src/data/productPricing.ts` (or similar) has a real price. */
  offers?: ProductOfferInput | ProductOfferInput[];
}) {
  const offerList = input.offers == null ? [] : Array.isArray(input.offers) ? input.offers : [input.offers];
  const offerPage = input.offerPagePath ?? input.url;
  const offers =
    offerList.length === 0
      ? undefined
      : offerList.length === 1
        ? toOfferNode({ ...offerList[0]!, url: offerPage })
        : offerList.map((o) => toOfferNode({ ...o, url: offerPage }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: 'cs2-cheats.org',
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    ...(offers ? { offers } : {}),
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offers?: ProductOfferInput | ProductOfferInput[];
}) {
  return productSchema(input);
}

export function articleSchema(input: {
  /** `<title>` / SEO title — kept in sync with the visible document title. */
  name: string;
  /** Primary on-page heading — used for JSON-LD `headline` when provided. */
  headline?: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  const headline = input.headline?.trim() || input.name;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: input.name,
    headline,
    description: input.description,
    url: canonicalUrl(input.url),
    image: absoluteAssetUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'cs2-cheats.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'cs2-cheats.org',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/favicon-v2-32.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url),
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}
