import type { CatalogDto } from '@/core/dtos/catalog-dto'

export interface CatalogsCollection {
  getCatalogs(): Promise<CatalogDto[]>
}
