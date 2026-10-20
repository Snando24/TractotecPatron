# Configuración de Supabase (trabajos del panel admin)

Los proyectos base del sitio viven en `src/data/defaultProjects.js` (imágenes en `public/images/proyectos/`).
Los trabajos que se agregan desde `/admin/proyectos` se guardan en Supabase:

- **Tabla `projects`** (Postgres) → datos del trabajo.
- **Bucket `project-images`** (Storage) → imágenes subidas.
- **Supabase Auth** → inicio de sesión del administrador.

> La `anon key` es pública por diseño (va en el bundle del navegador). La protección real
> la dan las **políticas RLS** de este documento. Nunca uses la `service_role` key en el frontend.

## 1. Crear el proyecto

1. https://supabase.com → nuevo proyecto (región más cercana a Perú disponible).
2. Guarda la contraseña de la base de datos en un gestor de contraseñas (no en el repositorio).

## 2. Tabla y políticas RLS

En **SQL Editor** ejecuta:

```sql
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('completado', 'en_progreso')),
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  image TEXT,
  folder TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Lectura pública (la web muestra los trabajos)
CREATE POLICY "projects_public_read" ON projects
  FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados (administradores)
CREATE POLICY "projects_admin_insert" ON projects
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "projects_admin_delete" ON projects
  FOR DELETE TO authenticated USING (true);
```

Si la tabla ya existía, ejecuta solo desde `ALTER TABLE`. Si antes se guardaron imágenes en
base64 dentro de `images`, conviene borrar esas filas y volver a cargarlas desde el panel.

## 3. Bucket de imágenes

1. **Storage → New bucket** → nombre `project-images`, marcado como **Public**.
2. En **SQL Editor**:

```sql
CREATE POLICY "images_admin_upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "images_admin_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images');
```

(Opcional) En la configuración del bucket limita el tamaño a 5 MB y los tipos a
`image/jpeg, image/png, image/webp`.

## 4. Usuario administrador

1. **Authentication → Providers → Email**: activo.
2. **Authentication → Sign In / Providers**: desactiva **Allow new users to sign up**
   (solo tú creas cuentas).
3. **Authentication → Users → Add user** → correo y contraseña robusta del administrador.

> Importante: con el registro público desactivado, "authenticated" equivale a "administrador".
> Si algún día se habilita el registro, hay que restringir las políticas (p. ej. por correo o rol).

## 5. Variables de entorno

**Settings → API**: copia *Project URL* y *anon public key*.

En Vercel → **Settings → Environment Variables** (y en `.env.local` para desarrollo):

| Variable | Valor |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | anon public key |
| `VITE_SUPABASE_BUCKET` | `project-images` (opcional, es el valor por defecto) |

Vuelve a desplegar para que Vite incluya las variables.

## 6. Verificación

1. Abre `/admin/proyectos` e inicia sesión con el usuario creado.
2. Agrega un trabajo con imágenes.
3. Abre `/proyectos` en otra ventana: el trabajo debe aparecer junto a los proyectos base.
4. Cierra sesión e intenta insertar desde la consola con la anon key: debe fallar (RLS).

Si Supabase no está configurado, la web funciona solo con los proyectos base y el panel
muestra "Panel no disponible".
