<template>
  <NavBar />

  <!-- Hero / Sobre mí -->
  <section id="sobre-mi" class="home-section home-section--ink py-4 py-md-5">
    <div class="container hero d-flex flex-column flex-md-row-reverse align-items-center justify-content-center gap-4 gap-md-5">
      <div
        ref="heroFotoShellRef"
        class="hero-foto-shell"
        :class="{ 'hero-foto-shell--in-view': heroFotoInView }"
      >
        <div class="hero-foto">
          <img
            class="hero-foto__img"
            :src="heroFotoSrc"
            alt="Eduardo Gajardo Schmidlin, Maestro Sinfónico y Director de Orquesta"
            loading="eager"
            decoding="async"
          >
        </div>
      </div>
      <div class="hero-texto text-center text-md-start">
        <h1 class="hero-titulo mb-3">
          Eduardo Gajardo Schmidlin — Maestro Sinfónico y Director de Orquesta
        </h1>
        <p class="hero-subtitulo mb-0">
          Composición, arreglos y dirección orquestal.
          <span class="hero-cita">«Llevando la música de la partitura al escenario».</span>
        </p>
      </div>
    </div>
  </section>

  <!-- Reproductor de video (franja provisional) -->
  <section id="video" class="home-section home-section--slate py-2">
    <div class="container">
      <div class="video-player-shell">
        <div class="video-player-placeholder" role="region" aria-label="Reproductor de video">
          <svg class="video-player-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
          </svg>
          <p class="video-player-label mb-0">Video próximamente</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Productos -->
  <section id="productos" class="home-section home-section--slate pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center">
      <h2 class="section-title mb-4">Productos</h2>
    </div>
    <div
      class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
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
        aria-label="Ver productos anteriores"
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
        aria-label="Carrusel de productos, desplazamiento horizontal"
      >
        <div class="packs-carousel-inner">
          <div
            v-for="(proyecto, idx) in proyectosLoop"
            :key="`${proyecto.id}-${idx}`"
            class="packs-carousel-slide"
          >
            <CardComponent
              :pack-id="proyecto.id"
              :title="proyecto.title"
              :valle="proyecto.valle"
              :bloques="proyecto.bloques"
              :image="proyecto.image"
              :price="proyecto.price"
              :oferta-etiqueta="proyecto.ofertaEtiqueta || ''"
              :price-oferta="proyecto.priceOferta || ''"
              :agotado="Boolean(proyecto.agotado)"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--next"
        aria-label="Ver productos siguientes"
        @click="scrollCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
  </section>

  <!-- Servicios -->
  <section id="servicios" class="home-section home-section--ink py-4 py-md-5">
    <div class="container">
      <h2 class="section-title mb-4 mb-md-5">Servicios</h2>
      <div class="row g-3 g-md-4 justify-content-center">
        <div
          v-for="servicio in servicios"
          :key="servicio.id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <article class="servicio-card h-100">
            <div class="servicio-card__icon" aria-hidden="true">
              <svg v-if="servicio.icon === 'composicion'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9 13c0 .552-.448 1-1 1s-1-.448-1-1V5c0-.552.448-1 1-1s1 .448 1 1z"/>
                <path d="M6 12.036V13c0 .552-.448 1-1 1s-1-.448-1-1v-.964c-.725-.35-1.22-.998-1.22-1.752 0-.754.495-1.402 1.22-1.752V7c0-.552.448-1 1-1s1 .448 1 1v1.536c.725.35 1.22.998 1.22 1.752 0 .754-.495 1.402-1.22 1.752"/>
              </svg>
              <svg v-else-if="servicio.icon === 'arreglos'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z"/>
                <path d="M4.603 12.087a.5.5 0 0 1-.707-.707L10.793 4.5a.5.5 0 1 1 .707.707z"/>
              </svg>
              <svg v-else-if="servicio.icon === 'direccion'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3a5 5 0 0 0-5 5v1a1 1 0 0 1-2 0V8a7 7 0 1 1 14 0v1a1 1 0 0 1-2 0V8a5 5 0 0 0-5-5"/>
                <path d="M5 10a3 3 0 1 1 6 0v3a3 3 0 1 1-6 0z"/>
              </svg>
            </div>
            <h3 class="servicio-card__titulo">{{ servicio.titulo }}</h3>
            <p class="servicio-card__descripcion mb-0">{{ servicio.descripcion }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Proyectos destacados (placeholder) -->
  <section id="proyectos" class="home-section home-section--slate py-4 py-md-5">
    <div class="container">
      <h2 class="section-title mb-3">Proyectos destacados</h2>
      <p class="section-placeholder mb-0">Contenido próximamente.</p>
    </div>
  </section>

  <!-- Testimonios (placeholder) -->
  <section id="testimonios" class="home-section home-section--ink py-4 py-md-5">
    <div class="container">
      <h2 class="section-title mb-3">Testimonios</h2>
      <p class="section-placeholder mb-0">Contenido próximamente.</p>
    </div>
  </section>

  <div id="contacto">
    <FooterComponent />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../components/NavBar'
import FooterComponent from '../components/FooterComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import catalogoPacks from '../data/catalogoPack.json'

/** Foto del director en `public/img/image_maestro.jpg` */
const heroFotoSrc = '/img/image_maestro.jpg'

const servicios = [
  {
    id: 1,
    titulo: 'Composiciones',
    descripcion: 'Creación de piezas sinfónicas, de cámara y arreglos a medida para distintos formatos orquestales.',
    icon: 'composicion',
  },
  {
    id: 2,
    titulo: 'Orquestaciones',
    descripcion: 'Adaptación y orquestación de obras existentes, respetando la intención musical y ampliando su paleta sonora.',
    icon: 'arreglos',
  },
  {
    id: 3,
    titulo: 'Arreglos Corales',
    descripcion: 'Preparación de ensayos, dirección en escenario y acompañamiento en procesos de grabación discográfica.',
    icon: 'direccion',
  },
  {
    id: 4,
    titulo: 'Transcripción de partituras',
    descripcion: 'Asesoría para instituciones, festivales y agrupaciones en programación, montaje y producción musical.',
    icon: 'consultoria',
  },
]

/** Dos series iguales para bucle de scroll sin salto visible */
const proyectosLoop = computed(() => [...catalogoPacks, ...catalogoPacks])

const carouselRef = ref(null)
const heroFotoShellRef = ref(null)
const heroFotoInView = ref(false)
const carouselPaused = ref(false)
const reduceMotion = ref(false)

let heroFotoObserver = null

/** Píxeles por frame (~60 fps); ~0.3 ≈ 18 px/s */
const SCROLL_STEP = 0.32

/** Ancho del hueco del carrusel (sustituye cqi sin container-type, evita avisos del validador CSS) */
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

/**
 * ResizeObserver + setProperty en el mismo frame puede disparar
 * "ResizeObserver loop completed with undelivered notifications".
 * Se aplaza al siguiente paint (rAF).
 */
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
    /* Móvil: un avance = 1 tarjeta + hueco; desktop: el viewport ya encaja 3 enteras */
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

function setupHeroFotoReveal() {
  if (reduceMotion.value) {
    heroFotoInView.value = true
    return
  }
  const shell = heroFotoShellRef.value
  if (!shell) {
    heroFotoInView.value = true
    return
  }
  if (typeof IntersectionObserver === 'undefined') {
    heroFotoInView.value = true
    return
  }
  heroFotoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          heroFotoInView.value = true
          heroFotoObserver?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
  )
  heroFotoObserver.observe(shell)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setupHeroFotoReveal()
  syncCarouselInlineSize()
  const el = carouselRef.value
  if (el && typeof ResizeObserver !== 'undefined') {
    carouselResizeObserver = new ResizeObserver(() => scheduleSyncCarouselInlineSize())
    carouselResizeObserver.observe(el)
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  heroFotoObserver?.disconnect()
  heroFotoObserver = null
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
.home-section {
  background-color: var(--vin-negro-marca);
}

.home-section--ink {
  background-color: var(--vin-negro-marca);
}

.home-section--slate {
  background-color: var(--vin-fondo-packs);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 4vw, 1.9rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--vin-texto-claro);
  position: relative;
  display: inline-block;
  padding-bottom: 0.75rem;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: clamp(2.5rem, 18vw, 3.75rem);
  height: 3px;
  transform: translateX(-50%);
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    var(--vin-acento) 0%,
    rgba(var(--vin-acento-rgb), 0.5) 100%
  );
  opacity: 0.88;
}

