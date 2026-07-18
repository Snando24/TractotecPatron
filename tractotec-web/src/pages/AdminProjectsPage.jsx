import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadProjects } from "../utils/projectsLoader";
import { getStoredProjects, saveProjectsToStorage } from "../utils/projectAdminStorage";

const DEFAULT_PASSWORD = "tractotec2026";

function AdminProjectsPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [draft, setDraft] = useState({
    title: "",
    category: "Traccionamiento",
    summary: "",
    status: "completado",
    featured: false,
    images: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const syncProjects = async () => {
      const saved = await getStoredProjects();
      const baseProjects = loadProjects();

      if (saved && saved.length > 0) {
        setProjects(saved);
        return;
      }

      setProjects(baseProjects);
      await saveProjectsToStorage(baseProjects);
    };

    syncProjects();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      setMessage("Acceso concedido.");
      setPassword("");
      return;
    }

    setMessage("Contraseña incorrecta.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProject = {
      id: Date.now(),
      title: draft.title.trim(),
      category: draft.category,
      summary: draft.summary.trim(),
      status: draft.status,
      date: new Date().toISOString().slice(0, 10),
      featured: draft.featured,
      image: draft.images.length > 0 ? draft.images[0] : "/images/proyectos/default-project.jpg",
      folder: `admin/${Date.now()}`,
      images: draft.images,
    };

    if (!newProject.title || !newProject.summary) {
      setMessage("Completa el título y la descripción.");
      return;
    }

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    await saveProjectsToStorage(updatedProjects);
    setDraft({
      title: "",
      category: "Traccionamiento",
      summary: "",
      status: "completado",
      featured: false,
      images: [],
    });
    setMessage("Trabajo reciente agregado correctamente.");
  };

  const projectCount = useMemo(() => projects.length, [projects]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900/80 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">Panel privado</p>
          <h1 className="mt-3 text-3xl font-bold">Acceso administrador</h1>
          <p className="mt-3 text-gray-400">Ingresa la contraseña para agregar trabajos recientes.</p>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            className="mt-6 w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600"
          />

          <button type="submit" className="mt-6 w-full rounded-md bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700">
            Entrar
          </button>

          {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">Panel privado</p>
            <h1 className="text-3xl font-bold">Administrar trabajos recientes</h1>
            <p className="mt-2 text-gray-400">Agrega un trabajo con descripción e imágenes para que aparezca en la web.</p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/proyectos")}
            className="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-red-600 hover:text-white"
          >
            Volver a la web
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-xl border border-gray-800 bg-gray-900/80 p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">Nuevo trabajo</h2>

            <div className="mt-6 space-y-4">
              <input
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                placeholder="Título del trabajo"
                className="w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600"
              />

              <select
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                className="w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600"
              >
                <option value="Traccionamiento">Traccionamiento</option>
                <option value="Siniestros de chasis">Siniestros de chasis</option>
                <option value="Pintura Industrial">Pintura Industrial</option>
                <option value="Reparación Pistones">Reparación Pistones</option>
                <option value="Fabricación">Fabricación</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>

              <textarea
                value={draft.summary}
                onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                placeholder="Descripción del trabajo"
                rows="5"
                className="w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <select
                  value={draft.status}
                  onChange={(event) => setDraft({ ...draft, status: event.target.value })}
                  className="w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600"
                >
                  <option value="completado">Completado</option>
                  <option value="en_progreso">En progreso</option>
                </select>

                <label className="flex items-center gap-3 rounded-md border border-gray-700 bg-black px-4 py-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={draft.featured}
                    onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
                    className="h-4 w-4 rounded border-gray-600 bg-black"
                  />
                  Mostrar en trabajos recientes
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">Cargar imágenes</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    const readers = files.map((file) => {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target?.result);
                        reader.readAsDataURL(file);
                      });
                    });
                    Promise.all(readers).then((images) => {
                      setDraft({ ...draft, images: [...draft.images, ...images] });
                    });
                  }}
                  className="w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-gray-400 file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                />
                {draft.images.length > 0 && (
                  <p className="text-sm text-gray-400">{draft.images.length} imagen(es) cargada(s)</p>
                )}
              </label>

              <button type="submit" className="w-full rounded-md bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700">
                Guardar trabajo
              </button>
            </div>

            {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
          </form>

          <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Trabajos guardados</h2>
              <span className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-300">{projectCount}</span>
            </div>

            <div className="mt-6 space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="rounded-lg border border-gray-800 bg-black/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{project.title}</p>
                      <p className="text-sm text-gray-400">{project.category}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-yellow-500">{project.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{project.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProjectsPage;
