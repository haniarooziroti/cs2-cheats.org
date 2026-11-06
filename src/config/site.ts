const envOrigin = (import.meta.env.PUBLIC_SITE_ORIGIN as string | undefined)?.trim();
if (envOrigin && envOrigin.includes('workers.dev')) {
  throw new Error(
    'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use https://cs2-cheats.org for production origin.',
  );
}

export const SITE_DOMAIN = 'cs2-cheats.org';
export const SITE_URL = 'https://cs2-cheats.org';
export const PRODUCT_BASE = '/products/cs2-cheats/';
export const TITLE_PREFIX = '[CS2] Cheats';

/** Public community invite (external). Single source of truth for UI + FAQ copy—not an affiliate link. */
export const DISCORD_URL = 'https://discord.com/invite/Vu85F8auQS';
