<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="track-modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @keydown.esc.prevent="close"
    >
      <button
        type="button"
        class="track-modal__backdrop"
        aria-label="Cerrar"
        @click="close"
      />
      <div class="track-modal__panel" ref="panelRef">
        <header class="track-modal__header">
          <div class="track-modal__heading min-w-0">
            <p class="track-modal__eyebrow mb-1">{{ title }}</p>
            <h2 :id="titleId" class="track-modal__title mb-0">{{ formato?.nombre }}</h2>
          </div>
          <button
            type="button"
            class="track-modal__close"
            aria-label="Cerrar menú"
            @click="close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
          </button>
        </header>

        <p class="track-modal__hint mb-0">
          Elige el concierto completo o uno/varios temas. Si marcas el completo, se desmarcan los temas sueltos.
        </p>

        <ul class="track-modal__list list-unstyled mb-0">
          <li
            v-for="tema in temas"
            :key="tema.id"
            class="track-modal__item"
            :class="{ 'track-modal__item--completo': tema.esCompleto }"
          >
            <label class="track-modal__label">
              <input
                type="checkbox"
                class="track-modal__check"
                :checked="selectedIds.includes(tema.id)"
                @change="toggleTema(tema)"
              >
              <span class="track-modal__nombre">{{ tema.nombre }}</span>
              <span class="track-modal__precio">{{ priceForTema(tema) }}</span>
            </label>
          </li>
        </ul>

        <footer class="track-modal__footer">
          <p class="track-modal__resumen mb-0">{{ resumenSeleccion }}</p>
          <a
            class="btn btn-whatsapp wa-pill-btn track-modal__wa"
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            :aria-disabled="!canSubmit"
            :class="{ 'opacity-50 pe-none': !canSubmit }"
            @click="onSubmitClick"
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
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { getWhatsAppProductSelectionUrl, isWhatsAppConfigured } from '@/config/whatsapp'

const props = defineProps({
  open: { type: Boolean, default: false },
  productId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  formato: { type: Object, default: null },
  temas: { type: Array, default: () => [] },
})

const emit = defineEmits(['close'])

const titleId = `track-modal-title-${Math.random().toString(36).slice(2, 9)}`
const panelRef = ref(null)
const selectedIds = ref([])

const whatsappReady = computed(() => isWhatsAppConfigured())

const selectedTemas = computed(() =>
  props.temas.filter((t) => selectedIds.value.includes(t.id)),
)

const canSubmit = computed(
  () => whatsappReady.value && selectedTemas.value.length > 0 && props.formato,
)

const resumenSeleccion = computed(() => {
  const n = selectedTemas.value.length
  if (!n) return 'Ningún ítem seleccionado'
  if (selectedTemas.value.some((t) => t.esCompleto)) return 'Concierto completo seleccionado'
  return n === 1 ? '1 tema seleccionado' : `${n} temas seleccionados`
})

const whatsappHref = computed(() => {
  if (!canSubmit.value) return '#'
  return getWhatsAppProductSelectionUrl({
    productId: props.productId,
    title: props.title,
    subtitle: props.subtitle,
    image: props.image,
    formato: props.formato,
    temas: selectedTemas.value.map((t) => ({
      ...t,
      price: priceForTema(t),
    })),
  })
})

function priceForTema(tema) {
  if (!props.formato) return '$XX.XXX'
  if (tema.esCompleto) {
    return props.formato.priceCompleto || props.formato.price || '$XX.XXX'
  }
  return props.formato.priceTema || props.formato.price || '$XX.XXX'
}

function toggleTema(tema) {
  const id = tema.id
  const checked = !selectedIds.value.includes(id)

  if (tema.esCompleto) {
    selectedIds.value = checked ? [id] : []
    return
  }

  const completo = props.temas.find((t) => t.esCompleto)
  let next = selectedIds.value.filter((x) => x !== completo?.id)

  if (checked) {
    if (!next.includes(id)) next = [...next, id]
  } else {
    next = next.filter((x) => x !== id)
  }
  selectedIds.value = next
}

function close() {
  emit('close')
}

let lastWaOpenMs = 0
function onSubmitClick(e) {
  if (!canSubmit.value) {
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

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      selectedIds.value = []
      document.body.style.overflow = 'hidden'
      await nextTick()
      panelRef.value?.querySelector('input, button')?.focus?.()
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>

<style scoped>
.track-modal {
  position: fixed;
  inset: 0;
  z-index: 1080;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.track-modal__backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.72);
  cursor: pointer;
}

.track-modal__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 28rem);
  max-height: min(88vh, 40rem);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.15rem 1.15rem 1rem;
  border-radius: 1rem;
  background: #121820;
  border: 1px solid var(--ms-border);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  color: var(--ms-text);
  text-align: left;
}

.track-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.track-modal__eyebrow {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ms-accent-on-dark);
}

.track-modal__title {
  font-family: var(--font-display);
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 600;
  line-height: 1.3;
}

.track-modal__close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.track-modal__close:hover,
.track-modal__close:focus-visible {
  color: #fff;
  border-color: rgba(var(--ms-accent-rgb), 0.5);
}

.track-modal__hint {
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--ms-text-muted);
}

.track-modal__list {
  overflow-y: auto;
  min-height: 0;
  flex: 1 1 auto;
  padding-right: 0.15rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--ms-accent-rgb), 0.4) transparent;
}

.track-modal__item {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.track-modal__item--completo {
  background: rgba(var(--ms-accent-rgb), 0.1);
  border-radius: 0.45rem;
  border-top: none;
  margin-bottom: 0.25rem;
}

.track-modal__label {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.45rem;
  cursor: pointer;
  font-family: var(--font-body);
}

.track-modal__check {
  width: 1.05rem;
  height: 1.05rem;
  accent-color: var(--ms-accent);
}

.track-modal__nombre {
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ms-text);
}

.track-modal__precio {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--ms-accent-on-dark);
  white-space: nowrap;
}

.track-modal__footer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;
  padding-top: 0.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.track-modal__resumen {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--ms-text-muted);
  text-align: center;
}

.track-modal__wa {
  align-self: center;
}
</style>
