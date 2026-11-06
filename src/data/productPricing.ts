export type ProductPlanId = 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
  /** ISO date (YYYY-MM-DD), end of calendar day UTC — for Schema.org Offer.priceValidUntil. */
  priceValidUntil: string;
  /** Schema.org availability URL — e.g. https://schema.org/InStock */
  availabilityUrl: string;
}

const standardPlans: ProductPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    priceUsd: 35,
    priceNote: 'USD / month',
    priceValidUntil: '2030-12-31',
    availabilityUrl: 'https://schema.org/InStock',
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: 150,
    priceNote: 'USD · one-time',
    priceValidUntil: '2030-12-31',
    availabilityUrl: 'https://schema.org/InStock',
  },
];

const ugcPlans: ProductPlan[] = [
  {
    id: 'onetime',
    label: 'One-time access',
    priceUsd: 50,
    priceNote: 'USD · one-time',
    priceValidUntil: '2030-12-31',
    availabilityUrl: 'https://schema.org/InStock',
  },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'ugc') return ugcPlans;
  return standardPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
