import { useState } from "react";
import { getProjectImages } from "../utils/projectsLoader";

export default function ProjectGallery({ folderPath, title }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = getProjectImages(folderPath);

  if (images.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No hay imágenes disponibles en esta carpeta
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Imagen principal */}
      {selectedImage && (
        <div className="relative">
          <img
            src={selectedImage}
            alt={title}
            className="w-full h-96 object-cover rounded-lg border border-gray-800"
          />
        </div>
      )}

      {/* Grid de miniaturas */}
      <div>
        <h3 className="text-lg font-semibold text-yellow-500 mb-4">
          Galería ({images.length} imágenes)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative overflow-hidden rounded border-2 transition ${
                selectedImage === image
                  ? "border-red-600"
                  : "border-gray-800 hover:border-red-600"
              }`}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-24 object-cover hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-xs text-white font-semibold">
                  {index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
