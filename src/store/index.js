import { createStore } from 'vuex'

export default createStore({
  state: {
    locale: 'es',
  },
  getters: {
    locale: (state) => state.locale,
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale
    },
  },
  actions: {
  },
  modules: {
  }
})
