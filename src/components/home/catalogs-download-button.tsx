import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import JSZip from 'jszip'
import { useState } from 'react'

type CatalogDownload = {
  name: string
  pdfUrl?: string
}

type CatalogsDownloadButtonProps = {
  catalogs: CatalogDownload[]
}

function sanitizeFileName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

export default function CatalogsDownloadButton({
  catalogs,
}: CatalogsDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDownload() {
    const downloadableCatalogs = catalogs.filter((catalog) => catalog.pdfUrl)

    if (downloadableCatalogs.length === 0) {
      setError('Nenhum catalogo disponivel para download.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const zip = new JSZip()

      await Promise.all(
        downloadableCatalogs.map(async (catalog, index) => {
          const response = await fetch(catalog.pdfUrl as string)

          if (!response.ok) {
            throw new Error(`Falha ao baixar PDF do catalogo ${catalog.name}.`)
          }

          const fileBuffer = await response.arrayBuffer()
          const safeName = sanitizeFileName(catalog.name) || `catalogo-${index + 1}`

          zip.file(`${safeName}.pdf`, fileBuffer)
        }),
      )

      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')

      anchor.href = url
      anchor.download = 'catalogos-vehoway.zip'
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao baixar catalogos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        className='vh-button-secondary'
        disabled={isLoading}
        onClick={() => void handleDownload()}
        type='button'
      >
        {isLoading ? 'Preparando...' : 'Baixar materiais'}
        <HugeiconsIcon
          className='h-[18px] w-[18px]'
          icon={ArrowUpRight01Icon}
          strokeWidth={2.2}
        />
      </button>
      {error ? <p className='mt-2 text-sm font-semibold text-red-200'>{error}</p> : null}
    </div>
  )
}
