import { useState, useEffect } from "react";
import { getProjectImages } from "../utils/projectsLoader";

export default function ProjectGallery({ folderPath, title }) {
  const images = getProjectImages(folderPath);
  const [selectedImage, setSelectedImage] = useState(null);

  // Si solo hay una imagen, seleccionarla automáticamente
  useEffect(() => {
    if (images.length === 1) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No hay imágenes disponibles en esta carpeta
      </div>
    );
  }

  const isSingle = images.length === 1;

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* IMAGEN PRINCIPAL */}
      {selectedImage && (
        <div className="flex justify-center">
          <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src={selectedImage}
              alt={title}
              className="max-w-[850px] max-h-[500px] w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* MINIATURAS (solo si hay más de una) */}
      {!isSingle && (
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-6 text-center">
            Galería ({images.length} imágenes)
          </h3>

          <div className="flex flex-wrap justify-center gap-5">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative w-32 aspect-square overflow-hidden rounded-lg border-2 transition duration-300 ${selectedImage === image
                    ? "border-red-600 scale-105"
                    : "border-gray-800 hover:border-red-600"
                  }`}
              >
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover transition duration-300 hover:scale-110"
                />

                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}