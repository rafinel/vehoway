export type ProductFiltersDto = {
  q: string
  category?: string
  application?: string
  catalog?: string
  page: number
  pageSize: number
}
