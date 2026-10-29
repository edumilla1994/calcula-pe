import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: base /calcula-pe · Cloudflare Pages (raíz): BASE_PATH=/
const base = process.env.BASE_PATH ?? '/calcula-pe';
const site = process.env.SITE_URL ?? 'https://edumilla1994.github.io';

export default defineConfig({
  site,
  base,
  output: 'static',
  build: { assets: 'assets' },
  integrations: [sitemap()],
});
