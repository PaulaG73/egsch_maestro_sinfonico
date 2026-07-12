# Eduardo Gajardo Schmidlin — Maestro Sinfónico

Sitio web (Vue 3) para el maestro sinfónico y director de orquesta: presentación, catálogo de partituras, servicios y contacto.

- **Demo:** [egschmaestrosinfonico.netlify.app](https://egschmaestrosinfonico.netlify.app/)
- **Stack:** Vue 3, Vue Router, Vuex, Bootstrap 5

## Desarrollo

```bash
npm install
npm run serve
```

Build de producción:

```bash
npm run build
```

## Variables de entorno

En `.env.development` y `.env.production` (sin barra final):

```
VUE_APP_PUBLIC_SITE_URL=https://egschmaestrosinfonico.netlify.app
```

Sirve para enlaces de imagen en mensajes de WhatsApp (los productos) y coherencia con el dominio público.

## Estructura relevante

```
src/
  components/     # NavBar, Footer, carrusel y tarjetas de productos
  data/           # productosSinfonicos.json, musicaPeliculas.json, servicios.json
  i18n/           # ES / EN / FR (navbar + hero)
  config/         # WhatsApp
  views/HomeView.vue
public/
  img/            # fotos del maestro y portadas de productos
  compartir.html  # meta Open Graph para compartir el sitio
```

## Tipografía y tema

- **Cinzel** (títulos) y **Montserrat** (cuerpo)
- Tema en `src/styles/theme_maestro.css` (paleta azul medianoche, tokens `--ms-*`)
