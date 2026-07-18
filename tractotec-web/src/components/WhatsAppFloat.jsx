import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "../constants/projects";

function WhatsAppFloat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="glass-card rounded-2xl p-4 max-w-[260px] animate-fade-in shadow-2xl border border-green-500/20">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="font-semibold text-sm">¿Necesitas cotización?</p>
              <p className="text-gray-400 text-xs mt-1">
                Escríbenos y te atendemos directamente.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-gray-500 hover:text-white transition"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola TractoTec, quiero información sobre sus servicios.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green-500 hover:bg-green-400 text-black text-sm font-semibold py-2.5 rounded-xl transition"
          >
            Abrir WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-400 text-black rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        <MessageCircle size={26} className="relative" />
      </button>
    </div>
  );
}

export default WhatsAppFloat;
