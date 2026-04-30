import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { sanitySchemas } from './src/cms/sanity/schemas'

declare const __SANITY_DATASET__: string
declare const __SANITY_PROJECT_ID__: string

export default defineConfig({
  name: 'default',
  title: 'Vehoway Admin',
  projectId: __SANITY_PROJECT_ID__,
  dataset: __SANITY_DATASET__,
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: sanitySchemas,
  },
})
