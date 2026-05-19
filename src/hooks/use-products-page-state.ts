import { useCallback, useMemo, useState } from 'react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import type { ProductDto } from '@/core/dtos/product-dto'

const queryConfig = {
  application: parseAsString.withDefault(''),
  catalog: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  product: parseAsString.withDefault(''),
  q: parseAsString.withDefault(''),
}

export const PRODUCTS_PAGE_SIZE = 6

export function useProductsPageState() {
  const [query, setQuery] = useQueryStates(queryConfig, {
    clearOnDefault: true,
    history: 'push',
    shallow: true,
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filters = useMemo(
    () => ({
      application: query.application,
      catalog: query.catalog,
      category: query.category,
      page: Math.max(1, query.page),
      q: query.q,
    }),
    [query.application, query.catalog, query.category, query.page, query.q],
  )

  const setSearch = useCallback(
    async (value: string) => {
      await setQuery({ page: 1, q: value })
    },
    [setQuery],
  )

  const setCategory = useCallback(
    async (value: string) => {
      await setQuery({ category: value, page: 1 })
    },
    [setQuery],
  )

  const setApplication = useCallback(
    async (value: string) => {
      await setQuery({ application: value, page: 1 })
    },
    [setQuery],
  )

  const setCatalog = useCallback(
    async (value: string) => {
      await setQuery({ catalog: value, page: 1 })
    },
    [setQuery],
  )

  const setPage = useCallback(
    async (value: number) => {
      await setQuery({ page: Math.max(1, value) })
    },
    [setQuery],
  )

  const setProduct = useCallback(
    async (value: string) => {
      await setQuery({ product: value })
    },
    [setQuery],
  )

  const clearFilters = useCallback(async () => {
    await setQuery({
      application: '',
      catalog: '',
      category: '',
      page: 1,
      q: '',
    })
  }, [setQuery])

  const clearProduct = useCallback(async () => {
    await setQuery({ product: '' })
  }, [setQuery])

  const reconcileSelectedProduct = useCallback(
    async (items: ProductDto[], currentProductId?: string) => {
      if (items.length === 0) {
        await clearProduct()
        return
      }

      const current = currentProductId ?? ''
      const hasCurrent = current ? items.some((item) => item.id === current) : false

      if (!hasCurrent) {
        await setProduct(items[0]?.id ?? '')
      }
    },
    [clearProduct, setProduct],
  )

  return {
    filters,
    isDrawerOpen,
    query,
    clearFilters,
    setApplication,
    setCatalog,
    setCategory,
    setDrawerOpen: setIsDrawerOpen,
    setPage,
    setProduct,
    setSearch,
    reconcileSelectedProduct,
  }
}
