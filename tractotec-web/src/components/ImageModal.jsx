import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function ImageModal({ image, alt = "Vista ampliada", onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!image) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // Único elemento enfocable: mantener el foco dentro del diálogo
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt={alt}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar imagen"
          className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
