import projectImages from "virtual:project-images";
import { CATEGORY_ORDER, CATEGORY_SLUG_MAP } from "../constants/projects";
import { DEFAULT_PROJECTS } from "../data/defaultProjects";

export function normalizeProject(project) {
  return {
    ...project,
    images: Array.isArray(project.images) ? project.images : [],
    slug: CATEGORY_SLUG_MAP[project.category],
  };
}

export const BASE_PROJECTS = DEFAULT_PROJECTS.map(normalizeProject);

/** Une proyectos remotos (Supabase) con los proyectos base, sin duplicar ids. */
export function mergeProjects(remoteProjects = []) {
  const remote = remoteProjects.map(normalizeProject);
  const remoteIds = new Set(remote.map((p) => p.id));
  return [...remote, ...BASE_PROJECTS.filter((p) => !remoteIds.has(p.id))];
}

const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

export function sortByDate(projects) {
  return [...projects].sort(byDateDesc);
}

export function getFeaturedProjects(projects, limit = 4) {
  return sortByDate(projects.filter((p) => p.featured)).slice(0, limit);
}

export function getRecentProjects(projects, limit) {
  return sortByDate(projects).slice(0, limit);
}

export function getCategoryPreviews(projects) {
  return CATEGORY_ORDER.map((category) => {
    const project =
      projects.find((p) => p.category === category && p.featured) ||
      projects.find((p) => p.category === category);

    if (!project) return null;

    return {
      title: category,
      image: project.image,
      category,
      slug: project.slug,
    };
  }).filter(Boolean);
}

/**
 * Imágenes de un proyecto: las subidas desde el panel (project.images)
 * o las encontradas en public/images/proyectos/<folder>/.
 */
export function getProjectImages(project) {
  if (project.images?.length) return project.images;
  if (!project.folder) return [];

  const prefix = `/images/proyectos/${project.folder}/`;
  return projectImages.filter((src) => src.startsWith(prefix));
}
