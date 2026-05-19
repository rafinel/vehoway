import { useEffect, useMemo } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react'

import type { ApplicationDto } from '@/core/dtos/application-dto'
import type { CatalogDto } from '@/core/dtos/catalog-dto'
import type { CategoryDto } from '@/core/dtos/category-dto'
import type { PaginatedProductsDto } from '@/core/dtos/paginated-products-dto'
import type { ProductDto } from '@/core/dtos/product-dto'
import { useProductsPageState } from '@/hooks/use-products-page-state'

import ProductDetailPanel from './product-detail-panel'
import ProductDrawer from './product-drawer'
import ProductsFilters from './products-filters'
import ProductsGrid from './products-grid'
import ProductsPagination from './products-pagination'
import ProductsSearchBar from './products-search-bar'

type ProductsPageProps = {
  applications: ApplicationDto[]
  catalogs: CatalogDto[]
  categories: CategoryDto[]
  products: ProductDto[]
}

const PAGE_SIZE = 6

function ProductsPageInner({
  applications,
  catalogs,
  categories,
  products,
}: ProductsPageProps) {
  const {
    filters,
    isDrawerOpen,
    query,
    clearFilters,
    reconcileSelectedProduct,
    setApplication,
    setCatalog,
    setCategory,
    setDrawerOpen,
    setPage,
    setProduct,
    setSearch,
  } = useProductsPageState()

  const data = useMemo<PaginatedProductsDto>(() => {
    const search = filters.q.trim().toLowerCase()
    const filteredProducts = products.filter((product) => {
      const matchesCategory = filters.category
        ? product.categories.some((category) => category.id === filters.category)
        : true
      const matchesApplication = filters.application
        ? product.application.id === filters.application
        : true
      const matchesCatalog = filters.catalog
        ? product.catalog?.id === filters.catalog
        : true
      const matchesSearch = search
        ? [product.name, product.code, product.description, ...product.tags]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search))
        : true

      return matchesCategory && matchesApplication && matchesCatalog && matchesSearch
    })
    const total = filteredProducts.length
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
    const page = Math.min(Math.max(1, filters.page), pageCount)
    const start = (page - 1) * PAGE_SIZE

    return {
      items: filteredProducts.slice(start, start + PAGE_SIZE),
      page,
      pageCount,
      pageSize: PAGE_SIZE,
      total,
    }
  }, [
    filters.application,
    filters.catalog,
    filters.category,
    filters.page,
    filters.q,
    products,
  ])

  useEffect(() => {
    if (filters.page !== data.page) {
      void setPage(data.page)
    }
  }, [data.page, filters.page, setPage])

  useEffect(() => {
    void reconcileSelectedProduct(data.items, query.product)
  }, [data.items, query.product, reconcileSelectedProduct])

  const selectedProduct = useMemo(() => {
    return data.items.find((item) => item.id === query.product)
  }, [data.items, query.product])

  async function handleSelect(productId: string) {
    await setProduct(productId)

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setDrawerOpen(true)
    }
  }

  return (
    <section className='vh-shell px-5 py-10 md:px-8 lg:px-16'>
      <div className='mb-4'>
        <ProductsSearchBar
          onSearchChange={(value) => void setSearch(value)}
          value={query.q}
        />
      </div>

      <div className='grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_340px]'>
        <ProductsFilters
          applications={applications}
          catalogs={catalogs}
          categories={categories}
          onClearFilters={() => void clearFilters()}
          onApplicationChange={(value) => void setApplication(value)}
          onCatalogChange={(value) => void setCatalog(value)}
          onCategoryChange={(value) => void setCategory(value)}
          values={{
            application: query.application,
            catalog: query.catalog,
            category: query.category,
          }}
        />

        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-black text-vh-copy'>Pecas em destaque</h2>
            <p className='text-sm font-semibold text-vh-muted'>{data.total} resultados</p>
          </div>

          {data.items.length === 0 ? (
            <div className='vh-panel p-6 text-sm font-semibold text-vh-muted'>
              Nenhum produto encontrado para os filtros atuais.
            </div>
          ) : (
            <ProductsGrid
              onSelect={(productId) => void handleSelect(productId)}
              products={data.items}
              selectedProductId={query.product}
            />
          )}

          <ProductsPagination
            onChangePage={(nextPage) => void setPage(nextPage)}
            page={data.page}
            pageCount={data.pageCount}
          />
        </div>

        <ProductDetailPanel product={selectedProduct} />
      </div>

      <ProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />
    </section>
  )
}

export default function ProductsPage(props: ProductsPageProps) {
  return (
    <NuqsAdapter>
      <ProductsPageInner {...props} />
    </NuqsAdapter>
  )
}
