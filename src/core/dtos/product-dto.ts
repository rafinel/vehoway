import type { CatalogDto } from './catalog-dto'
import type { ApplicationDto } from './application-dto'
import type { CategoryDto } from './category-dto'
import type { ImageDto } from './image-dto'

export type ProductDto = {
  id: string
  name: string
  code: string
  image: ImageDto
  description: string
  application: ApplicationDto
  categories: CategoryDto[]
  catalog?: CatalogDto
  isFeatured: boolean
  tags: string[]
}
