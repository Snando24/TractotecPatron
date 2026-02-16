import { Factory, Truck, Cog } from "lucide-react";

function Projects() {
  const projects = [
    {
      icon: <Factory size={60} />,
      title: "Fabricación de Tolva Minera",
    },
    {
      icon: <Truck size={60} />,
      title: "Carreta Agrícola Reforzada",
    },
    {
      icon: <Cog size={60} />,
      title: "Sistema de Traccionamiento Industrial",
    },
  ];

  return (
    <section id="proyectos" className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Separador */}
        <div className="w-full h-[2px] bg-red-600 mb-16"></div>

        {/* Título */}
        <h2 className="text-4xl font-bold mb-4">
          Nuestros <span className="text-red-600">Proyectos</span>
        </h2>

        <div className="w-20 h-1 bg-red-600 mb-16"></div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gray-900 border border-gray-800 rounded-lg p-10 text-center hover:border-red-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >
              {/* Icono */}
              <div className="text-yellow-500 mb-6 group-hover:text-red-600 transition-colors duration-300 flex justify-center">
                {project.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-semibold mb-4">
                {project.title}
              </h3>

              {/* Badge */}
              <span className="text-xs uppercase tracking-wider bg-red-600/20 text-red-600 px-3 py-1 rounded-full">
                Proyecto Referencial
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;
