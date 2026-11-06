/** Production origin for sitemap, RSS, canonicals, and post-build checks. */
export const SITE_DOMAIN = 'cs2-cheats.org';
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

/** Brand / host spellings that must never appear in dist/ or as SITE_DOMAIN. */
export const WRONG_DOMAIN_VARIANTS = [
  'cs2-cheats.com',
  'cs2cheats.org',
  'cs2cheats.com',
  'cs2-cheat.org',
  'cs2-cheat.com',
];

/**
 * Default origin is always https://cs2-cheats.org.
 * PUBLIC_SITE_ORIGIN containing workers.dev is a misconfig — fail closed.
 */
export function resolveSiteOrigin(env = process.env) {
  const raw = env.PUBLIC_SITE_ORIGIN?.trim();
  if (raw && raw.includes('workers.dev')) {
    throw new Error(
      'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use https://cs2-cheats.org for production origin.',
    );
  }
  return SITE_ORIGIN;
}

export function assertSiteOrigin(env = process.env) {
  resolveSiteOrigin(env);
}
