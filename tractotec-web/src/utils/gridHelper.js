/**
 * Determina las clases de grid de Tailwind basándose en la cantidad de imágenes
 * - 1-2 imágenes: 2 columnas
 * - 3-7 imágenes: 3 columnas
 * - 8+ imágenes: 4 columnas
 */
export function getGridColsClass(imageCount) {
  if (imageCount <= 2) {
    return "grid-cols-1 md:grid-cols-2";
  } else if (imageCount <= 7) {
    return "grid-cols-2 md:grid-cols-3";
  } else {
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  }
}
