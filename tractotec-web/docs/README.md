# Documentación – TractoTec Web

Generada a partir de `PROJECT_BASE` (flujo `INITIALIZE_PROJECT.md`). Tipo de proyecto: **web corporativa**
con un panel de administración ligero (Supabase).

| Documento | Contenido |
| --- | --- |
| [PROJECT.md](PROJECT.md) | Objetivo, alcance, funcionalidades, roadmap |
| [BUSINESS.md](BUSINESS.md) | Datos del negocio (mayormente por confirmar) |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Stack, estructura, flujos de datos |
| [SECURITY.md](SECURITY.md) | Panel admin, Supabase RLS, headers, hallazgos |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel, variables, rollback |
| [SEO.md](SEO.md) | Indexación, metadatos, sitemap, datos estructurados |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | Estado WCAG y pendientes |
| [ANALYTICS.md](ANALYTICS.md) | Vercel Web Analytics |
| [PRIVACY.md](PRIVACY.md) | Datos tratados (formulario → WhatsApp) |
| [COOKIES.md](COOKIES.md) | Inventario (Google Maps embebido, Supabase Auth) |
| [LEGAL.md](LEGAL.md) | Documentos legales a evaluar |
| [COPYRIGHT_LICENSES.md](COPYRIGHT_LICENSES.md) | Imágenes, iconos, código |
| [adr/ADR-001-supabase-auth-admin.md](adr/ADR-001-supabase-auth-admin.md) | Decisión: autenticación del panel |

## Documentos no creados (y motivo)

- `API.md` / `DATA_MODEL.md` / `MIGRATIONS.md`: no hay backend propio; la única tabla está descrita en `ARCHITECTURE.md` y `SUPABASE_SETUP.md`.
- `CI_CD.md`: no hay pipeline; Vercel despliega al hacer push. Crear si se añaden checks.
- `TESTING.md`: no existen tests. Recomendado crear al añadir pruebas.
- `OBSERVABILITY.md`, `RUNBOOK.md`, `BACKUP_RECOVERY.md`, `INCIDENT_RESPONSE.md`: sitio no crítico; revisar si el panel admin pasa a ser operación diaria.
- `AI_INTEGRATION.md`: no hay IA generativa.
- `FORMS_CONSENT.md`: el único formulario no almacena datos (abre WhatsApp); cubierto en `PRIVACY.md`.

## Decisiones pendientes (resumen)

1. Confirmar dominio canónico: `www.tractotec.com` vs `tractotec.com`.
2. Confirmar coordenadas reales del taller (index.html usa -12.0651,-75.2049; el mapa apunta a ≈ -12.0463,-75.2234).
3. Confirmar razón social / RUC y si se publica en la web.
4. Confirmar cifras de `SITE_STATS` antes de mostrarlas (actualmente no se usan).
5. Decidir si se publica una política de privacidad y aviso de cookies (Google Maps).
6. Crear el usuario administrador en Supabase y aplicar las políticas RLS (`SUPABASE_SETUP.md`).
