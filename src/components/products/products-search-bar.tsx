type ProductsSearchBarProps = {
  onSearchChange: (value: string) => void
  value: string
}

export default function ProductsSearchBar({
  onSearchChange,
  value,
}: ProductsSearchBarProps) {
  return (
    <label className='flex w-full items-center gap-3 rounded-xl border border-vh-border bg-white px-4 py-3'>
      <span className='text-sm text-vh-muted'>Buscar</span>
      <input
        className='w-full bg-transparent text-sm text-vh-copy outline-none'
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder='Buscar por nome, codigo ou tags'
        value={value}
      />
    </label>
  )
}
