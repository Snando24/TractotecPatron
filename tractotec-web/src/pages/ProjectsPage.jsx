import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ImageModal from "../components/ImageModal";
import Seo from "../components/seo/Seo";
import { useProjects } from "../hooks/useProjects";
import { getProjectImages, sortByDate } from "../utils/projectsLoader";
import {
  CATEGORY_ORDER,
  CATEGORY_SLUG_MAP,
  SLUG_CATEGORY_MAP,
} from "../constants/projects";
import { formatDateShort } from "../utils/dateUtils";

/** La categoría activa se deriva de la URL (fuente única de verdad). */
function useSelectedCategory() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  if (slug && SLUG_CATEGORY_MAP[slug]) return SLUG_CATEGORY_MAP[slug];
  if (searchParams.get("filtro") === "recientes") return "Recientes";

  const categoriaURL = searchParams.get("categoria");
  if (categoriaURL && CATEGORY_SLUG_MAP[categoriaURL]) return categoriaURL;

  return "Todos";
}

function ProjectsPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const projects = useProjects();
  const selectedCategory = useSelectedCategory();
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["Recientes", "Todos", ...CATEGORY_ORDER.filter((cat) => cats.has(cat))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Recientes") return sortByDate(projects);
    if (selectedCategory === "Todos") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const handleCategoryChange = (category) => {
    if (category === "Recientes") return navigate("/proyectos?filtro=recientes");
    const categorySlug = CATEGORY_SLUG_MAP[category];
    navigate(categorySlug ? `/proyectos/${categorySlug}` : "/proyectos");
  };

  const showCategoryGallery =
    selectedCategory !== "Todos" && selectedCategory !== "Recientes";

  const seoTitle = showCategoryGallery
    ? `${selectedCategory} – Proyectos | TractoTec Huancayo`
    : "Galería de Proyectos | TractoTec Huancayo";
  const seoPath = slug && SLUG_CATEGORY_MAP[slug] ? `/proyectos/${slug}` : "/proyectos";

  return (
    <div className="text-white">
      <Seo
        title={seoTitle}
        description="Trabajos reales de TractoTec: traccionamiento y siniestros de chasis, pintura industrial, reparación de pistones, fabricación y mantenimiento de maquinaria pesada en Huancayo."
        path={seoPath}
      />

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
        <div
          className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center"
          role="group"
          aria-label="Filtrar proyectos por categoría"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              aria-pressed={selectedCategory === category}
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
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleCategoryChange(project.category)}
                className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition cursor-pointer text-left"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

                <div className="absolute bottom-0 p-6 w-full">
                  <p className="text-xs text-gray-300 mb-2">
                    {formatDateShort(project.date)}
                  </p>
                  <h2 className="text-lg font-semibold text-yellow-500">
                    {project.title}
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-gray-300">
                    {project.category}
                  </span>
                  {project.summary && (
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {project.summary}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            {filteredProjects.map((project) => {
              const images = getProjectImages(project);

              return (
                <article key={project.id} className="space-y-10">
                  <div className="border-l-4 border-red-600 pl-6">
                    <p className="text-xs text-gray-400 mb-2">
                      {formatDateShort(project.date)}
                    </p>
                    <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                    <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">
                      {project.category}
                    </p>
                    {project.summary && (
                      <p className="text-gray-400 mt-4 max-w-3xl">{project.summary}</p>
                    )}
                  </div>

                  {images.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() =>
                            setSelectedImage({
                              src: image,
                              alt: `${project.title} – imagen ${index + 1}`,
                            })
                          }
                          aria-label={`Ampliar imagen ${index + 1} de ${project.title}`}
                          className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${project.title} – imagen ${index + 1}`}
                            loading="lazy"
                            decoding="async"
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
                </article>
              );
            })}
          </div>
        </section>
      )}

      <ImageModal
        image={selectedImage?.src}
        alt={selectedImage?.alt}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default ProjectsPage;
