// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Parametrizável para GitHub Pages:
 * - site de usuário: BASE_PATH=/ SITE_URL=https://usuario.github.io
 * - site de projeto: BASE_PATH=/nome-do-repositorio/ SITE_URL=https://usuario.github.io
 * SITE permanece aceito como alias legado.
 */
const site = process.env.SITE_URL ?? process.env.SITE ?? 'https://example.github.io';
const rawBase = process.env.BASE_PATH ?? '/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [react()],
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
