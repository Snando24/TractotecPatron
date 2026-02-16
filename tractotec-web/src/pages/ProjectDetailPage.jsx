import { useParams, useNavigate } from "react-router-dom";
import { loadProjects } from "../utils/projectsLoader";
import ProjectGallery from "../components/ProjectGallery";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = loadProjects();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Proyecto no encontrado</h1>
          <button
            onClick={() => navigate("/proyectos")}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
          >
            Volver a Proyectos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/proyectos")}
            className="text-red-600 hover:text-red-500 mb-4 text-sm uppercase tracking-wider"
          >
            ← Volver a Proyectos
          </button>
          <h1 className="text-4xl font-bold mb-2">
            {project.title}
            <span className="text-red-600 ml-2">•</span>
            <span className="text-gray-400 text-xl ml-2">{project.category}</span>
          </h1>
          <div className="w-16 h-1 bg-red-600"></div>
        </div>

        {/* Galería */}
        <ProjectGallery folderPath={project.folder} title={project.title} />
      </div>
    </div>
  );
}
