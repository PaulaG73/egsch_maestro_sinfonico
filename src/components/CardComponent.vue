<template>
  <div
    class="card card-pack h-100 d-flex flex-column shadow-sm"
    :class="[
      agotado ? 'card-pack--agotado border-secondary' : 'border-success',
      { 'card-pack--compact': compact },
    ]"
  >
    <div class="card-img-wrap card-img-wrap--pack flex-shrink-0">
      <span v-if="agotado" class="card-pack-img-badge card-pack-agotado-badge">Agotado</span>
      <img
        :src="image"
        class="card-img-top"
        :class="{ 'card-pack-img--agotado': agotado }"
        :style="imagePositionStyle"
        :alt="`${title}${subtitle ? `. ${subtitle}` : ''}${agotado ? ' (agotado)' : ''}`"
        loading="lazy"
      >
    </div>

    <div class="card-body card-pack-body d-flex flex-column flex-grow-1">
      <div class="card-heading flex-shrink-0 w-100 text-center">
        <h6 class="card-title fw-bold mb-1">{{ title }}</h6>
        <p v-if="subtitle" class="card-subtitle mb-0">{{ subtitle }}</p>
      </div>

      <ul class="card-opciones list-unstyled mb-0 flex-grow-1 text-start min-w-0">
        <li
          v-for="(opcion, index) in opciones"
          :key="opcion.id || index"
          class="card-opcion"
        >
          <div class="card-opcion__info min-w-0">
            <p class="card-opcion__nombre mb-0">{{ opcion.nombre }}</p>
            <p class="card-opcion__price mb-0">{{ opcion.price }}</p>
          </div>
          <a
            v-if="!agotado"
            class="btn btn-whatsapp wa-pill-btn card-opcion__wa"
            :href="whatsappUrlFor(opcion)"
            target="_blank"
            rel="noopener noreferrer"
            :aria-disabled="!whatsappReady"
            :class="{
              'opacity-50': !whatsappReady,
              'pe-none': !whatsappReady,
            }"
            :aria-label="`Solicitar ${opcion.nombre} de ${title} por WhatsApp`"
            @click="onWaCardClick"
          >
            <svg
              class="wa-pill-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span class="wa-pill-label">Solicita aquí</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getWhatsAppProductOptionUrl, isWhatsAppConfigured } from '@/config/whatsapp'

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  opciones: {
    type: Array,
    required: true,
    validator(v) {
      if (!Array.isArray(v) || v.length < 1) return false
      return v.every(
        (o) =>
          o &&
          typeof o === 'object' &&
          typeof o.nombre === 'string' &&
          o.nombre.trim().length > 0 &&
          typeof o.price === 'string' &&
          o.price.trim().length > 0,
      )
    },
  },
  agotado: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  imagePosition: {
    type: String,
    default: '',
  },
})

const whatsappReady = computed(() => isWhatsAppConfigured())

const imagePositionStyle = computed(() => {
  const pos = props.imagePosition?.trim()
  return pos ? { objectPosition: pos } : undefined
})

function whatsappUrlFor(opcion) {
  return getWhatsAppProductOptionUrl({
    productId: props.productId,
    title: props.title,
    subtitle: props.subtitle,
    image: props.image,
    opcion,
  })
}

let lastWaOpenMs = 0
function onWaCardClick(e) {
  if (!whatsappReady.value) {
    e.preventDefault()
    return
  }
  const now = Date.now()
  if (now - lastWaOpenMs < 2000) {
    e.preventDefault()
  } else {
    lastWaOpenMs = now
  }
}
</script>

<style scoped>
.card-pack {
  min-height: 0;
  border-radius: 1.125rem;
  overflow: visible;
  --bs-card-inner-border-radius: calc(1.125rem - 1px);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.42),
    0 2px 10px rgba(0, 0, 0, 0.28);
}

.card-pack-body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 0.55rem 0.7rem 0.75rem;
}

