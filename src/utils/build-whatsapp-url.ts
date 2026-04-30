import { CONTACT } from '@/constants/contact'

export function buildWhatsAppUrl(
  message: string,
  whatsappNumber: string = CONTACT.whatsappNumber,
) {
  const normalizedMessage = encodeURIComponent(message.trim())

  return `https://wa.me/${whatsappNumber}?text=${normalizedMessage}`
}
