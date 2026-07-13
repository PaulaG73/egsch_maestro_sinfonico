/** Traducciones navbar, hero, footer y servicios (ES / EN / FR) */

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
      role: 'Director de Orquesta, Compositor y Orquestador',
      disciplines: 'Composiciones - Orquestaciones - Arreglos - Transcripciones',
      quote: '«Llevando la música de la partitura al escenario».',
      photoAlt: 'Eduardo Gajardo Schmidlin, Director de Orquesta, Compositor y Orquestador',
    },
    footer: {
      contactUs: 'Contáctanos',
      mailSubject: 'Contacto — Eduardo Gajardo Schmidlin',
      rights: 'Derechos reservados © {year} Paula Gajardo Schmidlin',
      scrollUp: 'Volver a la barra de navegación',
    },
    services: {
      composiciones: 'Composiciones',
      orquestaciones: 'Orquestaciones',
      arreglosCorales: 'Arreglos Corales',
      transcripcionPartituras: 'Transcripción de partituras',
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
      role: 'Conductor, Composer & Orchestrator',
      disciplines: 'Compositions — Orchestrations — Arrangements — Transcriptions',
      quote: '«Bringing the music from the score to the stage».',
      photoAlt: 'Eduardo Gajardo Schmidlin, Conductor, Composer and Orchestrator',
    },
    footer: {
      contactUs: 'Contact us',
      mailSubject: 'Enquiry — Eduardo Gajardo Schmidlin',
      rights: 'All rights reserved © {year} Paula Gajardo Schmidlin',
      scrollUp: 'Back to the navigation bar',
    },
    services: {
      composiciones: 'Compositions',
      orquestaciones: 'Orchestrations',
      arreglosCorales: 'Choral Arrangements',
      transcripcionPartituras: 'Score Transcription',
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
      role: 'Chef d’orchestre, Compositeur et Orchestrateur',
      disciplines: 'Composition — Orchestration — Arrangement — Transcription',
      quote: '« Porter la musique de la partition à la scène ».',
      photoAlt: 'Eduardo Gajardo Schmidlin, Chef d’orchestre, Compositeur et Orchestrateur',
    },
    footer: {
      contactUs: 'Contactez-nous',
      mailSubject: 'Contact — Eduardo Gajardo Schmidlin',
      rights: 'Tous droits réservés © {year} Paula Gajardo Schmidlin',
      scrollUp: 'Retour à la barre de navigation',
    },
    services: {
      composiciones: 'Composition',
      orquestaciones: 'Orchestration',
      arreglosCorales: 'Arrangements choraux',
      transcripcionPartituras: 'Transcription de partitions',
    },
  },
}

export function translate(locale, path, vars) {
  const lang = messages[locale] ? locale : 'es'
  const parts = String(path).split('.')
  let cur = messages[lang]
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return path
    cur = cur[part]
  }
  if (typeof cur !== 'string') return path
  if (!vars) return cur
  return cur.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  )
}
