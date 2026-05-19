import type { PaginatedProductsDto } from '@/core/dtos/paginated-products-dto'
import type { ProductFiltersDto } from '@/core/dtos/product-filters-dto'
import type { ProductDto } from '@/core/dtos/product-dto'

export interface ProductsCollection {
  getAllProducts(): Promise<ProductDto[]>
  getProducts(filters: ProductFiltersDto): Promise<PaginatedProductsDto>
}
