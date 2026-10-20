# PROJECT.md

## 1. Identificación

**Nombre:** TractoTec – Web corporativa (repositorio `TractotecPatron`)
**Descripción breve:** Sitio web de Tractotec Servicios Generales, taller de Huancayo especializado en traccionamiento de chasis, fabricación industrial y mantenimiento de maquinaria pesada.
**Estado:** Producción (desplegado en Vercel) / mantenimiento evolutivo.
**Desarrollado por:** SoftNanTec.

## 2. Objetivo

### Objetivo principal

Captar solicitudes de cotización (principalmente por WhatsApp) mostrando servicios y trabajos reales del taller.

### Objetivos secundarios

- Posicionar en búsquedas locales ("traccionamiento de chasis Huancayo", etc.).
- Mostrar trabajos recientes actualizables sin tocar código (panel `/admin/proyectos`).

## 3. Problema que resuelve

- Problema: los clientes potenciales no encuentran evidencia del trabajo del taller ni un canal rápido de contacto.
- Usuarios afectados: empresas de transporte, mineras, constructoras y propietarios de camiones/maquinaria.
- Alternativa actual: boca a boca, WhatsApp directo. [POR DEFINIR: confirmar con el cliente]
- Valor: galería de trabajos reales + contacto inmediato por WhatsApp.

## 4. Usuarios objetivo

### Usuario principal

Responsable de flota o propietario de camión/maquinaria pesada en Junín y alrededores. [POR CONFIRMAR]

### Usuarios secundarios

- Administrador del taller (publica trabajos en el panel).

## 5. Alcance

### Incluido

- Páginas: Inicio, Servicios, Proyectos (por categoría), Nosotros, Contacto, 404.
- Formulario de contacto que compone un mensaje y abre WhatsApp (no almacena datos).
- Panel `/admin/proyectos` con login (Supabase Auth) para agregar/eliminar trabajos con imágenes.
- SEO técnico básico (metadatos por ruta, sitemap, robots, JSON-LD LocalBusiness).
- Vercel Web Analytics.

### Fuera de alcance

- Pagos, comercio electrónico, cuentas de clientes.
- Backend propio / API propia.
- Edición de los proyectos base desde el panel (se editan en `src/data/defaultProjects.js`).

## 6. Funcionalidades principales

| Funcionalidad | Descripción | Prioridad | Estado |
|---|---|---|---|
| Galería de proyectos | Filtro por categoría, galería con modal | Alta | Hecho |
| Contacto por WhatsApp | Formulario + enlaces directos | Alta | Hecho |
| Trabajos recientes | Destacados en la home | Media | Hecho |
| Panel admin | Login, alta y baja de trabajos, subida de imágenes | Media | Hecho (requiere configurar Supabase) |
| Política de privacidad | Página legal | Media | Pendiente de decisión |

## 7. Requisitos funcionales

- RF-001: Cualquier visitante puede ver servicios y proyectos sin registrarse.
- RF-002: El formulario de contacto valida nombre, servicio y descripción antes de abrir WhatsApp.
- RF-003: Solo un usuario autenticado puede crear o eliminar trabajos.
- RF-004: Los trabajos creados en el panel aparecen en `/proyectos` y, si son destacados, en la home.

## 8. Requisitos no funcionales

- RNF-001: Funcionar sin Supabase (solo proyectos base) si las variables no están configuradas.
- RNF-002: Imágenes subidas: JPG/PNG/WEBP, máx. 5 MB, máx. 10 por trabajo.
- RNF-003: Navegable con teclado; textos alternativos en imágenes.
- RNF-004: Responsive (móvil primero en uso real: WhatsApp).

## 9. Stack resumido

- Frontend: React 19 + Vite 7 + React Router 7 + Tailwind CSS 4.
- Backend: ninguno propio; Supabase (Postgres + Storage + Auth).
- Base de datos: Supabase Postgres (tabla `projects`).
- Infraestructura: Vercel.
- Servicios externos: WhatsApp (wa.me), Google Maps embed, Vercel Analytics.

Detalle en `ARCHITECTURE.md`.

## 10. Restricciones

- Mantenimiento por un equipo pequeño: priorizar simplicidad.
- Sin presupuesto definido para servicios de pago. [POR DEFINIR]

## 11. Prioridades

### Alta

- Configurar Supabase (RLS + usuario admin) para que el panel funcione en producción.
- Confirmar dominio canónico.

### Media

- Política de privacidad y aviso de cookies (Google Maps).
- Optimizar imágenes (WEBP, tamaños) – ver `ARCHITECTURE.md` deuda técnica.

### Baja

- Prerender/SSG para mejorar SEO de rutas internas.
- Tests básicos.

## 12. Roadmap

### Fase 1

Mejoras de esta revisión (bugs, seguridad del panel, SEO, accesibilidad, documentación).

### Fase 2

[POR DEFINIR] Legal (privacidad), optimización de imágenes, prerender.

### Fase 3

[POR DEFINIR]

## 13. Dependencias externas

| Servicio | Función | Criticidad |
|---|---|---|
| Vercel | Hosting + analytics | Alta |
| Supabase | Trabajos del panel, imágenes, login | Media |
| WhatsApp | Canal de contacto | Alta |
| Google Maps | Mapa embebido | Baja |

## 14. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| RLS mal configurado permite escritura anónima | Media | Alto | Seguir `SUPABASE_SETUP.md` y probar insert anónimo |
| Dominio canónico inconsistente | Media | Medio | Confirmar dominio y actualizar `SITE_URL`, index.html, sitemap, robots |
| Imágenes pesadas | Alta | Medio | Comprimir / convertir a WEBP |

## 15. Criterios de éxito

[POR DEFINIR] Ej.: número de contactos por WhatsApp desde la web al mes.

## 16. Decisiones pendientes

Ver `docs/README.md`.

## 17. Documentación relacionada

BUSINESS.md · ARCHITECTURE.md · SECURITY.md · DEPLOYMENT.md · ANALYTICS.md · SEO.md

## 18. Mantenimiento

Actualizar cuando cambien objetivos, alcance, funcionalidades, usuarios, roadmap, restricciones o prioridades.
