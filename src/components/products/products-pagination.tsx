type ProductsPaginationProps = {
  onChangePage: (nextPage: number) => void
  page: number
  pageCount: number
}

export default function ProductsPagination({
  onChangePage,
  page,
  pageCount,
}: ProductsPaginationProps) {
  if (pageCount <= 1) {
    return null
  }

  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        className='rounded-lg border border-vh-border bg-white px-3 py-2 text-sm font-semibold text-vh-copy disabled:opacity-40'
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
        type='button'
      >
        Anterior
      </button>
      <span className='text-sm font-semibold text-vh-muted'>
        Pagina {page} de {pageCount}
      </span>
      <button
        className='rounded-lg border border-vh-border bg-white px-3 py-2 text-sm font-semibold text-vh-copy disabled:opacity-40'
        disabled={page >= pageCount}
        onClick={() => onChangePage(page + 1)}
        type='button'
      >
        Proxima
      </button>
    </div>
  )
}
