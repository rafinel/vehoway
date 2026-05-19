import type { SanityClient } from 'sanity'

import type { PaginatedProductsDto } from '@/core/dtos/paginated-products-dto'
import type { ProductFiltersDto } from '@/core/dtos/product-filters-dto'
import type { ProductDto } from '@/core/dtos/product-dto'
import type { ProductsCollection } from '@/core/interfaces/products-collection'

type CountRow = { total: number }

const PRODUCT_PROJECTION = `{
  "id": _id,
  name,
  code,
  "image": {
    "id": image.asset->_id,
    "url": image.asset->url,
    "alt": image.alt
  },
  description,
  "application": {
    "id": application->_id,
    "name": application->name
  },
  "categories": categories[]->{
    "id": _id,
    name,
    "image": {
      "id": image.asset->_id,
      "url": image.asset->url,
      "alt": image.alt
    }
  },
  "catalog": select(
    defined(catalog) => catalog->{
      "id": _id,
      name,
      "image": {
        "id": image.asset->_id,
        "url": image.asset->url,
        "alt": image.alt
      },
      "pdfFile": {
        "id": pdfFile.asset->_id,
        "url": pdfFile.asset->url
      }
    },
    null
  ),
  isFeatured,
  tags
}`

export const SanityProductsCollection = (sanity: SanityClient): ProductsCollection => {
  return {
    getAllProducts: async (): Promise<ProductDto[]> => {
      return await sanity.fetch<ProductDto[]>(`
        *[
          _type == "product" &&
          !(_id in path("drafts.**"))
        ] | order(isFeatured desc, name asc) ${PRODUCT_PROJECTION}
      `)
    },
    getProducts: async (filters: ProductFiltersDto): Promise<PaginatedProductsDto> => {
      const page = Math.max(1, filters.page || 1)
      const pageSize = Math.max(1, filters.pageSize || 6)
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const q = filters.q?.trim() ?? ''

      const queryFilter = `
        _type == "product" &&
        !(_id in path("drafts.**")) &&
        ($category == "" || $category in categories[]._ref) &&
        ($application == "" || application._ref == $application) &&
        ($catalog == "" || (defined(catalog) && catalog._ref == $catalog)) &&
        ($q == "" ||
          name match $qMatch ||
          code match $qMatch ||
          count(tags[@ match $qMatch]) > 0
        )
      `

      const params = {
        application: filters.application ?? '',
        catalog: filters.catalog ?? '',
        category: filters.category ?? '',
        q,
        qMatch: `${q}*`,
      }

      const [items, countRows] = await Promise.all([
        sanity.fetch<ProductDto[]>(
          `*[
            ${queryFilter}
          ] | order(isFeatured desc, name asc) [${start}...${end}] ${PRODUCT_PROJECTION}`,
          params,
        ),
        sanity.fetch<CountRow[]>(`[{"total": count(*[${queryFilter}])}]`, params),
      ])

      const total = countRows[0]?.total ?? 0
      const pageCount = Math.max(1, Math.ceil(total / pageSize))

      return {
        items,
        page,
        pageCount,
        pageSize,
        total,
      }
    },
  }
}
