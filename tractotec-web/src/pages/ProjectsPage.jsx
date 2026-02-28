import { useState, useMemo } from "react";
import { loadProjects, getProjectImages } from "../utils/projectsLoader";
import { getGridColsClass } from "../utils/gridHelper";
import ImageModal from "../components/ImageModal";

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState(null);

  // Cargar proyectos dinámicamente
  const projects = useMemo(() => loadProjects(), []);

  // Extraer categorías únicas de los proyectos
  const categories = useMemo(() => {
  const desiredOrder = [
    "Traccionamiento",
    "Pintura Industrial",
    "Reparación Pistones",
    "Fabricación",
    "Mantenimiento",
  ];

  const cats = new Set(projects.map((p) => p.category));

  const ordered = desiredOrder.filter((cat) => cats.has(cat));

  return ["Todos", ...ordered];
}, [projects]);

  const filteredProjects =
    selectedCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="text-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Galería de <span className="text-red-600">Proyectos</span>
        </h1>
        <p className="text-gray-400">
          Experiencia real en maquinaria pesada y estructuras industriales.
        </p>
      </section>

      {/* Filtros */}
      <section className="bg-black py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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

      {/* VISTA 1: TODOS - Tarjetas de portada */}
      {selectedCategory === "Todos" ? (
        <section className="bg-black py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedCategory(project.category)}
                className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition cursor-pointer text-left"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className="text-lg font-semibold text-yellow-500">
                    {project.title}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-gray-300">
                    {project.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        /* VISTA 2: CATEGORÍA ESPECÍFICA - Galerías inline */
        <section className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            {filteredProjects.map((project) => {
              const images = getProjectImages(project.folder);

              return (
                <div key={project.id} className="space-y-6">
                  {/* Título del proyecto */}
                  <div className="border-l-4 border-red-600 pl-6">
                    <h2 className="text-3xl font-bold text-white">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">
                      {project.category}
                    </p>
                  </div>

                  {/* Grid de imágenes */}
                  {images.length > 0 ? (
                    <div className={`grid ${getGridColsClass(images.length)} gap-4`}>
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(image)}
                          className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-red-600 transition cursor-pointer aspect-square"
                        >
                          <img
                            src={image}
                            alt={`${project.title} ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                            <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                              Ver
                            </span>
                          </div>
                          {/* Numeración */}
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            {index + 1}
                          </div>
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

      {/* Modal de imagen ampliada */}
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default ProjectsPage;
