# Eduardo Gajardo Schmidlin. Director de Orquesta, Compositor y Orquestador

Sitio web (Vue 3) de Eduardo Gajardo Schmidlin: presentación, catálogo de partituras, servicios y contacto.

- **Demo:** [egschdirectorcompositor.netlify.app](https://egschdirectorcompositor.netlify.app/)
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
VUE_APP_PUBLIC_SITE_URL=https://egschdirectorcompositor.netlify.app
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
  img/            # fotos de productos y hero
  share/          # páginas OG por producto (WhatsApp)
  compartir.html  # meta Open Graph para compartir el sitio
```

Paquete npm / repo: `egsch_director_compositor`.
