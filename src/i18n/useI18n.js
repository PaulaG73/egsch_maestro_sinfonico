import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { translate } from './messages'

const HTML_LANG = { es: 'es', en: 'en', fr: 'fr' }

/**
 * Locale reactivo + helper `t('nav.contacto')` / `t('footer.rights', { year: 2026 })`.
 * `t` es un computed que depende de `locale`, para que las vistas se actualicen al cambiar idioma.
 */
export function useI18n() {
  const store = useStore()
  const locale = computed(() => store.getters.locale || 'es')

  const t = computed(() => {
    const loc = locale.value
    return (path, vars) => translate(loc, path, vars)
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
