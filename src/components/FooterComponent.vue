<template>
    <footer class="footer py-2 py-md-4 mt-auto bg-vino-profundo border-top footer-vino">
      <div class="container d-flex align-items-center flex-wrap gap-2">
  
        <!-- Botón volver al inicio (izquierda, ancho fijo) -->
        <div class="footer-side">
          <span class="footer-home-wrap">
            <button
              type="button"
              class="footer-home-btn footer-action-btn"
              aria-label="Volver arriba a la barra de navegación"
              @click="irAlInicio"
            >
              <svg
                class="footer-action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                />
              </svg>
            </button>
            <span class="footer-home-tooltip" role="tooltip" aria-hidden="true">Volver arriba</span>
          </span>
        </div>
  
        <!-- Centro: espacio para CTA futuro + copyright -->
        <div class="flex-grow-1 d-flex flex-column align-items-center gap-2 footer-center-col min-w-0">
          <p class="mb-0 footer-copy">Derechos reservados &copy; 2026 Paula Gajardo Schmidlin</p>
        </div>
  
        <!-- Espacio equilibrante (derecha, mismo ancho que izquierda) -->
        <div class="footer-side"></div>
  
      </div>
    </footer>
  </template>
  
  <script setup>
  import { nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  async function irAlInicio() {
    if (router.currentRoute.value.name !== 'home') {
      await router.push({ name: 'home' })
      await nextTick()
      await nextTick()
    }
    const nav = document.getElementById('navbar-principal')
    if (nav) {
      nav.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  </script>
  
  <style scoped>
  .footer-vino {
    border-color: var(--vin-borde-sutil) !important;
    box-shadow: 0 -1px 0 0 rgba(var(--vin-acento-rgb), 0.28);
  }
  
  .footer {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .footer-home-btn {
    background: none;
    border: none;
    padding: 0.25rem;
    color: rgba(255, 255, 255, 0.92);
    border-radius: 0.25rem;
    transition: color 0.15s ease, opacity 0.15s ease;
  }
  
  .footer-home-btn:hover {
    color: #fff;
    opacity: 0.95;
  }
  
  .footer-home-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.7);
    outline-offset: 3px;
  }
  
  .footer-home-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }
  
  .footer-home-tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    translate: -6px -50%;
    padding: 0.45rem 0.85rem;
    background: #fff;
    color: var(--vin-profundo);
    font-family: var(--font-body);
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    z-index: 20;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      translate 0.2s ease;
  }
  
  .footer-home-tooltip::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    translate: 2px -50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 8px 7px 0;
    border-color: transparent #fff transparent transparent;
    filter: drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.12));
  }
  
  .footer-home-wrap:hover .footer-home-tooltip,
  .footer-home-wrap:focus-within .footer-home-tooltip {
    opacity: 1;
    visibility: visible;
    translate: 0 -50%;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .footer-home-tooltip {
      transition: none;
      translate: 0 -50%;
    }
  }
  
  .footer-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .footer-action-icon {
    flex-shrink: 0;
  }
  
  .footer-copy {
    font-size: 0.85rem;
    text-align: center;
  }
  
  .footer-side {
    width: 2rem;
    flex-shrink: 0;
  }

  .footer-center-col {
    min-width: 0;
  }

  @media (max-width: 767.98px) {
    .footer-center-col {
      width: 100%;
      flex-basis: 100%;
    }
  }
  
  @media (max-width: 400px) {
    .footer-side:last-child {
      display: none;
    }
  }
  </style>
  