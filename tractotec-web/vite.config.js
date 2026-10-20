import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

const IMAGES_ROOT = path.resolve(ROOT, "public/images/proyectos");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const VIRTUAL_ID = "virtual:project-images";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

function listImages(dir, base = "") {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return listImages(path.join(dir, entry.name), rel);
    return IMAGE_EXT.test(entry.name) ? [`/images/proyectos/${rel}`] : [];
  });
}

/**
 * Expone la lista de imágenes de public/images/proyectos como módulo virtual.
 * Evita importar los archivos de /public (que Vite duplicaba en dist/assets).
 */
function projectImagesManifest() {
  return {
    name: "project-images-manifest",
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const images = listImages(IMAGES_ROOT).sort();
      return `export default ${JSON.stringify(images)};`;
    },
    configureServer(server) {
      server.watcher.add(IMAGES_ROOT);
      const invalidate = (file) => {
        if (!file.startsWith(IMAGES_ROOT)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
      };
      server.watcher.on("add", invalidate);
      server.watcher.on("unlink", invalidate);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), projectImagesManifest()],
});
