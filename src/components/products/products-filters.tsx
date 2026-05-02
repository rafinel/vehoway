type Option = {
  id: string
  name: string
}

type ProductsFiltersProps = {
  applications: Option[]
  catalogs: Option[]
  categories: Option[]
  onClearFilters: () => void
  onApplicationChange: (value: string) => void
  onCatalogChange: (value: string) => void
  onCategoryChange: (value: string) => void
  values: {
    application: string
    catalog: string
    category: string
  }
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange: (value: string) => void
  options: Option[]
  value: string
}) {
  return (
    <label className='flex flex-col gap-2'>
      <span className='text-xs font-bold uppercase tracking-[0.16em] text-vh-muted'>
        {label}
      </span>
      <select
        className='rounded-lg border border-vh-border bg-white px-3 py-2 text-sm text-vh-copy'
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value=''>Todos</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function ProductsFilters({
  applications,
  catalogs,
  categories,
  onClearFilters,
  onApplicationChange,
  onCatalogChange,
  onCategoryChange,
  values,
}: ProductsFiltersProps) {
  return (
    <aside className='vh-panel flex h-fit flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-black text-vh-copy'>Filtros</h3>
        <button
          className='text-xs font-bold uppercase tracking-[0.14em] text-vh-brown transition hover:text-vh-copy'
          onClick={onClearFilters}
          type='button'
        >
          Limpar filtros
        </button>
      </div>

      <FilterSelect
        label='Categoria'
        onChange={onCategoryChange}
        options={categories}
        value={values.category}
      />
      <FilterSelect
        label='Aplicacao'
        onChange={onApplicationChange}
        options={applications}
        value={values.application}
      />
      <FilterSelect
        label='Catalogo'
        onChange={onCatalogChange}
        options={catalogs}
        value={values.catalog}
      />
    </aside>
  )
}
