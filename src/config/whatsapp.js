/** WhatsApp: número, pie de página y solicitudes de productos */

export const WHATSAPP_NUMBER_DIGITS = '56996450950'

const PUBLIC_SITE_FROM_ENV = process.env.VUE_APP_PUBLIC_SITE_URL || ''
const WHATSAPP_FALLBACK_SITE_ORIGIN = 'https://egschmaestrosinfonico.netlify.app'

function digitsOnly() {
  return WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '')
}

function normalizeHttpsRoot(url) {
  const u = String(url || '')
    .trim()
    .replace(/\/+$/, '')
  if (!u) return ''
  return u.replace(/^http:\/\//i, 'https://')
}

/** Origen HTTPS público para adjuntar imagen del producto en el mensaje. */
function getShareBaseOrigin() {
  let origin = normalizeHttpsRoot(PUBLIC_SITE_FROM_ENV)
  if (!origin) origin = normalizeHttpsRoot(WHATSAPP_FALLBACK_SITE_ORIGIN)
  if (origin) return origin

  if (typeof window !== 'undefined' && window.location?.origin) {
    const o = window.location.origin.replace(/\/+$/, '')
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return ''
    return normalizeHttpsRoot(o)
  }

  return ''
}

function resolveProductImageUrl(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const base = getShareBaseOrigin()
  if (!base) return ''
  return `${base}${path}`
}

function priceForWhatsAppMessage(price) {
  if (!price || typeof price !== 'string') return ''
  return price.trim().replace(/\$/g, '').replace(/\s+/g, ' ').trim()
}

/** CTA Contáctanos del footer: solo texto, sin enlace. */
export function getWhatsAppFooterUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'

  const text =
    'Hola Eduardo, estoy escribiendo desde tu página web y quisiera conversar contigo sobre un tema en particular. Estás disponible?'

  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

/**
 * WhatsApp para una opción de producto (partitura / formato).
 * @param {{
 *   productId?: string,
 *   title?: string,
 *   subtitle?: string,
 *   image?: string,
 *   opcion?: { id?: string, nombre?: string, descripcion?: string, price?: string }
 * }} payload
 */
export function getWhatsAppProductOptionUrl(payload) {
  const digits = digitsOnly()
  if (!digits) return '#'

  const title = typeof payload?.title === 'string' ? payload.title.trim() : ''
  const subtitle = typeof payload?.subtitle === 'string' ? payload.subtitle.trim() : ''
  const opcion = payload?.opcion && typeof payload.opcion === 'object' ? payload.opcion : {}
  const opcionNombre = typeof opcion.nombre === 'string' ? opcion.nombre.trim() : ''
  const price = typeof opcion.price === 'string' ? opcion.price.trim() : ''
  const previewUrl = resolveProductImageUrl(payload?.image || '')

  const parts = ['Hola, quiero solicitar:']
  if (title) parts.push(title)
  if (subtitle) parts.push(subtitle)
  if (opcionNombre) parts.push(`Opción: ${opcionNombre}`)
  parts.push('')

  if (previewUrl && /^https:\/\//i.test(previewUrl)) {
    parts.push(previewUrl)
    parts.push('')
  }

  const priceTxt = priceForWhatsAppMessage(price)
  if (priceTxt) {
    parts.push(`Precio (CLP): ${priceTxt}`)
  }

  const text = parts.join('\n').trimEnd()
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

export function isWhatsAppConfigured() {
  return digitsOnly().length > 0
}
