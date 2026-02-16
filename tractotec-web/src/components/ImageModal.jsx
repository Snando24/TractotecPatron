import { useState } from "react";

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt="Imagen ampliada"
          className="w-full h-auto max-h-96 object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-red-600 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
