const STORAGE_KEY = "tractotec-admin-projects";

export async function getStoredProjects() {
  if (typeof window === "undefined") return null;

  try {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      throw new Error("No se pudo cargar desde la API");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
}

export async function saveProjectsToStorage(projects) {
  if (typeof window === "undefined") return;

  try {
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projects),
    });
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}
