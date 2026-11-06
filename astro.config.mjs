import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

/** Production origin only — previews use Workers host but must not affect sitemap/SEO output. */
const site = 'https://cs2-cheats.org';

export default defineConfig({
  site,
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/cs2-cheats/',
    '/cheats/lite/': '/products/cs2-cheats/cs2-store/',
    '/cheats/pro/': '/products/cs2-cheats/cs2-store/',
    '/cheats/elite/': '/products/cs2-cheats/cs2-store/',
    '/products/cs2-cheats/lite/': '/products/cs2-cheats/cs2-store/',
    '/products/cs2-cheats/pro/': '/products/cs2-cheats/cs2-store/',
    '/products/cs2-cheats/elite/': '/products/cs2-cheats/cs2-store/',
    '/products/cs2-cheats/unlock-all/': '/products/cs2-cheats/cloud-dma/',
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
