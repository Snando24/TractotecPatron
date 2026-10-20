import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/seo/Seo";
import { CATEGORY_ORDER, PROJECT_STATUS } from "../constants/projects";
import { invalidateProjectsCache } from "../hooks/useProjects";
import {
  createProject,
  deleteProject,
  fetchProjects,
  getSession,
  isSupabaseConfigured,
  onAuthChange,
  signIn,
  signOut,
  uploadProjectImages,
  validateImage,
} from "../utils/supabaseClient";

const MAX_IMAGES = 10;

const EMPTY_DRAFT = {
  title: "",
  category: CATEGORY_ORDER[0],
  summary: "",
  status: "completado",
  featured: false,
};

const fieldClass =
  "w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-red-600";

function AdminShell({ children }) {
  return (
    <>
      <Seo title="Panel administrador | TractoTec" path="/admin/proyectos" noindex />
      {children}
    </>
  );
}

function AdminProjectsPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [projects, setProjects] = useState([]);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) return undefined;
    getSession().then((s) => {
      setSession(s);
      setCheckingSession(false);
    });
    return onAuthChange(setSession);
  }, [configured]);

  useEffect(() => {
    if (!session) return;
    fetchProjects()
      .then(setProjects)
      .catch(() => setMessage("No se pudieron cargar los trabajos."));
  }, [session]);

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  if (!configured) {
    return (
      <AdminShell>
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-24">
          <div className="max-w-md rounded-xl border border-gray-800 bg-gray-900/80 p-8 text-center">
            <h1 className="text-2xl font-bold">Panel no disponible</h1>
            <p className="mt-3 text-gray-400">
              Supabase no está configurado. Define <code>VITE_SUPABASE_URL</code> y{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> (ver SUPABASE_SETUP.md).
            </p>
          </div>
        </div>
      </AdminShell>
    );
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await signIn(credentials.email.trim(), credentials.password);
      setCredentials({ email: "", password: "" });
    } catch {
      setMessage("Credenciales incorrectas o usuario no autorizado.");
    } finally {
      setBusy(false);
    }
  };

  const handleFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    const errors = selected.map(validateImage).filter(Boolean);
    const valid = selected.filter((file) => !validateImage(file));
    const next = [...files, ...valid].slice(0, MAX_IMAGES);

    setFiles(next);
    event.target.value = "";

    if (errors.length) setMessage(errors.join(" "));
    else if (files.length + valid.length > MAX_IMAGES) setMessage(`Máximo ${MAX_IMAGES} imágenes por trabajo.`);
    else setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = draft.title.trim();
    const summary = draft.summary.trim();
    if (!title || !summary) {
      setMessage("Completa el título y la descripción.");
      return;
    }
    if (files.length === 0) {
      setMessage("Agrega al menos una imagen.");
      return;
    }

    setBusy(true);
    setMessage("Subiendo imágenes…");

    try {
      const id = Date.now();
      const images = await uploadProjectImages(id, files);
      const saved = await createProject({
        id,
        title,
        summary,
        category: draft.category,
        status: draft.status,
        featured: draft.featured,
        date: new Date().toISOString().slice(0, 10),
        image: images[0],
        folder: `admin/${id}`,
        images,
      });

      setProjects((current) => [saved, ...current]);
      invalidateProjectsCache();
      setDraft(EMPTY_DRAFT);
      setFiles([]);
      setMessage("Trabajo agregado correctamente.");
    } catch {
      setMessage("No se pudo guardar el trabajo. Revisa tu sesión y la configuración de Supabase.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`¿Eliminar "${project.title}"? Esta acción no se puede deshacer.`)) return;

    setBusy(true);
    try {
      await deleteProject(project);
      setProjects((current) => current.filter((p) => p.id !== project.id));
      invalidateProjectsCache();
      setMessage("Trabajo eliminado.");
    } catch {
      setMessage("No se pudo eliminar el trabajo.");
    } finally {
      setBusy(false);
    }
  };

  if (checkingSession) {
    return (
      <AdminShell>
        <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">Cargando…</div>
      </AdminShell>
    );
  }

  if (!session) {
    return (
      <AdminShell>
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-24">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900/80 p-8 shadow-2xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">Panel privado</p>
            <h1 className="mt-3 text-3xl font-bold">Acceso administrador</h1>
            <p className="mt-3 text-gray-400">Inicia sesión para administrar los trabajos recientes.</p>

            <label htmlFor="admin-email" className="mt-6 block text-sm text-gray-300">Correo</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className={`mt-2 ${fieldClass}`}
            />

            <label htmlFor="admin-password" className="mt-4 block text-sm text-gray-300">Contraseña</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className={`mt-2 ${fieldClass}`}
            />

            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-md bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-60"
            >
              {busy ? "Ingresando…" : "Entrar"}
            </button>

            {message && <p role="alert" className="mt-4 text-sm text-gray-300">{message}</p>}
          </form>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="min-h-screen bg-black text-white px-6 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">Panel privado</p>
              <h1 className="text-3xl font-bold">Administrar trabajos recientes</h1>
              <p className="mt-2 text-gray-400">
                Agrega un trabajo con descripción e imágenes para que aparezca en la web.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/proyectos")}
                className="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-red-600 hover:text-white"
              >
                Volver a la web
              </button>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-red-600 hover:text-white"
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="rounded-xl border border-gray-800 bg-gray-900/80 p-6 shadow-2xl">
              <h2 className="text-xl font-semibold">Nuevo trabajo</h2>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="draft-title" className="mb-2 block text-sm text-gray-300">Título *</label>
                  <input
                    id="draft-title"
                    maxLength={120}
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="draft-category" className="mb-2 block text-sm text-gray-300">Categoría</label>
                  <select
                    id="draft-category"
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                    className={fieldClass}
                  >
                    {CATEGORY_ORDER.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="draft-summary" className="mb-2 block text-sm text-gray-300">Descripción *</label>
                  <textarea
                    id="draft-summary"
                    rows="5"
                    maxLength={600}
                    value={draft.summary}
                    onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="draft-status" className="mb-2 block text-sm text-gray-300">Estado</label>
                    <select
                      id="draft-status"
                      value={draft.status}
                      onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                      className={fieldClass}
                    >
                      {Object.entries(PROJECT_STATUS).map(([value, { label }]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-3 self-end rounded-md border border-gray-700 bg-black px-4 py-3 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={draft.featured}
                      onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-600 bg-black"
                    />
                    Mostrar en trabajos recientes
                  </label>
                </div>

                <div>
                  <label htmlFor="draft-images" className="mb-2 block text-sm text-gray-300">
                    Imágenes * (JPG, PNG o WEBP, máx. 5 MB c/u, hasta {MAX_IMAGES})
                  </label>
                  <input
                    id="draft-images"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFiles}
                    className="w-full rounded-md border border-gray-700 bg-black px-4 py-3 text-gray-400 file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                  />

                  {previews.length > 0 && (
                    <ul className="mt-3 grid grid-cols-4 gap-2">
                      {previews.map((src, index) => (
                        <li key={src} className="relative">
                          <img src={src} alt={`Vista previa ${index + 1}`} className="h-20 w-full rounded object-cover" />
                          <button
                            type="button"
                            onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            aria-label={`Quitar imagen ${index + 1}`}
                            className="absolute right-1 top-1 rounded bg-black/80 px-1.5 text-xs text-white"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-md bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-60"
                >
                  {busy ? "Guardando…" : "Guardar trabajo"}
                </button>
              </div>

              {message && <p role="status" className="mt-4 text-sm text-gray-300">{message}</p>}
            </form>

            <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Trabajos agregados desde el panel</h2>
                <span className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-300">{projects.length}</span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Los proyectos base del sitio se editan en <code>src/data/defaultProjects.js</code>.
              </p>

              <div className="mt-6 space-y-3">
                {projects.length === 0 && <p className="text-sm text-gray-400">Aún no hay trabajos agregados.</p>}
                {projects.map((project) => (
                  <div key={project.id} className="rounded-lg border border-gray-800 bg-black/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{project.title}</p>
                        <p className="text-sm text-gray-400">
                          {project.category} · {PROJECT_STATUS[project.status]?.label ?? project.status}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handleDelete(project)}
                        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-60"
                      >
                        Eliminar
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{project.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

export default AdminProjectsPage;
