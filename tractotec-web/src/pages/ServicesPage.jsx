import { useNavigate } from "react-router-dom";

function ServicesPage() {
  const navigate = useNavigate();

  const goToProjects = (categoria) => {
    navigate(`/proyectos?categoria=${encodeURIComponent(categoria)}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="text-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            Soluciones <span className="text-red-600">Industriales</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Servicios especializados en maquinaria pesada y estructuras metálicas.
          </p>
        </div>
      </section>

      {/* ================= TRACCIONAMIENTO ================= */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Traccionamiento <span className="text-yellow-500">Industrial</span>
            </h2>

            <ul className="space-y-4 text-gray-400">
              <li>• Sistemas de transmisión industrial</li>
              <li>• Refuerzos estructurales</li>
              <li>• Adaptaciones mecánicas personalizadas</li>
              <li>• Integración hidráulica</li>
            </ul>

            <button
              onClick={() => goToProjects("Traccionamiento")}
              className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Ver Proyectos
            </button>
          </div>

          <div
            onClick={() => goToProjects("Traccionamiento")}
            className="cursor-pointer bg-gray-900 h-80 rounded-lg border border-gray-800 overflow-hidden group"
          >
            <img
              src="/images/proyectos/Traccionamiento/virado_chasis/img_3.jpeg"
              alt="Traccionamiento"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

        </div>
      </section>

      {/* ================= FABRICACIÓN ================= */}
      <section className="bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div
            onClick={() => goToProjects("Fabricación")}
            className="cursor-pointer bg-gray-900 h-80 rounded-lg border border-gray-800 overflow-hidden group"
          >
            <img
              src="/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg"
              alt="Fabricación"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Fabricación <span className="text-yellow-500">Industrial</span>
            </h2>

            <ul className="space-y-4 text-gray-400">
              <li>• Tolvas mineras y agrícolas</li>
              <li>• Carretas reforzadas</li>
              <li>• Cisternas industriales</li>
              <li>• Plataformas estructurales</li>
              <li>• Diseños personalizados</li>
            </ul>

            <button
              onClick={() => goToProjects("Fabricación")}
              className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Ver Proyectos
            </button>
          </div>

        </div>
      </section>

      {/* ================= MANTENIMIENTO ================= */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Mantenimiento y <span className="text-yellow-500">Reparación</span>
            </h2>

            <ul className="space-y-4 text-gray-400">
              <li>• Soldadura industrial especializada</li>
              <li>• Reparación estructural</li>
              <li>• Optimización de maquinaria pesada</li>
              <li>• Inspección técnica preventiva</li>
            </ul>

            <button
              onClick={() => goToProjects("Mantenimiento")}
              className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Ver Proyectos
            </button>
          </div>

          <div
            onClick={() => goToProjects("Mantenimiento")}
            className="cursor-pointer bg-gray-900 h-80 rounded-lg border border-gray-800 overflow-hidden group"
          >
            <img
              src="/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_7.jpeg"
              alt="Mantenimiento"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-black via-red-900/20 to-black py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          ¿Necesitas una <span className="text-yellow-500">Solución Industrial</span>?
        </h2>

        <a
          href="/contacto"
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md transition"
        >
          Solicitar Cotización
        </a>
      </section>

    </div>
  );
}

export default ServicesPage;