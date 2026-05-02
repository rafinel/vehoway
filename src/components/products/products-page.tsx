import { actions } from 'astro:actions'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react'

import type { ApplicationDto } from '@/core/dtos/application-dto'
import type { CatalogDto } from '@/core/dtos/catalog-dto'
import type { CategoryDto } from '@/core/dtos/category-dto'
import type { PaginatedProductsDto } from '@/core/dtos/paginated-products-dto'
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
}

const emptyPage: PaginatedProductsDto = {
  items: [],
  page: 1,
  pageCount: 1,
  pageSize: 6,
  total: 0,
}

function ProductsGridSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div className='vh-panel animate-pulse p-4' key={index}>
          <div className='mb-3 h-3 w-24 rounded bg-vh-border/80' />
          <div className='mb-4 h-5 w-3/4 rounded bg-vh-border/80' />
          <div className='mb-4 h-36 w-full rounded-2xl bg-vh-border/70' />
          <div className='space-y-2'>
            <div className='h-3 w-full rounded bg-vh-border/70' />
            <div className='h-3 w-5/6 rounded bg-vh-border/70' />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProductsFiltersSkeleton() {
  return (
    <div className='vh-panel animate-pulse p-5'>
      <div className='mb-5 h-5 w-24 rounded bg-vh-border/80' />
      <div className='space-y-4'>
        <div>
          <div className='mb-2 h-3 w-20 rounded bg-vh-border/70' />
          <div className='h-11 w-full rounded-xl bg-vh-border/70' />
        </div>
        <div>
          <div className='mb-2 h-3 w-24 rounded bg-vh-border/70' />
          <div className='h-11 w-full rounded-xl bg-vh-border/70' />
        </div>
        <div>
          <div className='mb-2 h-3 w-24 rounded bg-vh-border/70' />
          <div className='h-11 w-full rounded-xl bg-vh-border/70' />
        </div>
      </div>
      <div className='mt-5 h-10 w-full rounded-xl bg-vh-border/70' />
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className='vh-panel animate-pulse p-5'>
      <div className='mb-3 h-4 w-24 rounded bg-vh-border/80' />
      <div className='mb-4 h-6 w-4/5 rounded bg-vh-border/80' />
      <div className='mb-4 h-44 w-full rounded-2xl bg-vh-border/70' />
      <div className='space-y-2'>
        <div className='h-3 w-full rounded bg-vh-border/70' />
        <div className='h-3 w-11/12 rounded bg-vh-border/70' />
        <div className='h-3 w-10/12 rounded bg-vh-border/70' />
      </div>
      <div className='mt-5 space-y-2'>
        <div className='h-3 w-28 rounded bg-vh-border/70' />
        <div className='h-3 w-32 rounded bg-vh-border/70' />
        <div className='h-3 w-24 rounded bg-vh-border/70' />
      </div>
    </div>
  )
}

function ProductsPageInner({
  applications,
  catalogs,
  categories,
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

  const [data, setData] = useState<PaginatedProductsDto>(emptyPage)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const currentProductRef = useRef(query.product)

  useEffect(() => {
    currentProductRef.current = query.product
  }, [query.product])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const run = async () => {
        setIsLoading(true)
        setError(null)

        try {
          const result = await actions.searchProducts({
            application: filters.application,
            catalog: filters.catalog,
            category: filters.category,
            page: filters.page,
            q: filters.q,
          })

          if (result.error) {
            setError(result.error.message)
            setData(emptyPage)
            return
          }

          const nextData = (result.data as PaginatedProductsDto) ?? emptyPage
          setData(nextData)
          await reconcileSelectedProduct(nextData.items, currentProductRef.current)
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Falha ao carregar produtos.'
          setError(message)
          setData(emptyPage)
        } finally {
          setIsLoading(false)
        }
      }

      void run()
    }, 250)

    return () => clearTimeout(timeout)
  }, [
    filters.application,
    filters.catalog,
    filters.category,
    filters.page,
    filters.q,
    reconcileSelectedProduct,
  ])

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
        {isLoading ? (
          <ProductsFiltersSkeleton />
        ) : (
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
        )}

        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-black text-vh-copy'>Pecas em destaque</h2>
            <p className='text-sm font-semibold text-vh-muted'>{data.total} resultados</p>
          </div>

          {error ? (
            <div className='vh-panel p-6 text-sm font-semibold text-red-700'>{error}</div>
          ) : null}

          {isLoading ? (
            <ProductsGridSkeleton />
          ) : data.items.length === 0 ? (
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

        {isLoading ? <ProductDetailSkeleton /> : <ProductDetailPanel product={selectedProduct} />}
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
