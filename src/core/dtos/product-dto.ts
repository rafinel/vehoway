import type { ApplicationDto } from './application-dto'
import type { ImageDto } from './image-dto'

export type ProductDTO = {
  id: string
  name: string
  code: string
  image: ImageDto
  description: string
  applications: ApplicationDto[]
  inStock: boolean
  isFeatured: boolean
  tags: string[]
}
