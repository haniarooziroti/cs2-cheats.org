/**
 * SEO / hero imagery hosted on Supabase (public bucket).
 * Used for hero carousel, product galleries, blog cards, and default OG image.
 */
const b =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/cs2/02ab714e-de37-423b-81f2-afd7f7fd8d28';

export const SEO_MEDIA = {
  sunnyMiddleEasternStreet: `${b}/1793971966703-u8rbwk-sunny-middle-eastern-street-showdown.webp`,
  mediterraneanVillageBanana: `${b}/1793971954046-jug2tj-mediterranean-village-fps-banana-alley.webp`,
  desertCorridorEsp: `${b}/1793971944136-tr4so9-desert-corridor-esp-sniper-showdown.webp`,
  underpassSmokeGraffiti: `${b}/1793971933439-jznrvi-underpass-smoke-and-graffiti-scene.webp`,
  tacticalSmokeOverpass: `${b}/1793971926480-jhzyj4-tactical-smoke-beneath-the-overpass.webp`,
  mediterraneanAlleyRifle: `${b}/1793971149985-f1nhvf-mediterranean-alley-rifle-clash.webp`,
  bananaAlleyBSite: `${b}/1793971141809-l4qff5-banana-alley-b-site-showdown.webp`,
  dustyCourtyardAk: `${b}/1793971127038-vn9yzh-dusty-courtyard-ak-47-firefight.webp`,
} as const;

const legacy =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/cs2/9d154404-559e-4ad2-ad9e-3bd2e29e7bf3';

export const SEO_MEDIA_LEGACY = {
  css11: `${legacy}/1793195779474-f1ppwg-css11.webp`,
  cs1: `${legacy}/1793195700649-594ig7-cs1.webp`,
} as const;

/** Default Open Graph / Twitter preview (absolute URL for meta tags). */
export const DEFAULT_OG_IMAGE_ABSOLUTE = SEO_MEDIA.desertCorridorEsp;
