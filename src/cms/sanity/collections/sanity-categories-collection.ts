import type { SanityClient } from 'sanity'
import type { CategoryDto } from '@/core/dtos/category-dto'
import type { CategoriesCollection } from '@/core/interfaces/categories-collection'

export const SanityCategoriesCollection = (
  sanity: SanityClient,
): CategoriesCollection => {
  return {
    getCategories: async () => {
      return await sanity.fetch<CategoryDto[]>(`
        *[_type == "category" && !(_id in path("drafts.**"))] | order(name asc) {
        "id": _id,
        name,
        "image": {
          "id": image.asset->_id,
          "url": image.asset->url,
          "alt": image.alt
        }
      }`)
    },
  }
}
