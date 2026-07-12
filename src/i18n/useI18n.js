import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { translate } from './messages'

const HTML_LANG = { es: 'es', en: 'en', fr: 'fr' }

/**
 * Locale reactivo + helper `t('nav.contacto')` para navbar y hero.
 * `t` es un computed que depende de `locale`, para que HomeView se actualice al cambiar idioma.
 */
export function useI18n() {
  const store = useStore()
  const locale = computed(() => store.getters.locale || 'es')

  const t = computed(() => {
    const loc = locale.value
    return (path) => translate(loc, path)
  })

  function setLocale(code) {
    store.commit('setLocale', code)
  }

  watch(
    locale,
    (code) => {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = HTML_LANG[code] || 'es'
      }
    },
    { immediate: true },
  )

  return { locale, t, setLocale }
}
