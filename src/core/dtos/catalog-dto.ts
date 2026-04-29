import type { ImageDto } from './image-dto'
import type { PdfFileDto } from './pdf-file-dto'

export type CatalogDto = {
  id: string
  name: string
  image: ImageDto
  pdfFile: PdfFileDto
}
