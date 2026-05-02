import type { PaginatedProductsDto } from '@/core/dtos/paginated-products-dto'
import type { ProductFiltersDto } from '@/core/dtos/product-filters-dto'

export interface ProductsCollection {
  getProducts(filters: ProductFiltersDto): Promise<PaginatedProductsDto>
}