.card-img-wrap {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 1.125rem 1.125rem 0 0;
}

.card-img-wrap--pack {
  position: relative;
}

.card-pack-img-badge {
  position: absolute;
  top: 0.55rem;
  z-index: 2;
  border-radius: 0.4rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

.card-pack-agotado-badge {
  left: 50%;
  translate: -50% 0;
  padding: 0.38rem 0.85rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(145deg, #6a6a6a, #3d3d3d);
  border: 1px solid rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.card-pack-img--agotado {
  filter: grayscale(1) brightness(0.9);
}

.card-pack--agotado .card-title,
.card-pack--agotado .card-subtitle,
.card-pack--agotado .card-opcion {
  opacity: 0.88;
}

.card-img-top {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

@media (max-width: 575.98px) {
  .card-img-wrap {
    aspect-ratio: 16 / 10;
    height: auto;
  }
}

.card-heading {
  margin-bottom: 0.55rem;
}

.card-title {
  font-family: var(--font-display);
  overflow-wrap: break-word;
  font-size: clamp(0.95rem, 2.6vw, 1.15rem);
  line-height: 1.25;
  font-weight: 700;
}

.card-subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.68rem, 1.8vw, 0.8rem);
  line-height: 1.3;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(var(--vin-acento-rgb), 0.95);
  font-weight: 600;
}

.card-opciones {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}

.card-opcion {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.45rem;
  padding: 0.55rem 0;
  border-top: 1px solid rgba(var(--vin-acento-rgb), 0.35);
}

.card-opcion:first-child {
  border-top: none;
  padding-top: 0;
}

.card-opcion__nombre {
  font-family: var(--font-body);
  font-size: clamp(0.78rem, 2vw, 0.9rem);
  font-weight: 700;
  line-height: 1.25;
  color: #222;
}

.card-opcion__price {
  font-family: var(--font-body);
  font-size: clamp(0.82rem, 2vw, 0.95rem);
  font-weight: 800;
  color: rgba(var(--vin-acento-rgb), 1);
  margin-top: 0.25rem;
}

.card-opcion__wa {
  align-self: flex-start;
  padding: 0.35rem 0.75rem 0.35rem 0.65rem;
}

.card-opcion__wa .wa-pill-label {
  font-size: 0.72rem;
}

.card-pack--compact {
  border-radius: 0.85rem;
  --bs-card-inner-border-radius: calc(0.85rem - 1px);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.38),
    0 2px 8px rgba(0, 0, 0, 0.24);
}

.card-pack--compact .card-pack-body {
  padding: 0.4rem 0.5rem 0.5rem;
}

.card-pack--compact .card-img-wrap {
  aspect-ratio: 4 / 3;
  border-radius: 0.85rem 0.85rem 0 0;
}

.card-pack--compact .card-heading {
  margin-bottom: 0.35rem;
}

.card-pack--compact .card-title {
  font-size: clamp(0.82rem, 2.2vw, 0.98rem);
  line-height: 1.2;
}

.card-pack--compact .card-subtitle {
  font-size: clamp(0.6rem, 1.5vw, 0.7rem);
  line-height: 1.25;
}

.card-pack--compact .card-opcion {
  gap: 0.3rem;
  padding: 0.35rem 0;
}

.card-pack--compact .card-opcion__nombre {
  font-size: clamp(0.68rem, 1.7vw, 0.78rem);
  line-height: 1.2;
}

.card-pack--compact .card-opcion__price {
  font-size: clamp(0.72rem, 1.8vw, 0.82rem);
  margin-top: 0.1rem;
}

.card-pack--compact .card-opcion__wa {
  padding: 0.25rem 0.55rem 0.25rem 0.45rem;
}

.card-pack--compact .card-opcion__wa .wa-pill-label {
  font-size: 0.64rem;
}

.card-pack--compact .card-opcion__wa .wa-pill-icon {
  width: 0.9rem;
  height: 0.9rem;
}
</style>
