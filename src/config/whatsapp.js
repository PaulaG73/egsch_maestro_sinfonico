/** Solo dígitos: código de país + número (sin + ni espacios). Ej. Chile: 56912345678 */
export const WHATSAPP_NUMBER_DIGITS = '56996450950'

/**
 * URL pública del sitio (.env.development / .env.production).
 * Referencia literal a `process.env.VUE_APP_PUBLIC_SITE_URL` para que @vue/cli-service la sustituya.
 */
const PUBLIC_SITE_FROM_ENV = process.env.VUE_APP_PUBLIC_SITE_URL || ''

/**
 * Si el .env no llega al bundle en dev, el enlace a la foto no puede quedar vacío.
 * Cambia esto si despliegas en otro dominio (o define siempre VUE_APP_PUBLIC_SITE_URL).
 */
const WHATSAPP_FALLBACK_SITE_ORIGIN = 'https://egschmaestrosinfonico.netlify.app'

function publicSiteUrlFromEnv() {
  return PUBLIC_SITE_FROM_ENV
}

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

/**
 * Origen público para enlaces en WhatsApp: env, luego fallback fijo, luego origin (no localhost).
 */
function getShareBaseOrigin() {
  let origin = normalizeHttpsRoot(publicSiteUrlFromEnv())
  if (!origin) origin = normalizeHttpsRoot(WHATSAPP_FALLBACK_SITE_ORIGIN)
  if (origin) return origin

  if (typeof window !== 'undefined' && window.location?.origin) {
    const o = window.location.origin.replace(/\/+$/, '')
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return ''
    return normalizeHttpsRoot(o)
  }

  return ''
}

const OG_PAGE_SUFFIX = '.html'

/**
 * Nombre de archivo en `public/`: `og-{id en minúsculas}.html`
 * (si no existe página OG, se usa la imagen del producto).
 */
function packOgPagePath(packId) {
  const id = typeof packId === 'string' ? packId.trim() : ''
  if (!id) return ''
  return `og-${id.toLowerCase()}${OG_PAGE_SUFFIX}`
}

/** Slug de página OG por id de pack (vacío mientras no se definan páginas OG nuevas). */
const OG_SLUG_BY_PACK_ID = {}

function ogSlugFromPackId(packId) {
  const id = typeof packId === 'string' ? packId.trim().toLowerCase() : ''
  if (!id) return ''
  return OG_SLUG_BY_PACK_ID[id] || ''
}

/**
 * URL para vista previa en WhatsApp: HTML con og:image (no el .jpg directo).
 */
function resolvePackPreviewUrlForWhatsApp(packId, imagePath) {
  const base = getShareBaseOrigin()
  if (!base) return resolvePackImageUrlForWhatsApp(imagePath)
  const slug = ogSlugFromPackId(packId)
  if (slug) {
    const page = packOgPagePath(slug)
    return `${base}/${page}`
  }
  return resolvePackImageUrlForWhatsApp(imagePath)
}

/**
 * URL absoluta de un asset en `public/` para compartir por WhatsApp (solo HTTPS y dominio público).
 */
function resolvePackImageUrlForWhatsApp(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const base = getShareBaseOrigin()
  if (!base) return ''
  return `${base}${path}`
}

/** Precio sin símbolo $ (en WhatsApp el $ puede truncar el resto del mensaje prefijado). */
function priceForWhatsAppMessage(price) {
  if (!price || typeof price !== 'string') return ''
  return price.trim().replace(/\$/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * URL absoluta HTTPS de un asset en `public/` (p. ej. `/img/pack.jpg`).
 * En el navegador usa `location.origin`; sin `window` usa env.
 */
export function resolvePublicAssetUrl(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`
  }

  const site = normalizeHttpsRoot(PUBLIC_SITE_FROM_ENV)
  if (site) return `${site}${path}`

  return path
}

export function getWhatsAppUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'
  return `https://wa.me/${digits}`
}

/**
 * WhatsApp desde el pie (CTA Contáctanos).
 * El enlace de vista previa debe ser compartir.html (sin redirect) para que
 * WhatsApp lea og:image correctamente.
 */
export function getWhatsAppFooterUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'

  const text =
    'Hola Eduardo, estoy escribiendo desde tu página web y quisiera conversar contigo sobre un tema en particular. Estás disponible?'

  /* URL fija del sitio publicado — evita depender del build local */
  const shareUrl = 'https://egschmaestrosinfonico.netlify.app/compartir.html'

  const message = `${text}\n\n${shareUrl}`
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(message)}`
}

/**
 * Enlace WhatsApp para una opción de producto (partitura / formato).
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
  const previewUrl = resolvePackPreviewUrlForWhatsApp(payload?.productId, payload?.image || '')

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

/** @deprecated Prefer getWhatsAppProductOptionUrl */
export function getWhatsAppPackUrl(pack) {
  return getWhatsAppProductOptionUrl({
    productId: pack?.packId,
    title: pack?.title,
    subtitle: pack?.valle,
    image: pack?.image,
    opcion: {
      nombre: pack?.title,
      price: pack?.price,
    },
  })
}

export function isWhatsAppConfigured() {
  return digitsOnly().length > 0
}
