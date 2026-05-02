import { defineAction } from 'astro:actions'
import { z } from 'zod'

import { sanityProductsCollection } from '@/cms/sanity/collections'

const searchProductsInputSchema = z.object({
  application: z.string().optional().default(''),
  catalog: z.string().optional().default(''),
  category: z.string().optional().default(''),
  page: z.number().int().min(1).default(1),
  q: z.string().optional().default(''),
})

export const server = {
  searchProducts: defineAction({
    accept: 'json',
    input: searchProductsInputSchema,
    handler: async (input) => {
      return await sanityProductsCollection.getProducts({
        application: input.application || undefined,
        catalog: input.catalog || undefined,
        category: input.category || undefined,
        page: input.page,
        pageSize: 6,
        q: input.q,
      })
    },
  }),
}
