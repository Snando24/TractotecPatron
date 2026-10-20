# TractoTec – Web corporativa

Sitio web de **Tractotec Servicios Generales** (Huancayo, Perú): traccionamiento de chasis,
fabricación industrial y mantenimiento de maquinaria pesada. Desarrollado por SoftNanTec.

## Stack

React 19 · Vite 7 · React Router 7 · Tailwind CSS 4 · Supabase (trabajos del panel admin) ·
Vercel (hosting + Web Analytics).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # opcional: solo para probar el panel admin
npm run dev
```

| Script | Uso |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | ESLint |

## Estructura

- `src/pages/` – páginas por ruta.
- `src/components/` – secciones y layout (`seo/Seo.jsx` define title/description/canonical por ruta).
- `src/data/defaultProjects.js` – proyectos base.
- `src/hooks/useProjects.js` – combina proyectos base + trabajos de Supabase.
- `public/images/proyectos/<carpeta>/` – fotos de cada proyecto base (se listan en build con el
  módulo virtual `virtual:project-images` definido en `vite.config.js`).

### Agregar un proyecto base

1. Copia las fotos a `public/images/proyectos/<Categoria>/<carpeta>/`.
2. Agrega una entrada en `src/data/defaultProjects.js` con `folder: "<Categoria>/<carpeta>"`.

### Agregar un trabajo sin tocar código

Usa `/admin/proyectos` (requiere Supabase, ver `SUPABASE_SETUP.md`).

## Documentación

Ver `docs/` (generada a partir de PROJECT_BASE).
