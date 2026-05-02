import { z } from 'zod'

const envSchema = z.object({
  SANITY_DATASET: z.string().min(1),
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1).optional(),
})

const env = envSchema.parse({
  SANITY_API_TOKEN: import.meta.env.SANITY_API_TOKEN ?? process.env.SANITY_API_TOKEN,
  SANITY_DATASET: import.meta.env.SANITY_DATASET ?? process.env.SANITY_DATASET,
  SANITY_PROJECT_ID: import.meta.env.SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID,
})

export const ENV = {
  sanityApiToken: env.SANITY_API_TOKEN,
  sanityDataset: env.SANITY_DATASET,
  sanityProjectId: env.SANITY_PROJECT_ID,
} as const
