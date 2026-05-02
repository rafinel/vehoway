import type { ProductDto } from '@/core/dtos/product-dto'

type ProductCardProps = {
  isActive: boolean
  onSelect: (productId: string) => void
  product: ProductDto
}

export default function ProductCard({ isActive, onSelect, product }: ProductCardProps) {
  return (
    <button
      className={[
        'vh-panel flex h-full flex-col overflow-hidden text-left transition hover:-translate-y-0.5',
        isActive ? 'border-[#e6d39a]' : '',
      ].join(' ')}
      onClick={() => onSelect(product.id)}
      type='button'
    >
      <img
        alt={product.image.alt}
        className='h-52 w-full object-cover'
        loading='lazy'
        src={product.image.url}
      />
      <div className='flex flex-1 flex-col gap-3 p-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-vh-muted'>
            Cod. {product.code}
          </p>
          <h3 className='mt-1 text-base font-extrabold text-vh-copy'>{product.name}</h3>
        </div>
        <p className='line-clamp-3 text-sm text-vh-muted'>{product.description}</p>
        <div className='mt-auto flex w-full flex-col gap-1.5'>
          <p className='text-[11px] font-black text-vh-ink'>Categorias</p>
          <div className='flex flex-wrap items-center gap-1.5'>
            {product.categories.slice(0, 2).map((category) => (
              <span
                className='rounded-full border border-vh-border bg-vh-paper px-2 py-1 text-[10px] font-extrabold text-vh-muted'
                key={category.id}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}
