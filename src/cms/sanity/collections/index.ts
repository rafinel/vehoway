import { createClient } from '@sanity/client'

import { ENV } from '@/constants/env.ts'
import { SanityApplicationsCollection } from './sanity-applications-collection'
import { SanityCatalogsCollection } from './sanity-catalogs-collection'
import { SanityCategoriesCollection } from './sanity-categories-collection'
import { SanityProductsCollection } from './sanity-products-collection'

export const sanity = createClient({
  apiVersion: '2026-04-30',
  dataset: ENV.sanityDataset,
  projectId: ENV.sanityProjectId,
  useCdn: false,
})

export const sanityApplicationsCollection = SanityApplicationsCollection(sanity)
export const sanityCategoriesCollection = SanityCategoriesCollection(sanity)
export const sanityCatalogsCollection = SanityCatalogsCollection(sanity)
export const sanityProductsCollection = SanityProductsCollection(sanity)
