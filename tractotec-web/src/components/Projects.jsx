import { useNavigate, Link } from "react-router-dom";
import { getCategoryPreviews } from "../utils/projectsLoader";
import { useProjects } from "../hooks/useProjects";

function ProjectsPreview() {
  const navigate = useNavigate();
  const projects = getCategoryPreviews(useProjects());

  const handleNavigation = (slug) => {
    navigate(`/proyectos/${slug}`);
  };

  return (
    <section className="relative py-28 text-white overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">
            Galería de <span className="text-red-600">Proyectos</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mb-16">
          {projects.map((project) => (
            <button
              type="button"
              key={project.slug}
              onClick={() => handleNavigation(project.slug)}
              className="group text-left cursor-pointer relative overflow-hidden rounded-xl border border-gray-800 hover:border-red-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 p-6 w-full">
                <span className="text-xs uppercase tracking-wider text-red-500 font-semibold">
                  {project.category}
                </span>

                <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-600 group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/proyectos"
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
