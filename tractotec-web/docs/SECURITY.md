# SECURITY.md

## 1. Alcance

SPA pública en Vercel + proyecto Supabase (tabla `projects`, bucket `project-images`, Auth).

## 2. Activos críticos

| Activo | Sensibilidad | Propietario | Riesgo |
|---|---|---|---|
| Cuenta admin de Supabase Auth | Alta | Administrador del taller | Publicación/eliminación de contenido |
| Dashboard de Supabase / Vercel | Alta | SoftNanTec | Control total |
| Tabla `projects` / bucket | Media | Administrador | Defacement, abuso de almacenamiento |

## 3. Modelo de amenazas (resumen)

- Actores: visitantes anónimos, bots, atacante con la anon key (pública).
- Superficie: `/admin/proyectos`, API REST/Storage de Supabase, formulario de contacto (solo cliente).
- Límite de confianza: el navegador. Todo control de escritura debe estar en RLS.

## 4. Autenticación

- Supabase Auth (email + contraseña). Registro público **desactivado**.
- Política de contraseñas / MFA: [POR DEFINIR] (recomendado activar MFA TOTP).
- Rate limiting: el que aplica Supabase Auth por defecto.

## 5. Autorización

- RLS: `SELECT` público; `INSERT`/`DELETE` solo `authenticated`. Storage: subida/borrado solo `authenticated`.
- Si se habilita el registro en el futuro, restringir por rol/correo (si no, cualquier usuario registrado podría escribir).

## 7. Validación de entrada

- Formulario de contacto: validación y `maxLength` en cliente; el texto solo se envía a wa.me (codificado).
- Panel: título/descripción con `maxLength`; imágenes JPG/PNG/WEBP ≤ 5 MB, ≤ 10 por trabajo (también limitar en la config del bucket).
- XSS: React escapa el contenido; no se usa `dangerouslySetInnerHTML`.

## 9. Headers de seguridad (`vercel.json`)

Aplicados: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`. HSTS lo gestiona Vercel en dominios propios.
Pendiente: `Content-Security-Policy` (requiere permitir Supabase, Google Maps, Vercel Analytics; probar antes en modo report-only).

## 10. Secretos

- No hay secretos en el repositorio. `.env*` ignorados salvo `.env.example`.
- La anon key de Supabase es pública por diseño. **Nunca** usar la `service_role` key en el frontend.

## 17. Hallazgos de esta revisión

| ID | Severidad | Hallazgo | Estado | Mitigación |
|---|---|---|---|---|
| SEC-001 | Alta | Contraseña del panel hardcodeada en el bundle (`AdminProjectsPage.jsx`) y en el historial git. | Cerrado en código | Reemplazado por Supabase Auth. La contraseña antigua debe considerarse pública: no reutilizarla en ningún servicio. |
| SEC-002 | Alta | La escritura en Supabase dependía solo del frontend; con la anon key cualquiera podía insertar/borrar si no había RLS. | Pendiente de configuración | Aplicar RLS de `SUPABASE_SETUP.md` y verificar que un INSERT anónimo falle. |
| SEC-003 | Media | Imágenes guardadas como base64 en la tabla (riesgo de abuso y filas enormes). | Cerrado en código | Subida a Supabase Storage con validación de tipo/tamaño. |
| SEC-004 | Baja | `public/branding/BrandIdentity.jsx` publicaba código fuente como estático. | Cerrado | Eliminado. |
| SEC-005 | Baja | `api/projects/route.js` dependía de `@vercel/kv` no instalado y aceptaba `PUT` sin autenticación. | Cerrado | Eliminado (no se usaba). |
| SEC-006 | Baja | Panel indexable por buscadores. | Cerrado | `noindex` en la ruta + `Disallow: /admin/` en robots.txt. |
| SEC-007 | Media | Sin CSP. | Abierto | Ver sección 9. |

## 18. Checklist

- [x] No hay secretos expuestos en el código actual.
- [x] Inputs validados (cliente).
- [ ] Autorización servidor-side verificada (RLS) – depende de la configuración de Supabase.
- [x] Headers básicos revisados.
- [ ] CSP.
- [ ] Dependencias auditadas (`npm audit`) – no ejecutado en esta revisión (sin acceso al registro).
