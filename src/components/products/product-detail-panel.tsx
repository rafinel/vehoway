import { buildWhatsAppUrl } from '@/utils/build-whatsapp-url'

import type { ProductDto } from '@/core/dtos/product-dto'

type ProductDetailPanelProps = {
  product?: ProductDto
}

export default function ProductDetailPanel({ product }: ProductDetailPanelProps) {
  if (!product) {
    return (
      <aside className='vh-panel hidden p-5 lg:block'>
        <p className='text-sm text-vh-muted'>
          Selecione um produto para ver os detalhes.
        </p>
      </aside>
    )
  }

  const whatsappUrl = buildWhatsAppUrl(
    `Ola, equipe Vehoway. Quero ajuda com a peca ${product.name} (${product.code}).`,
  )

  return (
    <aside className='vh-panel hidden h-fit flex-col gap-4 p-5 lg:flex'>
      <div>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-vh-muted'>
          Cod. {product.code}
        </p>
        <h3 className='mt-1 text-xl font-black text-vh-copy'>{product.name}</h3>
      </div>
      <img
        alt={product.image.alt}
        className='h-44 w-full rounded-lg object-cover'
        src={product.image.url}
      />
      <p className='text-sm leading-6 text-vh-muted'>{product.description}</p>

      <div className='flex flex-col gap-2'>
        <p className='text-xs font-bold uppercase tracking-[0.16em] text-vh-copy'>
          Categorias
        </p>
        <div className='flex flex-col gap-2'>
          {product.categories.map((category) => (
            <div className='flex items-center gap-2' key={category.id}>
              <span className='inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#E8F9EE] text-[11px] font-black text-[#22C55E]'>
                ✓
              </span>
              <span className='text-sm font-semibold text-[#4B5563]'>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {product.catalog ? (
        <a
          className='rounded-lg border border-vh-border bg-white px-4 py-2 text-sm font-bold text-vh-copy'
          href={product.catalog.pdfFile.url}
          rel='noreferrer'
          target='_blank'
        >
          Ver catalogo
        </a>
      ) : null}

      <a
        className='vh-button-primary'
        href={whatsappUrl}
        rel='noreferrer'
        target='_blank'
      >
        Falar no WhatsApp
      </a>
    </aside>
  )
}
