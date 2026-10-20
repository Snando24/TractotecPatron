# ADR-001: Autenticación del panel admin con Supabase Auth + RLS

**Estado:** Aceptado · **Fecha:** 2026-10-19

## Contexto

El panel `/admin/proyectos` validaba una contraseña fija en el código del frontend (visible en el bundle y en el historial git) y escribía en Supabase con la anon key. Cualquiera podía leer la contraseña o, sin RLS, escribir directamente en la tabla. Además las imágenes se guardaban como base64 en la tabla, y la web pública nunca mostraba los trabajos de Supabase porque `loadProjects()` trataba como síncrona una función asíncrona.

## Decisión

- Login con Supabase Auth (email + contraseña), registro público desactivado.
- Políticas RLS: lectura pública, escritura solo `authenticated`.
- Imágenes en Supabase Storage (bucket público `project-images`), solo URLs en la tabla.
- Lectura en la web mediante `useProjects()` (base + Supabase, asíncrono).

## Alternativas consideradas

- **Función serverless en Vercel con secreto en variable de entorno:** más código y mantenimiento (backend propio).
- **Mantener contraseña en frontend:** inseguro por diseño.

## Consecuencias positivas

Sin secretos en el frontend; la autorización se aplica en el servidor (Postgres RLS); imágenes servidas por CDN.

## Consecuencias negativas

Requiere configuración manual en Supabase (SQL, bucket, usuario). Sin configurar, el panel no funciona.

## Riesgos

Si alguien habilita el registro público, todo usuario registrado podría escribir → ajustar políticas.

## Migración

Ejecutar SQL de `SUPABASE_SETUP.md`; borrar filas antiguas con imágenes base64 y recargarlas desde el panel.

## Reversibilidad

Alta: el panel es independiente del resto del sitio.