.section-placeholder {
  font-family: var(--font-body);
  color: var(--vin-texto-muted);
  font-size: clamp(0.9rem, 2.2vw, 1rem);
}

/* Hero */
.hero-foto-shell {
  --foto-ancho: min(100%, 22rem);
  flex: 0 0 auto;
  width: var(--foto-ancho);
  margin-inline: auto;
  position: relative;
  opacity: 0;
  transform: scale(0.96) translateY(14px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-foto-shell--in-view {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.hero-foto {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(145deg, #1a1a1a 0%, #2a2024 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 12px 36px rgba(0, 0, 0, 0.45);
}

@media (min-width: 768px) {
  .hero-foto-shell {
    --foto-ancho: 26rem;
    margin-inline: 0;
  }
}

.hero-foto__img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
}

@media (prefers-reduced-motion: reduce) {
  .hero-foto-shell {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.hero-texto {
  flex: 0 1 auto;
  min-width: 0;
  max-width: min(100%, 42rem);
}

@media (min-width: 768px) {
  .hero-texto {
    flex: 1 1 0;
    max-width: 32rem;
  }
}

.hero-titulo {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4.5vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.04em;
  color: var(--vin-texto-claro);
}

.hero-subtitulo {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 2.4vw, 1.1rem);
  line-height: 1.65;
  color: var(--vin-texto-muted);
}

.hero-cita {
  display: block;
  margin-top: 0.35rem;
  font-style: italic;
  color: var(--vin-acento-sobre-negro);
  font-weight: 600;
}

/* Video */
.video-player-shell {
  max-width: 100%;
  margin-inline: auto;
}

.video-player-placeholder {
  height: clamp(3.25rem, 8vw, 4.25rem);
  border-radius: 0.45rem;
  background: linear-gradient(160deg, #1c1418 0%, #0f0f0f 100%);
  border: 1px solid var(--vin-borde-sutil);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  color: var(--vin-texto-muted);
}

.video-player-icon {
  opacity: 0.45;
  flex-shrink: 0;
}

.video-player-label {
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

/* Servicios */
.servicio-card {
  text-align: center;
  padding: 1.5rem 1.15rem;
  border-radius: 0.85rem;
  background: var(--vin-superficie-oscura);
  border: 1px solid var(--vin-borde-sutil);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.servicio-card:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--vin-acento-rgb), 0.35);
}

.servicio-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  margin-bottom: 0.85rem;
  border-radius: 50%;
  background: rgba(var(--vin-acento-rgb), 0.18);
  color: var(--vin-acento-sobre-negro);
}

.servicio-card__titulo {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.3;
  /* Reserva 2 líneas de título para alinear descripciones */
  min-height: calc(1.05rem * 1.3 * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vin-texto-claro);
  margin-bottom: 0.65rem;
}

.servicio-card__descripcion {
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--vin-texto-muted);
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .servicio-card {
    transition: none;
  }

  .servicio-card:hover {
    transform: none;
  }
}

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

/*
 * Siempre tarjetas enteras en el viewport: 1 columna en móvil, 3 en md+.
 * --packs-carousel-iw = ancho del área scroll (ResizeObserver).
 */
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

.packs-carousel-slide > * {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  align-self: stretch;
}
</style>