// @ts-check
import 'dotenv/config'

import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import sanity from '@sanity/astro'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    sanity({
      apiVersion: 'v2023-08-24',
      dataset: process.env.SANITY_DATASET,
      projectId: process.env.SANITY_PROJECT_ID,
      studioBasePath: '/admin',
      studioRouterHistory: 'hash',
      useCdn: false,
    }),
    react(),
  ],
  vite: {
    define: {
      __SANITY_DATASET__: JSON.stringify(process.env.SANITY_DATASET ?? ''),
      __SANITY_PROJECT_ID__: JSON.stringify(process.env.SANITY_PROJECT_ID ?? ''),
    },
    plugins: [tailwindcss()],
  },
})
