import fs from 'node:fs';
import path from 'node:path';

/**
 * Astro output root: plain static build uses `dist/`; `@astrojs/cloudflare` (and some CI)
 * emits client assets under `dist/client/`. Post-build scripts must match.
 */
export function resolveDistRoot(cwd = process.cwd()) {
  const env = process.env.ASTRO_DIST_DIR?.trim();
  if (env) return path.resolve(cwd, env);

  const dist = path.join(cwd, 'dist');
  const distClient = path.join(dist, 'client');

  if (fs.existsSync(path.join(distClient, 'sitemap-0.xml'))) return distClient;
  if (fs.existsSync(path.join(dist, 'sitemap-0.xml'))) return dist;
  if (fs.existsSync(path.join(distClient, 'index.html'))) return distClient;
  if (fs.existsSync(path.join(dist, 'index.html'))) return dist;

  return dist;
}
