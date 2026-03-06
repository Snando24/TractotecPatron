export function loadProjects() {

  return [
    {
      id: 1,
      title: "Traccionamiento de Chasis",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/traccionamiento_chasis/img_1.jpeg",
      folder: "Traccionamiento/traccionamiento_chasis"
    },

    {
      id: 2,
      title: "Siniestros de Chasis",
      category: "Siniestros de chasis",
      image: "/images/proyectos/Traccionamiento/siniestros_chasis/img_1.jpeg",
      folder: "Traccionamiento/siniestros_chasis"
    },

    {
      id: 3,
      title: "Virado de Chasis",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/virado_chasis/img_1.jpeg",
      folder: "Traccionamiento/virado_chasis"
    },

    {
      id: 4,
      title: "Reforzado de Chasis",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/reforzado_chasis/img_1.jpeg",
      folder: "Traccionamiento/reforzado_chasis"
    },

    {
      id: 5,
      title: "Traccionamiento Cabinas",
      category: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/traccionamiento-cabinas/img_1.jpeg",
      folder: "Traccionamiento/traccionamiento-cabinas"
    },

    {
      id: 6,
      title: "Pintura Industrial",
      category: "Pintura Industrial",
      image: "/images/proyectos/pintura-industrial/img_1.jpeg",
      folder: "pintura-industrial"
    },

    {
      id: 7,
      title: "Reparación de Pistones",
      category: "Reparación Pistones",
      image: "/images/proyectos/reparacion-pistones/img_1.jpeg",
      folder: "reparacion-pistones"
    },
    {
      id: 8,
      title: "Fabricación de Tolvas",
      category: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg",
      folder: "Fabricación/fabricacion_tolvas"
    },
    
    {
      id: 9,
      title: "Fabricación de Lampones",
      category: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_lampones/img_1.jpeg",
      folder: "Fabricación/fabricacion_lampones"
    },



    {
      id: 10,
      title: "Auxilio Mecánico",
      category: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/auxilio-mecanico/img_1.jpeg",
      folder: "Mantenimiento/auxilio-mecanico"
    },

    {
      id: 11,
      title: "Mantenimiento Maquinaria",
      category: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_1.jpeg",
      folder: "Mantenimiento/mantenimiento-maquinaria"
    },

    {
      id: 12,
      title: "Trabajos en Mina",
      category: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/trabajos-mina/img_1.jpeg",
      folder: "Mantenimiento/trabajos-mina"
    }
  ];
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