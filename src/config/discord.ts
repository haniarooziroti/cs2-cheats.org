/** Permanent Discord invite — set `PUBLIC_DISCORD_INVITE` in `.env` (see `.env.example`). */
export const DISCORD_INVITE_URL = (import.meta.env.PUBLIC_DISCORD_INVITE as string | undefined)?.trim() || '';
