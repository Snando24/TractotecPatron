import {
  CATEGORY_ORDER,
  CATEGORY_SLUG_MAP,
} from "../constants/projects";
import { getStoredProjects } from "./projectAdminStorage";

function normalizeProject(project) {
  return {
    ...project,
    slug: CATEGORY_SLUG_MAP[project.category],
  };
}

export function loadProjects() {
  const storedProjects = getStoredProjects();

  if (storedProjects && storedProjects.length > 0) {
    return storedProjects.map(normalizeProject);
  }

  return [
    {
      id: 1,
      title: "Traccionamiento de Chasis",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/traccionamiento_chasis/img_1.jpeg",
      folder: "Traccionamiento/traccionamiento_chasis",
      date: "2026-07-05",
      status: "completado",
      summary: "Enderezado y alineación estructural de chasis para camión de carga pesada.",
      featured: true,
    },
    {
      id: 2,
      title: "Siniestros de Chasis",
      category: "Siniestros de chasis",
      image: "/images/proyectos/Traccionamiento/siniestros_chasis/img_1.jpeg",
      folder: "Traccionamiento/siniestros_chasis",
      date: "2026-07-15",
      status: "en_progreso",
      summary: "Recuperación estructural de chasis tras accidente vial. Trabajo en fase de alineación final.",
      featured: true,
    },
    {
      id: 3,
      title: "Virado de Chasis",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/virado_chasis/img_1.jpeg",
      folder: "Traccionamiento/virado_chasis",
      date: "2026-06-20",
      status: "completado",
      summary: "Virado y corrección de deformación en chasis de maquinaria pesada.",
      featured: false,
    },
    {
      id: 4,
      title: "Reforzado de Chasis",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/reforzado_chasis/img_1.jpeg",
      folder: "Traccionamiento/reforzado_chasis",
      date: "2026-06-12",
      status: "completado",
      summary: "Refuerzo estructural de chasis para incrementar capacidad de carga.",
      featured: false,
    },
    {
      id: 5,
      title: "Traccionamiento Cabinas",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/traccionamiento-cabinas/img_1.jpeg",
      folder: "Traccionamiento/traccionamiento-cabinas",
      date: "2026-05-28",
      status: "completado",
      summary: "Alineación y traccionamiento de cabina sobre chasis de camión articulado.",
      featured: false,
    },
    {
      id: 6,
      title: "Pintura Industrial",
      category: "Pintura Industrial",
      image: "/images/proyectos/pintura-industrial/img_1.jpeg",
      folder: "pintura-industrial",
      date: "2026-06-18",
      status: "completado",
      summary: "Pintura anticorrosiva y acabado industrial para equipos de maquinaria pesada.",
      featured: false,
    },
    {
      id: 7,
      title: "Reparación de Pistones",
      category: "Reparación Pistones",
      image: "/images/proyectos/reparacion-pistones/img_1.jpeg",
      folder: "reparacion-pistones",
      date: "2026-06-02",
      status: "completado",
      summary: "Rectificado y reconstrucción de pistones hidráulicos para excavadoras.",
      featured: false,
    },
    {
      id: 8,
      title: "Fabricación de Tolvas",
      category: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg",
      folder: "Fabricación/fabricacion_tolvas",
      date: "2026-07-10",
      status: "completado",
      summary: "Fabricación de tolva metálica a medida para transporte de agregados.",
      featured: true,
    },
    {
      id: 9,
      title: "Fabricación de Lampones",
      category: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_lampones/img_1.jpeg",
      folder: "Fabricación/fabricacion_lampones",
      date: "2026-05-15",
      status: "completado",
      summary: "Fabricación de lampones estructurales para equipos de construcción.",
      featured: false,
    },
    {
      id: 10,
      title: "Auxilio Mecánico",
      category: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/auxilio-mecanico/img_1.jpeg",
      folder: "Mantenimiento/auxilio-mecanico",
      date: "2026-06-25",
      status: "completado",
      summary: "Atención de auxilio mecánico en campo para maquinaria varada.",
      featured: false,
    },
    {
      id: 11,
      title: "Mantenimiento Maquinaria",
      category: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_1.jpeg",
      folder: "Mantenimiento/mantenimiento-maquinaria",
      date: "2026-06-28",
      status: "completado",
      summary: "Mantenimiento preventivo y correctivo de maquinaria pesada en taller.",
      featured: true,
    },
    {
      id: 12,
      title: "Trabajos en Mina",
      category: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/trabajos-mina/img_1.jpeg",
      folder: "Mantenimiento/trabajos-mina",
      date: "2026-05-08",
      status: "completado",
      summary: "Reparación y mantenimiento de equipos mineros en sitio de operación.",
      featured: false,
    },
  ].map(normalizeProject);
}

export function getFeaturedProjects(limit = 4) {
  return loadProjects()
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export function getRecentProjects(limit) {
  return [...loadProjects()]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export function getCategoryPreviews() {
  const projects = loadProjects();

  return CATEGORY_ORDER.map((category) => {
    const project =
      projects.find((item) => item.category === category && item.featured) ||
      projects.find((item) => item.category === category);

    if (!project) return null;

    return {
      title: category,
      image: project.image,
      category,
      slug: project.slug,
    };
  }).filter(Boolean);
}

export function getProjectImages(folderPath) {
  const imageModules = import.meta.glob(
    "/public/images/proyectos/**/*.{jpg,jpeg,png,webp}",
    { eager: true }
  );

  const folder = `/public/images/proyectos/${folderPath}/`;

  return Object.keys(imageModules)
    .filter((path) => path.startsWith(folder))
    .map((path) => path.replace(/^\/public/, ""))
    .sort();
}
