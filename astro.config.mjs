import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

/** Must match PUBLIC_SITE_ORIGIN used at build time (see .env.example). */
const site =
  (process.env.PUBLIC_SITE_ORIGIN && String(process.env.PUBLIC_SITE_ORIGIN).trim().replace(/\/$/, '')) ||
  'https://cs2-cheats.org';

export default defineConfig({
  site,
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/cs2-cheats/',
    '/cheats/lite/': '/products/cs2-cheats/',
    '/cheats/pro/': '/products/cs2-cheats/',
    '/cheats/elite/': '/products/cs2-cheats/elite/',
    '/products/dota-2-cheats/': '/products/cs2-cheats/',
    '/products/dota-2-cheats/utilities/': '/products/cs2-cheats/utilities/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
