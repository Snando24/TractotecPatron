# COOKIES.md

## 1. Inventario (según el código; verificar en navegador)

| Origen | Tipo | Finalidad | Categoría |
|---|---|---|---|
| Google Maps (iframe en Contacto / Home) | Cookies de terceros (Google) | Mapa | Terceros / funcional-marketing de Google [verificar] |
| Supabase Auth | `localStorage` (no cookie) solo en `/admin/proyectos` tras login | Sesión del administrador | Estrictamente necesaria |
| Vercel Web Analytics | Sin cookies según Vercel [verificar] | Métricas | Analítica |

## 2. Categorías

Necesarias: sesión del admin. Terceros: Google Maps.

## 3. Consentimiento

No hay banner. Opciones: (a) cargar el mapa solo al hacer clic ("Ver mapa") o usar un enlace a Google Maps; (b) banner de consentimiento. [POR DEFINIR – validar con asesoría]

## 4. Scripts de terceros

Google Maps (iframe), Vercel Analytics (script `/_vercel/insights`).

## 5. Verificación técnica

[POR DEFINIR] Revisar DevTools → Application → Cookies en producción.

## 6. Política pública

No existe.
