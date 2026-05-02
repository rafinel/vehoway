import type { ProductDto } from '@/core/dtos/product-dto'

import ProductCard from './product-card'

type ProductsGridProps = {
  onSelect: (productId: string) => void
  products: ProductDto[]
  selectedProductId: string
}

export default function ProductsGrid({
  onSelect,
  products,
  selectedProductId,
}: ProductsGridProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {products.map((product) => (
        <ProductCard
          isActive={selectedProductId === product.id}
          key={product.id}
          onSelect={onSelect}
          product={product}
        />
      ))}
    </div>
  )
}
