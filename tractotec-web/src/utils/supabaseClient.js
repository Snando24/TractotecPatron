import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

export function initSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  return supabase;
}

export async function fetchProjectsFromSupabase() {
  const client = initSupabase();

  if (!client) return null;

  try {
    const { data, error } = await client
      .from("projects")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch {
    return null;
  }
}

export async function saveProjectsToSupabase(projects) {
  const client = initSupabase();

  if (!client) return null;

  try {
    // Eliminar todos los proyectos nuevos (admin)
    const { error: deleteError } = await client
      .from("projects")
      .delete()
      .like("folder", "admin%");

    if (deleteError && deleteError.code !== "PGRST116") throw deleteError;

    // Insertar proyectos nuevos
    const newProjects = projects.filter((p) => p.folder.startsWith("admin/"));

    if (newProjects.length > 0) {
      const { error: insertError } = await client
        .from("projects")
        .insert(newProjects);

      if (insertError) throw insertError;
    }

    return projects;
  } catch {
    return null;
  }
}
