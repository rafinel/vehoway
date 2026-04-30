import { applicationSchema } from './application-schema'
import { catalogSchema } from './catalog-schema'
import { categorySchema } from './category-schema'
import { productSchema } from './product-schema'

export const sanitySchemas = [
  applicationSchema,
  categorySchema,
  productSchema,
  catalogSchema,
]
