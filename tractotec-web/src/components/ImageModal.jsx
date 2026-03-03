import { useEffect } from "react";

function ImageModal({ image, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen grande */}
        <img
          src={image}
          alt="Vista ampliada"
          className="
            max-w-[90vw] 
            max-h-[85vh] 
            object-contain 
            rounded-xl 
            shadow-2xl
          "
        />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full text-lg font-bold shadow-lg transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ImageModal;