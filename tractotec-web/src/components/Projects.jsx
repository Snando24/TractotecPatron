import { useNavigate, Link } from "react-router-dom";

function ProjectsPreview() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/proyectos");
    window.scrollTo(0, 0);
  };

  const projects = [
    {
      title: "Traccionamiento",
      image: "/images/proyectos/Traccionamiento/virado_chasis/img_3.jpeg",
    },
    {
      title: "Mantenimiento",
      image: "/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_7.jpeg",
    },
    {
      title: "Fabricación",
      image: "/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg",
    },
  ];

  return (
    <section className="bg-black py-24 text-white relative overflow-hidden">
      
      {/* Fondo sutil industrial */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Título */}
        <h2 className="text-4xl font-bold mb-4">
          Galería de <span className="text-red-600">Proyectos</span>
        </h2>

        <div className="w-20 h-1 bg-red-600 mb-16"></div>

        {/* Grid imágenes */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={handleNavigation}
              className="cursor-pointer relative group overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition-all duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300"></div>

              {/* Título centrado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Línea animada inferior */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Botón */}
        <div className="text-center">
          <Link
            to="/proyectos"
            onClick={() => window.scrollTo(0, 0)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
          >
            Ver todos los proyectos
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ProjectsPreview;