# DEPLOYMENT.md

## 1. Entornos

- Local: `npm run dev` (Supabase opcional vía `.env.local`).
- Preview: despliegues de Vercel por rama/PR.
- Producción: Vercel, rama `main`. Dominio: [POR CONFIRMAR] `www.tractotec.com` / `tractotec.com`.

## 2. Infraestructura

Vercel (estáticos + CDN). Supabase (Postgres/Storage/Auth). Root directory del proyecto en Vercel: `tractotec-web` [POR CONFIRMAR].

## 3. Requisitos previos

Node.js compatible con Vite 7 (20.19+ o 22.12+).

## 4. Variables de entorno

`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_BUCKET` (Production y Preview). Son públicas; los cambios requieren redeploy.

## 5. Proceso de despliegue

1. `npm run lint && npm run build` en local.
2. Push a la rama → Vercel genera preview → revisar.
3. Merge a `main` → producción.

## 6. Rollback

Vercel → Deployments → "Promote to Production" sobre el despliegue anterior. Los datos de Supabase no se revierten con el rollback.

## 7. Migraciones

Cambios de esquema manuales en el SQL Editor de Supabase; registrar el SQL en `SUPABASE_SETUP.md`.

## 9. Verificaciones posteriores

- Rutas: `/`, `/servicios`, `/proyectos/traccionamiento-chasis`, `/contacto`, una ruta inexistente (404).
- `/robots.txt` y `/sitemap.xml` responden.
- Login en `/admin/proyectos`, alta y baja de un trabajo de prueba.
- Enlaces de WhatsApp abren con el número correcto.

## 10. Responsables

SoftNanTec. [POR DEFINIR] contacto del cliente con acceso a Vercel/Supabase.
