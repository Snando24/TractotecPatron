# Configuración de Supabase para almacenamiento persistente en Vercel

## ¿Por qué Supabase?
Sin una base de datos en la nube, los trabajos que agregues al panel admin se pierden al desplegar. Supabase es una base de datos PostgreSQL gratis y fácil de usar.

## Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Regístrate con tu email
3. Crea un nuevo proyecto:
   - **Name:** tractotec
   - **Database password:** (guarda este password, lo necesitarás)
   - **Region:** Lima o la más cercana

## Paso 2: Crear la tabla de proyectos

Una vez en el proyecto:

1. Ve a **SQL Editor**
2. Ejecuta esta query:

```sql
CREATE TABLE projects (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  status TEXT NOT NULL,
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  image TEXT,
  folder TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Paso 3: Obtener las credenciales

1. Ve a **Settings → API**
2. Copia:
   - **Project URL** → será tu `VITE_SUPABASE_URL`
   - **anon public** → será tu `VITE_SUPABASE_ANON_KEY`

## Paso 4: Configurar en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings → Environment Variables**
3. Agrega:
   - **Name:** `VITE_SUPABASE_URL` → **Value:** [pega el Project URL]
   - **Name:** `VITE_SUPABASE_ANON_KEY` → **Value:** [pega la anon public key]

## Paso 5: Hacer push y desplegar

```bash
git add .
git commit -m "Integrate Supabase for persistent storage"
git push
```

Vercel desplegará automáticamente. ¡Listo!

## Cómo verificar que funciona

1. Abre tu web en producción
2. Ve a `/admin/proyectos`
3. Agrega un trabajo
4. Recarga la página
5. El trabajo debe seguir allí (ahora está en Supabase)

## Notas
- Los proyectos proyectos antiguos seguirán en el archivo de configuración
- Solo los trabajos nuevos se guardan en Supabase
- Si Supabase no está configurado, fallback a localStorage (funciona solo en local)
