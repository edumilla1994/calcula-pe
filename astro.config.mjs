import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://edumilla1994.github.io',
  base: '/calcula-pe',
  output: 'static',
  integrations: [sitemap()],
});
