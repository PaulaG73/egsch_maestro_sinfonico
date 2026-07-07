<template>
  <div class="navBar">
    <nav id="navbar-principal" class="navbar navbar-expand-lg navbar-dark bg-vin-negro border-bottom py-2 py-md-3 nav-vino">
      <div class="container-fluid px-3 px-lg-4">
        <button
          class="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-3 align-items-lg-center">
            <li v-for="link in navLinks" :key="link.href" class="nav-item">
              <a class="nav-link" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>

          <div class="lang-switcher d-flex align-items-center justify-content-center justify-content-lg-end gap-1 mb-3 mb-lg-0">
            <button
              v-for="lang in languages"
              :key="lang.code"
              type="button"
              class="lang-switcher__btn"
              :class="{ 'lang-switcher__btn--active': locale === lang.code }"
              :aria-label="lang.label"
              :title="lang.label"
              @click="setLanguage(lang.code)"
            >
              <span class="lang-switcher__flag" aria-hidden="true">{{ lang.flag }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const locale = computed(() => store.getters.locale)

const navLinks = [
  { href: '#productos', label: 'Productos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos destacados' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
]

const languages = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
]

function setLanguage(code) {
  store.commit('setLocale', code)
}
</script>

<style scoped>
.nav-vino {
  border-color: var(--vin-borde-sutil) !important;
  box-shadow: 0 1px 0 0 rgba(109, 44, 53, 0.35);
}

.nav-vino .nav-link {
  font-family: 'Nunito', system-ui, sans-serif;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
}

.nav-vino .navbar-nav .nav-link {
  position: relative;
  padding-inline: 0.75rem;
  padding-block: 0.4rem;
  border-radius: 0.4rem;
  font-size: clamp(0.82rem, 2vw, 0.95rem);
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.nav-vino .navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.15rem;
  width: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--vin-acento, #6d2c35);
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.nav-vino .navbar-nav .nav-link:hover,
.nav-vino .navbar-nav .nav-link:focus-visible {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-vino .navbar-nav .nav-link:hover::after,
.nav-vino .navbar-nav .nav-link:focus-visible::after {
  width: calc(100% - 1.1rem);
}

@media (prefers-reduced-motion: reduce) {
  .nav-vino .navbar-nav .nav-link {
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .nav-vino .navbar-nav .nav-link:hover,
  .nav-vino .navbar-nav .nav-link:focus-visible {
    transform: none;
  }

  .nav-vino .navbar-nav .nav-link::after {
    transition: width 0.15s ease;
  }
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.35);
}

.lang-switcher__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.45rem;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;
}

.lang-switcher__btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
}

.lang-switcher__btn--active {
  background: rgba(var(--vin-acento-rgb), 0.35);
  border-color: rgba(var(--vin-acento-rgb), 0.65);
  box-shadow: 0 0 0 1px rgba(var(--vin-acento-rgb), 0.25);
}

.lang-switcher__btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.55);
  outline-offset: 2px;
}

.lang-switcher__flag {
  font-size: 1.15rem;
  line-height: 1;
}

@media (min-width: 992px) {
  .navbar-collapse {
    align-items: center;
  }

  .lang-switcher {
    flex-shrink: 0;
    margin-left: 1rem;
  }
}
</style>
