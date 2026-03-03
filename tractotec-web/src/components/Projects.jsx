import { useNavigate, Link } from "react-router-dom";

function ProjectsPreview() {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/proyectos?categoria=${encodeURIComponent(category)}`);
    window.scrollTo(0, 0);
  };

  const projects = [
    {
      title: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/virado_chasis/img_3.jpeg",
      category: "Traccionamiento",
    },
    {
      title: "Siniestros de chasis",
      image: "/images/proyectos/Traccionamiento/siniestros_chasis/img_1.jpeg",
      category: "Siniestros de chasis",
    },
    {
      title: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_7.jpeg",
      category: "Mantenimiento",
    },
    {
      title: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg",
      category: "Fabricación",
    },
    {
      title: "Pintura Industrial",
      image: "/images/proyectos/pintura-industrial/img_1.jpeg",
      category: "Pintura Industrial",
    },
    {
      title: "Reparación Pistones",
      image: "/images/proyectos/reparacion-pistones/img_1.jpeg",
      category: "Reparación Pistones",
    },
  ];

  return (
    <section className="relative py-28 text-white overflow-hidden bg-black">

      {/* Fondo industrial sutil */}
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

        {/* Grid adaptable elegante */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(project.category)}
              className="group cursor-pointer relative overflow-hidden rounded-xl border border-gray-800 hover:border-red-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >
              {/* Imagen */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 p-6 w-full">

                {/* Badge categoría */}
                <span className="text-xs uppercase tracking-wider text-red-500 font-semibold">
                  {project.category}
                </span>

                {/* Título */}
                <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Línea animada inferior */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Botón principal */}
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