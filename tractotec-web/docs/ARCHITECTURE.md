# ARCHITECTURE.md

## 1. Visión general

SPA estática (React + Vite) servida por Vercel. Los proyectos base están en el código; los trabajos
nuevos se leen/escriben directamente desde el navegador contra Supabase (Postgres, Storage, Auth),
protegidos por políticas RLS. No hay backend propio.

## 2. Principios

- Simplicidad: sin servidor propio mientras no sea necesario.
- La web funciona aunque Supabase no esté disponible (degrada a proyectos base).
- La seguridad de escritura vive en Supabase (RLS), no en el frontend.

## 3. Diagrama general

```text
Visitante ──► Vercel (SPA estática, /images, /assets)
                 │
                 ├─► Supabase REST  (SELECT projects – público)
                 ├─► Supabase Storage (imágenes públicas)
                 ├─► wa.me (WhatsApp)    ├─► Google Maps (iframe)
                 └─► Vercel Analytics

Administrador ──► /admin/proyectos ──► Supabase Auth (email+password)
                                   └─► INSERT/DELETE projects + upload Storage (rol authenticated)
```

## 4. Stack tecnológico

- Frontend: React 19, React Router 7, Tailwind CSS 4, lucide-react. JavaScript (sin TypeScript).
- Build: Vite 7 + plugin propio `project-images-manifest` (`vite.config.js`).
- Datos: Supabase Postgres (tabla `projects`), Supabase Storage (bucket `project-images`).
- Infraestructura: Vercel (hosting, CDN, analytics). DNS: [POR DEFINIR]. CI/CD: despliegue automático de Vercel en push. Testing: ninguno.

## 5. Estructura del repositorio

```text
TractotecPatron/
└── tractotec-web/
    ├── public/            # estáticos: images/proyectos/**, branding, robots.txt, sitemap.xml
    ├── src/
    │   ├── components/    # secciones, layout/, seo/Seo.jsx, ui/
    │   ├── constants/     # site.js (datos empresa, SITE_URL), projects.js, services.js, navigation.js
    │   ├── data/          # defaultProjects.js (proyectos base)
    │   ├── hooks/         # useProjects.js (base + Supabase, con caché)
    │   ├── pages/         # una página por ruta
    │   └── utils/         # projectsLoader.js, supabaseClient.js, dateUtils.js
    ├── docs/
    ├── SUPABASE_SETUP.md
    └── vercel.json        # rewrites SPA + headers
```

## 6. Frontend

- Rutas (`App.jsx`): `/`, `/servicios`, `/proyectos`, `/proyectos/:slug`, `/nosotros`, `/contacto`, `/admin/proyectos`, `*` (404).
- Categoría activa en `/proyectos` derivada de la URL (`:slug`, `?filtro=recientes`, `?categoria=`).
- Estado de proyectos: `useProjects()` devuelve los proyectos base de inmediato y luego los combina con los de Supabase (caché a nivel de módulo, invalidada al crear/eliminar en el panel).
- Imágenes de proyectos base: el plugin de Vite lista `public/images/proyectos/**` en build y lo expone como `virtual:project-images`. Antes se usaba `import.meta.glob` sobre `/public`, que duplicaba todas las fotos en `dist/assets`.
- Metadatos por ruta: `components/seo/Seo.jsx` (React 19 eleva `<title>`, `<meta>`, `<link>` al `<head>`).

## 7–8. Backend / API

No hay backend propio. Se eliminó `api/projects/route.js` (usaba `@vercel/kv`, no instalado ni usado).

## 9. Modelo de datos

Tabla `projects` (ver SQL en `SUPABASE_SETUP.md`): `id BIGINT PK`, `title`, `category`, `summary`, `status` (`completado|en_progreso`), `date` (YYYY-MM-DD), `featured`, `image` (portada), `folder` (`admin/<id>`), `images TEXT[]` (URLs públicas de Storage), `created_at`.

## 10. Autenticación y autorización

- Método: Supabase Auth email + contraseña (ver ADR-001). Registro público desactivado.
- Sesión: gestionada por supabase-js (localStorage del navegador).
- Roles: `anon` (lectura) y `authenticated` (= administrador, insert/delete).
- MFA: [POR DEFINIR] (Supabase lo soporta).

## 12. Configuración

`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_BUCKET` (ver `.env.example`). Todas son públicas (van al bundle).

## 13. Integraciones externas

| Integración | Finalidad | Datos | Criticidad |
|---|---|---|---|
| Supabase | Trabajos, imágenes, login | Contenido de trabajos; email del admin | Media |
| WhatsApp (wa.me) | Contacto | Lo que el usuario escriba | Alta |
| Google Maps embed | Mapa | IP/cookies de Google | Baja |
| Vercel Analytics | Visitas | Métricas agregadas | Baja |

## 14. Flujos de datos

- Contacto: formulario → texto en el navegador → `wa.me/?text=` (la web no guarda nada).
- Alta de trabajo: admin autenticado → sube imágenes a Storage → INSERT en `projects` → visible en `/proyectos`.

## 18. Despliegue

Ver `DEPLOYMENT.md`.

## 20. Rendimiento

- Imágenes con `loading="lazy"` y `decoding="async"` en galerías.
- Cache-Control para `/assets` (inmutable) e `/images` (7 días) en `vercel.json`.

## 23. Dependencias críticas

| Dependencia | Uso | Criticidad |
|---|---|---|
| react / react-dom 19 | UI y hoisting de metadatos | Alta |
| react-router-dom 7 | Rutas | Alta |
| @supabase/supabase-js 2 | Datos del panel | Media |
| tailwindcss 4 | Estilos | Alta |

## 24. Decisiones arquitectónicas

- [ADR-001](adr/ADR-001-supabase-auth-admin.md): autenticación del panel con Supabase Auth + RLS.

## 25. Deuda técnica

| Elemento | Impacto | Prioridad | Acción |
|---|---|---|---|
| Fotos JPEG originales de WhatsApp (varios MB) | Carga lenta en móvil | Alta | Convertir a WEBP y redimensionar |
| SPA sin prerender | Indexación de rutas internas depende de JS | Media | Evaluar prerender/SSG |
| Componentes sin uso (`StatsBar`, `CTABanner`, `WhatsAppFloat`, `WorkshopTicker`, `ui/SectionHeader`) | Ruido | Baja | Usar o eliminar |
| Imágenes de fondo/logo reutilizadas como favicon y OG | Calidad de previews | Baja | Crear favicon y og-image dedicados |
| Sin tests | Regresiones | Media | Añadir pruebas básicas |

## 26. Limitaciones conocidas

- Los proyectos base no se pueden editar desde el panel.
- El JSON-LD y Open Graph son estáticos (iguales para todas las rutas).
