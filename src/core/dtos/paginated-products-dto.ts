import type { ProductDto } from './product-dto'

export type PaginatedProductsDto = {
  items: ProductDto[]
  page: number
  pageCount: number
  pageSize: number
  total: number
}
