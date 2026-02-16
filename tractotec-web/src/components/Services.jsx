import { Wrench, Truck, Factory } from "lucide-react";

function Services() {
  const services = [
    {
      icon: <Factory size={40} />,
      title: "Fabricación Industrial",
      description:
        "Diseño y construcción de tolvas, carretas, cisternas y estructuras metálicas de alta resistencia.",
    },
    {
      icon: <Truck size={40} />,
      title: "Traccionamiento y Adaptaciones",
      description:
        "Sistemas de transmisión, refuerzos estructurales y soluciones mecánicas personalizadas.",
    },
    {
      icon: <Wrench size={40} />,
      title: "Mantenimiento y Reparación",
      description:
        "Reparación estructural, soldadura industrial y optimización de maquinaria pesada.",
    },
  ];

  return (
    <section
      id="servicios"
      className="relative py-24 text-white overflow-hidden"
    >
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* Luz roja industrial sutil */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl"></div>

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Separador superior */}
        <div className="w-full h-[2px] bg-red-600 mb-16"></div>

        {/* Título */}
        <h2 className="text-4xl font-bold mb-4">
          Nuestros <span className="text-red-600">Servicios</span>
        </h2>

        <div className="w-20 h-1 bg-red-600 mb-16"></div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800 hover:border-red-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >
              {/* Icono */}
              <div className="text-yellow-500 mb-6 group-hover:text-red-600 transition-colors duration-300">
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-semibold mb-4">
                {service.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
