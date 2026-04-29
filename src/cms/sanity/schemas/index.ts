import { applicationSchema } from './application-schema'
import { catalogSchema } from './catalog-schema'
import { categorySchema } from './category-schema'
import { imageSchema } from './image-schema'
import { pdfFileSchema } from './pdf-file-schema'
import { productSchema } from './product-schema'

export const sanitySchemas = [
  applicationSchema,
  categorySchema,
  productSchema,
  catalogSchema,
  imageSchema,
  pdfFileSchema,
]
