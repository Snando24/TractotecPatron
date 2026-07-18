import { fetchProjectsFromSupabase, saveProjectsToSupabase } from "./supabaseClient";

const STORAGE_KEY = "tractotec-admin-projects";

export async function getStoredProjects() {
  if (typeof window === "undefined") return null;

  // Intentar cargar desde Supabase primero
  try {
    const supabaseProjects = await fetchProjectsFromSupabase();
    if (supabaseProjects !== null && supabaseProjects.length > 0) {
      return supabaseProjects;
    }
  } catch {
    // Si falla Supabase, continuar con localStorage
  }

  // Fallback a localStorage
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveProjectsToStorage(projects) {
  if (typeof window === "undefined") return;

  // Intentar guardar en Supabase primero
  try {
    const saved = await saveProjectsToSupabase(projects);
    if (saved !== null) {
      return;
    }
  } catch {
    // Si falla Supabase, usar localStorage como fallback
  }

  // Fallback a localStorage
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // Silenciar error
  }
}
