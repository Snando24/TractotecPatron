import { useEffect, useState } from "react";
import { BASE_PROJECTS, mergeProjects } from "../utils/projectsLoader";
import { fetchProjects, isSupabaseConfigured } from "../utils/supabaseClient";

let cache = null;
let pending = null;

function loadRemote() {
  if (!isSupabaseConfigured()) return Promise.resolve(BASE_PROJECTS);
  if (!pending) {
    pending = fetchProjects()
      .then((remote) => {
        cache = mergeProjects(remote);
        return cache;
      })
      .catch(() => {
        pending = null;
        return BASE_PROJECTS;
      });
  }
  return pending;
}

/** Invalida la caché tras crear o eliminar trabajos desde el panel. */
export function invalidateProjectsCache() {
  cache = null;
  pending = null;
}

/**
 * Devuelve los proyectos del sitio. Muestra de inmediato los proyectos base
 * y luego añade los trabajos guardados en Supabase.
 */
export function useProjects() {
  const [projects, setProjects] = useState(cache ?? BASE_PROJECTS);

  useEffect(() => {
    let active = true;
    loadRemote().then((result) => {
      if (active) setProjects(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return projects;
}
