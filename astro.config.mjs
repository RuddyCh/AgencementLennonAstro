import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap'; // Temporairement désactivé — bug @astrojs/sitemap avec Astro 4.15

export default defineConfig({
  site: 'https://www.agencementlennon.fr',
  integrations: [
    tailwind(),
    // sitemap(), // À réactiver après mise à jour : npm update @astrojs/sitemap
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // AVIF en priorité (−20 à 30% vs WebP à qualité égale), WebP en fallback
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
