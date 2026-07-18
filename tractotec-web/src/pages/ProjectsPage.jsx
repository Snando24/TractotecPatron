import { useState, useMemo, useEffect } from "react";
import { loadProjects, getProjectImages } from "../utils/projectsLoader";
import ImageModal from "../components/ImageModal";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import {
  CATEGORY_ORDER,
  CATEGORY_SLUG_MAP,
  SLUG_CATEGORY_MAP,
  PROJECT_STATUS,
} from "../constants/projects";
import { formatDateShort } from "../utils/dateUtils";

function ProjectsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = useMemo(() => loadProjects(), []);

  useEffect(() => {
    const categoriaURL = searchParams.get("categoria");
    const filtroURL = searchParams.get("filtro");

    if (filtroURL === "recientes") {
      setSelectedCategory("Recientes");
      return;
    }

    if (categoriaURL) {
      setSelectedCategory(categoriaURL);
    }
  }, [searchParams]);

  useEffect(() => {
    if (slug && SLUG_CATEGORY_MAP[slug]) {
      setSelectedCategory(SLUG_CATEGORY_MAP[slug]);
    }
  }, [slug]);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    const ordered = CATEGORY_ORDER.filter((cat) => cats.has(cat));
    return ["Recientes", "Todos", ...ordered];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Recientes") {
      return [...projects].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    if (selectedCategory === "Todos") {
      return projects;
    }

    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "Recientes") {
      navigate("/proyectos?filtro=recientes");
      return;
    }

    const categorySlug = CATEGORY_SLUG_MAP[category];

    if (categorySlug) {
      navigate(`/proyectos/${categorySlug}`);
    } else {
      navigate("/proyectos");
    }
  };

  const showCategoryGallery =
    selectedCategory !== "Todos" && selectedCategory !== "Recientes";

  return (
    <div className="text-white">
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Galería de <span className="text-red-600">Proyectos</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto px-6">
          Experiencia real en maquinaria pesada, traccionamiento de chasis y
          estructuras industriales en Huancayo.
        </p>
      </section>

      <section className="bg-black py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-md border transition ${
                selectedCategory === category
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-gray-700 hover:border-red-600 text-gray-300 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {!showCategoryGallery ? (
        <section className="bg-black py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const status = PROJECT_STATUS[project.status];

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleCategoryChange(project.category)}
                  className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition cursor-pointer text-left"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="absolute bottom-0 p-6 w-full">
                    <p className="text-xs text-gray-400 mb-2">
                      {formatDateShort(project.date)}
                    </p>

                    <h3 className="text-lg font-semibold text-yellow-500">
                      {project.title}
                    </h3>

                    <span className="text-xs uppercase tracking-wider text-gray-300">
                      {project.category}
                    </span>

                    {project.summary && (
                      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                        {project.summary}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            {filteredProjects.map((project) => {
              const images = getProjectImages(project.folder);
              const status = PROJECT_STATUS[project.status];

              return (
                <div key={project.id} className="space-y-10">
                  <div className="border-l-4 border-red-600 pl-6">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${status.className}`}
                      >
                        {status.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDateShort(project.date)}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                      {project.title}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">
                      {project.category}
                    </p>

                    {project.summary && (
                      <p className="text-gray-400 mt-4 max-w-3xl">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  {images.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${project.title} ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-8 border border-gray-800 rounded-lg">
                      No hay imágenes disponibles
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default ProjectsPage;
