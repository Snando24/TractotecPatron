/**
 * Carga dinámicamente todos los proyectos y sus imágenes
 * usando import.meta.glob de Vite
 */

export function loadProjects() {
  // Importar todas las imágenes recursivamente
  const imageModules = import.meta.glob(
    '/public/images/proyectos/**/*.{jpg,jpeg,png,webp}',
    { eager: false }
  );

  // Estructura base de proyectos
  const projectsStructure = {
    "Traccionamiento/traccionamiento_chasis": {
      title: "Traccionamiento de Chasis",
      category: "Traccionamiento",
      path: "Traccionamiento/traccionamiento_chasis",
    },
    "Traccionamiento/siniestros_chasis": {
      title: "Siniestros de chasis",
      category: "Siniestros de chasis",
      path: "Traccionamiento/siniestros_chasis",
    },
    "Traccionamiento/virado_chasis": {
      title: "Virado de Chasis",
      category: "Traccionamiento",
      path: "Traccionamiento/virado_chasis",
    },
    "Traccionamiento/reforzado_chasis": {
      title: "Reforzado de Chasis",
      category: "Traccionamiento",
      path: "Traccionamiento/reforzado_chasis",
    },
    "Traccionamiento/traccionamiento-cabinas": {
      title: "Traccionamiento Cabinas",
      category: "Traccionamiento",
      path: "Traccionamiento/traccionamiento-cabinas",
    },
    "pintura-industrial": {
      title: "Pintura Industrial",
      category: "Pintura Industrial",
      path: "pintura-industrial",
    },
    "reparacion-pistones": {
      title: "Reparación de Pistones",
      category: "Reparación Pistones",
      path: "reparacion-pistones",
    },
    "Fabricación/fabricacion_lampones": {
      title: "Fabricación de Lampones",
      category: "Fabricación",
      path: "Fabricación/fabricacion_lampones",
    },
    "Fabricación/fabricacion_tolvas": {
      title: "Fabricación de Tolvas",
      category: "Fabricación",
      path: "Fabricación/fabricacion_tolvas",
    },
    "Mantenimiento/auxilio-mecanico": {
      title: "Auxilio Mecánico",
      category: "Mantenimiento",
      path: "Mantenimiento/auxilio-mecanico",
    },
    "Mantenimiento/mantenimiento-maquinaria": {
      title: "Mantenimiento Maquinaria",
      category: "Mantenimiento",
      path: "Mantenimiento/mantenimiento-maquinaria",
    },
    "Mantenimiento/trabajos-mina": {
      title: "Trabajos en Mina",
      category: "Mantenimiento",
      path: "Mantenimiento/trabajos-mina",
    },
  };

  // Generar proyectos
  const projects = [];
  let id = 1;

  Object.entries(projectsStructure).forEach(([key, config]) => {
    // Buscar la primera imagen de esta carpeta
    const folderPath = `/public/images/proyectos/${config.path}`;
    const firstImage = Object.keys(imageModules)
      .filter((path) => path.startsWith(folderPath))
      .sort()[0];

    const imagePath = firstImage 
      ? firstImage.replace(/^\/public/, "") 
      : `/images/proyectos/${config.path}/img_1.jpeg`;

    projects.push({
      id: id++,
      title: config.title,
      category: config.category,
      image: imagePath,
      folder: config.path,
    });
  });

  return projects;
}

/**
 * Obtiene todas las imágenes de una carpeta específica
 */
export function getProjectImages(folderPath) {
  const imageModules = import.meta.glob(
    `/public/images/proyectos/**/*.{jpg,jpeg,png,webp}`,
    { eager: false }
  );

  return Object.keys(imageModules)
    .filter((path) => path.includes(folderPath))
    .map((path) => path.replace(/^\/public/, ""))
    .sort();
}
