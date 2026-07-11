<template>
  <div class="navBar">
    <nav id="navbar-principal" class="navbar navbar-expand-lg navbar-dark bg-vino-profundo border-bottom py-2 py-md-3 nav-vino">
      <div class="container-fluid px-3 px-lg-4 navbar-inner">
        <div class="lang-switcher d-flex align-items-center gap-1">
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
            <span class="lang-switcher__flag" aria-hidden="true">
              <svg v-if="lang.code === 'es'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
                <rect width="30" height="20" fill="#c60b1e"/>
                <rect y="5" width="30" height="10" fill="#ffc400"/>
              </svg>
              <svg v-else-if="lang.code === 'en'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
                <rect width="30" height="20" fill="#fff"/>
                <rect x="13" width="4" height="20" fill="#ce1124"/>
                <rect y="8" width="30" height="4" fill="#ce1124"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
                <rect width="10" height="20" fill="#002395"/>
                <rect x="10" width="10" height="20" fill="#fff"/>
                <rect x="20" width="10" height="20" fill="#ed2939"/>
              </svg>
            </span>
          </button>
        </div>

        <button
          class="navbar-toggler"
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
            <li class="nav-item">
              <a class="nav-link" href="#trayectoria">Trayectoria</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="productosDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Productos
              </a>
              <ul class="dropdown-menu dropdown-menu-dark nav-dropdown" aria-labelledby="productosDropdown">
                <li>
                  <a class="dropdown-item" href="#productos-sinfonicos">Productos Sinfónicos</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#musica-peliculas">Música de Películas</a>
                </li>
              </ul>
            </li>
            <li v-for="link in navLinks" :key="link.href" class="nav-item">
              <a class="nav-link" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
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
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos destacados' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
]

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

function setLanguage(code) {
  store.commit('setLocale', code)
}
</script>

<style scoped>
.navbar-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.lang-switcher {
  order: 1;
  margin-left: auto;
  flex-shrink: 0;
}

.navbar-toggler {
  order: 2;
  margin-left: 0.5rem;
  border-color: rgba(255, 255, 255, 0.35);
}

.navbar-collapse {
  order: 3;
  flex-basis: 100%;
}

@media (min-width: 992px) {
  .lang-switcher {
    order: 3;
    margin-left: 1rem;
  }

  .navbar-collapse {
    order: 2;
    flex-basis: auto;
    flex-grow: 1;
  }
}

.nav-vino {
  border-color: var(--vin-borde-sutil) !important;
  box-shadow: 0 1px 0 0 rgba(var(--vin-acento-rgb), 0.35);
}

.nav-vino .nav-link {
  font-family: var(--font-body);
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
  background-color: var(--vin-acento);
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.nav-vino .navbar-nav .nav-link:hover,
.nav-vino .navbar-nav .nav-link:focus-visible,
.nav-vino .navbar-nav .nav-link.show {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-vino .navbar-nav .nav-link:hover::after,
.nav-vino .navbar-nav .nav-link:focus-visible::after,
.nav-vino .navbar-nav .nav-link.show::after {
  width: calc(100% - 1.1rem);
}

.nav-dropdown {
  --bs-dropdown-bg: var(--vin-profundo);
  --bs-dropdown-link-color: rgba(255, 255, 255, 0.9);
  --bs-dropdown-link-hover-bg: rgba(var(--vin-acento-rgb), 0.35);
  --bs-dropdown-link-hover-color: #fff;
  --bs-dropdown-link-active-bg: rgba(var(--vin-acento-rgb), 0.45);
  --bs-dropdown-border-color: var(--vin-borde-sutil);
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 0.4rem;
  border-radius: 0.5rem;
  margin-top: 0.35rem;
}

.nav-dropdown .dropdown-item {
  border-radius: 0.35rem;
  font-weight: 600;
  padding: 0.45rem 0.85rem;
}

@media (prefers-reduced-motion: reduce) {
  .nav-vino .navbar-nav .nav-link {
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .nav-vino .navbar-nav .nav-link:hover,
  .nav-vino .navbar-nav .nav-link:focus-visible,
  .nav-vino .navbar-nav .nav-link.show {
    transform: none;
  }

  .nav-vino .navbar-nav .nav-link::after {
    transition: width 0.15s ease;
  }
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
  display: inline-flex;
  width: 1.55rem;
  height: 1.05rem;
  border-radius: 0.15rem;
  overflow: hidden;
  line-height: 0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
}

.lang-switcher__flag svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
