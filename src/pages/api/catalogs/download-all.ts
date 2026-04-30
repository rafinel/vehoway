import type { APIRoute } from 'astro'
import JSZip from 'jszip'

import { sanityCatalogsCollection } from '@/cms/sanity/collections'

export const prerender = false

function sanitizeFileName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

export const GET: APIRoute = async () => {
  const catalogs = await sanityCatalogsCollection.getCatalogs().catch(() => [])

  if (catalogs.length === 0) {
    return new Response('Nenhum catalogo disponivel para download.', {
      status: 404,
    })
  }

  const zip = new JSZip()

  await Promise.all(
    catalogs.map(async (catalog, index) => {
      const response = await fetch(catalog.pdfFile.url)

      if (!response.ok) {
        throw new Error(`Falha ao baixar PDF do catalogo ${catalog.id}.`)
      }

      const fileBuffer = await response.arrayBuffer()
      const safeName = sanitizeFileName(catalog.name) || `catalogo-${index + 1}`

      zip.file(`${safeName}.pdf`, fileBuffer)
    }),
  )

  const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })

  return new Response(zipBuffer, {
    headers: {
      'Content-Disposition': 'attachment; filename="catalogos-vehoway.zip"',
      'Content-Type': 'application/zip',
      'Cache-Control': 'no-store',
    },
  })
}
