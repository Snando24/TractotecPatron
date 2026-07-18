import { Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "../utils/projectsLoader";
import { PROJECT_STATUS, WHATSAPP_NUMBER } from "../constants/projects";
import { formatDateRelative, formatDateShort } from "../utils/dateUtils";

function RecentWork() {
  const navigate = useNavigate();
  const projects = getFeaturedProjects(4);

  const handleNavigation = (slug) => {
    navigate(`/proyectos/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <section id="trabajos-recientes" className="relative py-28 text-white overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3">
              En el taller
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Trabajos <span className="text-red-600">Recientes</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mt-6" />
            <p className="text-gray-400 mt-6 max-w-2xl">
              Conoce los proyectos que estamos ejecutando y los trabajos
              recientemente finalizados en nuestro taller de Huancayo.
            </p>
          </div>

          <Link
            to="/proyectos?filtro=recientes"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition shrink-0"
          >
            Ver todos los proyectos
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const status = PROJECT_STATUS[project.status];

            return (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-xl border border-gray-800 hover:border-red-600 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/10 bg-gray-900/40"
              >
                <div className="grid sm:grid-cols-[220px_1fr]">
                  <button
                    type="button"
                    onClick={() => handleNavigation(project.slug)}
                    className="relative h-48 sm:h-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-black/20" />
                  </button>

                  <div className="p-6 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${status.className}`}
                      >
                        {status.label}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-red-500 font-semibold">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={15} className="text-yellow-500" />
                        <span title={formatDateShort(project.date)}>
                          {formatDateRelative(project.date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleNavigation(project.slug)}
                          className="text-sm text-gray-300 hover:text-white transition"
                        >
                          Ver galería
                        </button>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola TractoTec, vi su trabajo de "${project.title}" y me gustaría solicitar una cotización.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-yellow-500 hover:text-yellow-400 font-semibold transition"
                        >
                          Cotizar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RecentWork;
