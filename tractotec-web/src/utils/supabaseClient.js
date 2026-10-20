import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || "project-images";
const TABLE = "projects";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

let supabase = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseKey);
}

export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!supabase) supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

function requireClient() {
  const client = getSupabase();
  if (!client) throw new Error("Supabase no está configurado.");
  return client;
}

/* ---------- Lectura pública ---------- */

export async function fetchProjects() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from(TABLE)
    .select("id, title, category, summary, status, date, featured, image, folder, images")
    .order("date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/* ---------- Autenticación (Supabase Auth) ---------- */

export async function signIn(email, password) {
  const { error } = await requireClient().auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  await requireClient().auth.signOut();
}

export async function getSession() {
  const client = getSupabase();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session;
}

export function onAuthChange(callback) {
  const client = getSupabase();
  if (!client) return () => {};
  const { data } = client.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

/* ---------- Escritura (requiere sesión + políticas RLS) ---------- */

export function validateImage(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `${file.name}: formato no permitido (usa JPG, PNG o WEBP).`;
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `${file.name}: supera el máximo de 5 MB.`;
  }
  return null;
}

export async function uploadProjectImages(projectId, files) {
  const client = requireClient();
  const urls = [];

  for (const [index, file] of files.entries()) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${projectId}/${index + 1}.${ext}`;

    const { error } = await client.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;

    urls.push(client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return urls;
}

export async function createProject(project) {
  const { data, error } = await requireClient()
    .from(TABLE)
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(project) {
  const client = requireClient();

  const { error } = await client.from(TABLE).delete().eq("id", project.id);
  if (error) throw error;

  // Limpieza de imágenes en Storage (no bloquea si falla)
  const prefix = `/storage/v1/object/public/${BUCKET}/`;
  const paths = (project.images ?? [])
    .map((url) => (url.includes(prefix) ? url.split(prefix)[1] : null))
    .filter(Boolean);
  if (paths.length) await client.storage.from(BUCKET).remove(paths);
}
