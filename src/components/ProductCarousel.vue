<template>
  <div
    class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
    :class="{ 'packs-carousel-outer--compact': compact }"
    @mouseenter="pauseCarousel"
    @mouseleave="resumeCarousel"
    @touchstart.passive="onCarouselTouchStart"
    @touchend.passive="onCarouselTouchEnd"
    @focusin="pauseCarousel"
    @focusout="onCarouselFocusOut"
  >
    <button
      type="button"
      class="packs-carousel-arrow packs-carousel-arrow--prev"
      :aria-label="`Ver ${ariaLabel} anteriores`"
      @click="scrollCarousel(-1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>
    </button>
    <div
      ref="carouselRef"
      class="packs-carousel-wrap flex-grow-1 min-w-0"
      tabindex="0"
      role="region"
      :aria-label="`Carrusel de ${ariaLabel}, desplazamiento horizontal`"
    >
      <div class="packs-carousel-inner">
        <div
          v-for="(proyecto, idx) in itemsLoop"
          :key="`${proyecto.id}-${idx}`"
          class="packs-carousel-slide"
        >
          <CardComponent
            :product-id="proyecto.id"
            :title="proyecto.title"
            :subtitle="proyecto.subtitle || ''"
            :image="proyecto.image"
            :opciones="proyecto.opciones"
            :agotado="Boolean(proyecto.agotado)"
            :compact="compact"
            :image-position="proyecto.imagePosition || ''"
          />
        </div>
      </div>
    </div>
    <button
      type="button"
      class="packs-carousel-arrow packs-carousel-arrow--next"
      :aria-label="`Ver ${ariaLabel} siguientes`"
      @click="scrollCarousel(1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CardComponent from './CardComponent.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  ariaLabel: {
    type: String,
    default: 'productos',
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const itemsLoop = computed(() => {
  if (!props.items?.length) return []
  return [...props.items, ...props.items]
})

const carouselRef = ref(null)
const carouselPaused = ref(false)
const reduceMotion = ref(false)

const SCROLL_STEP = 0.32
const PACKS_CAROUSEL_IW = '--packs-carousel-iw'

let rafId = 0
let syncCarouselRaf = null
let touchResumeTimer = null
let focusResumeTimer = null
let arrowResumeTimer = null
let carouselResizeObserver = null

function syncCarouselInlineSize() {
  const el = carouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w > 0) el.style.setProperty(PACKS_CAROUSEL_IW, `${w}px`)
}

function scheduleSyncCarouselInlineSize() {
  if (syncCarouselRaf != null) return
  syncCarouselRaf = requestAnimationFrame(() => {
    syncCarouselRaf = null
    syncCarouselInlineSize()
  })
}

function pauseCarousel() {
  carouselPaused.value = true
}

function resumeCarousel() {
  carouselPaused.value = false
}

function onCarouselTouchStart() {
  pauseCarousel()
  if (touchResumeTimer) {
    clearTimeout(touchResumeTimer)
    touchResumeTimer = null
  }
}

function onCarouselTouchEnd() {
  if (touchResumeTimer) clearTimeout(touchResumeTimer)
  touchResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    touchResumeTimer = null
  }, 2400)
}

function onCarouselFocusOut(ev) {
  const outer = ev.currentTarget
  const next = ev.relatedTarget
  if (next && outer.contains(next)) return
  if (focusResumeTimer) clearTimeout(focusResumeTimer)
  focusResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    focusResumeTimer = null
  }, 400)
}

function scrollCarousel(direction) {
  const el = carouselRef.value
  if (!el) return
  pauseCarousel()
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)

  const inner = el.querySelector('.packs-carousel-inner')
  const firstSlide = inner?.querySelector('.packs-carousel-slide')
  let delta = el.clientWidth * direction
  if (inner && firstSlide) {
    const gapPx = parseFloat(getComputedStyle(inner).gap) || 0
    const slideW = firstSlide.offsetWidth
    const threeCols = window.matchMedia('(min-width: 768px)').matches
    if (!threeCols) delta = (slideW + gapPx) * direction
  }

  el.scrollBy({
    left: delta,
    behavior: reduceMotion.value ? 'auto' : 'smooth',
  })
  arrowResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    arrowResumeTimer = null
  }, 3200)
}

function tick() {
  const el = carouselRef.value
  if (el && !carouselPaused.value && !reduceMotion.value) {
    const half = el.scrollWidth / 2
    if (half > 1) {
      el.scrollLeft += SCROLL_STEP
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  syncCarouselInlineSize()
  const el = carouselRef.value
  if (el && typeof ResizeObserver !== 'undefined') {
    carouselResizeObserver = new ResizeObserver(() => scheduleSyncCarouselInlineSize())
    carouselResizeObserver.observe(el)
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (syncCarouselRaf != null) {
    cancelAnimationFrame(syncCarouselRaf)
    syncCarouselRaf = null
  }
  carouselResizeObserver?.disconnect()
  carouselResizeObserver = null
  cancelAnimationFrame(rafId)
  if (touchResumeTimer) clearTimeout(touchResumeTimer)
  if (focusResumeTimer) clearTimeout(focusResumeTimer)
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)
})
</script>

<style scoped>
.packs-carousel-outer {
  max-width: 100%;
  min-height: 0;
}

.packs-carousel-arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.5rem, 8vw, 2.85rem);
  height: clamp(2.5rem, 8vw, 2.85rem);
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--vin-acento);
  color: #fff;
  box-shadow: 0 2px 8px rgba(var(--vin-acento-rgb), 0.35);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.packs-carousel-arrow:hover {
  background-color: var(--vin-acento-hover);
  box-shadow: 0 3px 12px rgba(var(--vin-acento-rgb), 0.45);
}

.packs-carousel-arrow:active {
  background-color: var(--vin-acento-active);
  transform: scale(0.96);
}

.packs-carousel-arrow:focus-visible {
  outline: 2px solid rgba(var(--vin-acento-rgb), 0.55);
  outline-offset: 3px;
}

.packs-carousel-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--vin-acento-rgb), 0.45) transparent;
  padding-block: 0.25rem 0.75rem;
  outline: none;
}

.packs-carousel-wrap:focus-visible {
  box-shadow: 0 0 0 2px rgba(var(--vin-acento-rgb), 0.35);
  border-radius: 0.35rem;
}

.packs-carousel-wrap::-webkit-scrollbar {
  height: 6px;
}

.packs-carousel-wrap::-webkit-scrollbar-thumb {
  background: rgba(var(--vin-acento-rgb), 0.4);
  border-radius: 4px;
}

.packs-carousel-inner {
  --packs-gap: clamp(0.75rem, 2vw, 1.15rem);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: var(--packs-gap);
  width: max-content;
  min-height: 100%;
}

.packs-carousel-slide {
  flex: 0 0 auto;
  box-sizing: border-box;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  min-height: 0;
  width: var(--packs-carousel-iw, 100%);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .packs-carousel-slide {
    width: calc((var(--packs-carousel-iw, 100%) - 2 * var(--packs-gap)) / 3);
  }
}

@media (min-width: 1200px) {
  .packs-carousel-outer--compact .packs-carousel-slide {
    width: calc((var(--packs-carousel-iw, 100%) - 3 * var(--packs-gap)) / 4);
  }
}

.packs-carousel-slide > * {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  align-self: stretch;
}
</style>
