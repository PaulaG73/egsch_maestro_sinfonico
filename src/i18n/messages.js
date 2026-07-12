/** Traducciones navbar + hero (ES / EN / FR) — terminología musical de alto nivel */

export const messages = {
  es: {
    nav: {
      openMenu: 'Abrir menú de navegación',
      trayectoria: 'Trayectoria',
      productos: 'Productos',
      productosSinfonicos: 'Productos Sinfónicos',
      musicaPeliculas: 'Música de Películas',
      servicios: 'Servicios',
      testimonios: 'Testimonios',
      contacto: 'Contacto',
    },
    hero: {
      role: 'Maestro Sinfónico y Director de Orquesta',
      disciplines: 'Composiciones - Orquestaciones - Arreglos - Transcripciones',
      quote: '«Llevando la música de la partitura al escenario».',
      photoAlt: 'Eduardo Gajardo Schmidlin, Maestro Sinfónico y Director de Orquesta',
    },
  },
  en: {
    nav: {
      openMenu: 'Open navigation menu',
      trayectoria: 'Career',
      productos: 'Catalogue',
      productosSinfonicos: 'Symphonic Catalogue',
      musicaPeliculas: 'Cinema in Concert',
      servicios: 'Services',
      testimonios: 'Testimonials',
      contacto: 'Contact',
    },
    hero: {
      role: 'Symphonic Mastermind & Conductor',
      disciplines: 'Compositions — Orchestrations — Arrangements — Transcriptions',
      quote: '«Bringing the music from the score to the stage».',
      photoAlt: 'Eduardo Gajardo Schmidlin, Symphonic Mastermind and Conductor',
    },
  },
  fr: {
    nav: {
      openMenu: 'Ouvrir le menu de navigation',
      trayectoria: 'Parcours',
      productos: 'Catalogue',
      productosSinfonicos: 'Catalogue symphonique',
      musicaPeliculas: 'Musiques de Films en Concert',
      servicios: 'Services',
      testimonios: 'Témoignages',
      contacto: 'Contact',
    },
    hero: {
      role: 'Grand Orchestrateur & Chef d’orchestre',
      disciplines: 'Composition — Orchestration — Arrangement — Transcription',
      quote: '« Porter la musique de la partition à la scène ».',
      photoAlt: 'Eduardo Gajardo Schmidlin, Grand Orchestrateur et Chef d’orchestre',
    },
  },
}

export function translate(locale, path) {
  const lang = messages[locale] ? locale : 'es'
  const parts = String(path).split('.')
  let cur = messages[lang]
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return path
    cur = cur[part]
  }
  return typeof cur === 'string' ? cur : path
}
