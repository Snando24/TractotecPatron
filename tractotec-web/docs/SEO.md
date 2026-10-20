# SEO.md

## 1. Objetivo

Aparecer en búsquedas locales de traccionamiento/reparación de chasis y maquinaria pesada en Huancayo.

## 2. Audiencia y búsquedas

Términos usados en el sitio: "traccionamiento de chasis", "reparación/alineación/enderezado de chasis", "maquinaria pesada Huancayo", "fabricación de tolvas". Investigación de palabras clave: [POR DEFINIR].

## 3. Indexación

- `public/robots.txt`: permite todo salvo `/admin/`; declara el sitemap.
- `public/sitemap.xml`: 11 URLs (home, servicios, proyectos + 6 categorías, nosotros, contacto), unificadas a `https://www.tractotec.com`.
- Canonical por ruta (`Seo.jsx`) usando `SITE_URL` de `src/constants/site.js`. Se quitó el canonical fijo a la home de `index.html` (hacía que todas las páginas apuntaran a `/`).
- Rutas inexistentes muestran 404 con `noindex` (Vercel sigue devolviendo HTTP 200 por el rewrite SPA).
- **Pendiente:** confirmar dominio; si el definitivo es sin `www`, cambiar `SITE_URL`, `index.html`, `sitemap.xml` y `robots.txt`, y redirigir el otro en Vercel.

## 4. Metadatos

- `<title>` y `description` únicos por página (Home, Servicios, Proyectos/categoría, Nosotros, Contacto).
- Open Graph / Twitter: estáticos en `index.html` (los rastreadores de redes no ejecutan JS). `og:image` usa el logo; recomendable una imagen 1200×630 dedicada.

## 5. Contenido

- Un único `<h1>` por página (el logo del navbar ya no es `<h1>`; "Nosotros" usa `<h1>` en su página).
- Meta `keywords` se mantiene pero no aporta a Google.

## 6. Datos estructurados

JSON-LD `LocalBusiness` en `index.html` con nombre, teléfono, email, dirección (calle añadida desde los datos de contacto del sitio), `areaServed`.
Pendiente: `geo` y `openingHours` solo con datos confirmados; las coordenadas de `geo.position` no coinciden con el mapa embebido.

## 7. Imágenes

`alt` descriptivo en imágenes de contenido; las fotos son JPEG grandes (ver deuda técnica en `ARCHITECTURE.md`).

## 8. Rendimiento

Lazy-loading en galerías, caché de estáticos. Pendiente: WEBP y tamaños responsivos.

## 9. Errores

Página 404 propia.

## 10. Medición

Vercel Web Analytics. Google Search Console: [POR DEFINIR] (recomendado; enviar el sitemap).

## 11. Checklist

- [x] Title/description por ruta
- [x] Canonical por ruta
- [x] robots.txt + sitemap coherentes
- [x] Un h1 por página
- [ ] Dominio confirmado
- [ ] Search Console
- [ ] Imagen OG dedicada
- [ ] Prerender de rutas (opcional)
