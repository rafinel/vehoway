import { buildWhatsAppUrl } from '@/utils/build-whatsapp-url'

import type { ProductDto } from '@/core/dtos/product-dto'

type ProductDrawerProps = {
  isOpen: boolean
  onClose: () => void
  product?: ProductDto
}

export default function ProductDrawer({ isOpen, onClose, product }: ProductDrawerProps) {
  if (!isOpen || !product) {
    return null
  }

  const whatsappUrl = buildWhatsAppUrl(
    `Ola, equipe Vehoway. Quero ajuda com a peca ${product.name} (${product.code}).`,
  )

  return (
    <div className='fixed inset-0 z-40 bg-black/40 p-4 lg:hidden'>
      <div className='mx-auto mt-16 max-w-xl rounded-xl bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.25)]'>
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-lg font-black text-vh-copy'>{product.name}</h3>
          <button
            className='text-sm font-bold text-vh-muted'
            onClick={onClose}
            type='button'
          >
            Fechar
          </button>
        </div>

        <img
          alt={product.image.alt}
          className='h-44 w-full rounded-lg object-cover'
          src={product.image.url}
        />
        <p className='mt-3 text-sm text-vh-muted'>Cod. {product.code}</p>
        <p className='mt-2 text-sm leading-6 text-vh-muted'>{product.description}</p>

        <div className='mt-3 flex flex-col gap-2'>
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

        <div className='mt-4 flex flex-col gap-2'>
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
            className='vh-button-primary justify-center'
            href={whatsappUrl}
            rel='noreferrer'
            target='_blank'
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
