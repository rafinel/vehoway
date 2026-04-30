import type { SanityClient } from 'sanity'
import type { CatalogDto } from '@/core/dtos/catalog-dto'
import type { CatalogsCollection } from '@/core/interfaces/catalogs-collection'

export const SanityCatalogsCollection = (
  sanity: SanityClient,
): CatalogsCollection => {
  return {
    getCatalogs: async () => {
      return await sanity.fetch<CatalogDto[]>(`
        *[_type == "catalog" && !(_id in path("drafts.**"))] | order(name asc) {
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
        }
      `)
    },
  }
}
