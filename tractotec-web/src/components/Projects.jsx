import { useNavigate, Link } from "react-router-dom";

function ProjectsPreview() {
  const navigate = useNavigate();

  const handleNavigation = (slug) => {
    navigate(`/proyectos/${slug}`);
    window.scrollTo(0, 0);
  };

  const projects = [
    {
      title: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/virado_chasis/img_3.jpeg",
      category: "Traccionamiento",
      slug: "traccionamiento-chasis",
    },
    {
      title: "Siniestros de chasis",
      image: "/images/proyectos/Traccionamiento/siniestros_chasis/img_1.jpeg",
      category: "Siniestros de chasis",
      slug: "siniestros-chasis",
    },
    {
      title: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_7.jpeg",
      category: "Mantenimiento",
      slug: "mantenimiento-maquinaria",
    },
    {
      title: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg",
      category: "Fabricación",
      slug: "fabricacion-industrial",
    },
    {
      title: "Pintura Industrial",
      image: "/images/proyectos/pintura-industrial/img_1.jpeg",
      category: "Pintura Industrial",
      slug: "pintura-industrial",
    },
    {
      title: "Reparación Pistones",
      image: "/images/proyectos/reparacion-pistones/img_1.jpeg",
      category: "Reparación Pistones",
      slug: "reparacion-pistones",
    },
  ];

  return (
    <section className="relative py-28 text-white overflow-hidden bg-black">

      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Encabezado */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">
            Galería de <span className="text-red-600">Proyectos</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mt-6"></div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mb-16">

          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(project.slug)}
              className="group cursor-pointer relative overflow-hidden rounded-xl border border-gray-800 hover:border-red-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >

              {/* Imagen */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Contenido */}
              <div className="absolute bottom-0 p-6 w-full">

                <span className="text-xs uppercase tracking-wider text-red-500 font-semibold">
                  {project.category}
                </span>

                <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h3>

              </div>

              {/* Línea animada */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 group-hover:w-full transition-all duration-500"></div>

            </div>
          ))}

        </div>

        {/* Botón */}
        <div className="text-center">
          <Link
            to="/proyectos"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-md font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
          >
            Ver todos los proyectos
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ProjectsPreview;