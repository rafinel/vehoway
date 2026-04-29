import type { CategoryDto } from '../dtos/category-dto'

export interface CategoriesCollection {
  getCategories(): Promise<CategoryDto[]>
}
