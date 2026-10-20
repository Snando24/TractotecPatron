import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/seo/Seo";

function ServicesPage() {
  const navigate = useNavigate();

  const goToProjects = (slug) => {
    navigate(`/proyectos/${slug}`);
  };

  return (
    <div className="text-white">
      <Seo
        title="Servicios: Traccionamiento, Fabricación y Mantenimiento | TractoTec"
        description="Traccionamiento y enderezado de chasis, fabricación de tolvas y estructuras metálicas, mantenimiento y reparación de maquinaria pesada en Huancayo."
        path="/servicios"
      />

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
              type="button"
              onClick={() => goToProjects("traccionamiento-chasis")}
              className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Ver Proyectos
            </button>
          </div>

          <button
            type="button"
            onClick={() => goToProjects("traccionamiento-chasis")}
            aria-label="Ver proyectos"
            className="block w-full cursor-pointer bg-gray-900 h-80 rounded-lg border border-gray-800 overflow-hidden group"
          >
            <img
              src="/images/proyectos/Traccionamiento/virado_chasis/img_3.jpeg"
              alt="Chasis de camión en proceso de traccionamiento"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </button>

        </div>
      </section>

      {/* ================= FABRICACIÓN ================= */}
      <section className="bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <button
            type="button"
            onClick={() => goToProjects("fabricacion-industrial")}
            aria-label="Ver proyectos"
            className="block w-full cursor-pointer bg-gray-900 h-80 rounded-lg border border-gray-800 overflow-hidden group"
          >
            <img
              src="/images/proyectos/Fabricación/fabricacion_tolvas/img_7.jpeg"
              alt="Tolva metálica fabricada en taller"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </button>

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
              type="button"
              onClick={() => goToProjects("fabricacion-industrial")}
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
              type="button"
              onClick={() => goToProjects("mantenimiento-maquinaria")}
              className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Ver Proyectos
            </button>
          </div>

          <button
            type="button"
            onClick={() => goToProjects("mantenimiento-maquinaria")}
            aria-label="Ver proyectos"
            className="block w-full cursor-pointer bg-gray-900 h-80 rounded-lg border border-gray-800 overflow-hidden group"
          >
            <img
              src="/images/proyectos/Mantenimiento/mantenimiento-maquinaria/img_7.jpeg"
              alt="Mantenimiento de maquinaria pesada en taller"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </button>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-black via-red-900/20 to-black py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          ¿Necesitas una <span className="text-yellow-500">Solución Industrial</span>?
        </h2>

        <Link
          to="/contacto"
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md transition"
        >
          Solicitar Cotización
        </Link>
      </section>

    </div>
  );
}

export default ServicesPage;