import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../constants/projects";

function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-black to-red-950/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <p className="text-yellow-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
          ¿Listo para empezar?
        </p>

        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
          Cotiza tu proyecto con{" "}
          <span className="text-red-600">especialistas reales</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Cuéntanos qué necesitas reparar o fabricar. Te respondemos por WhatsApp
          con una evaluación inicial y tiempos estimados de trabajo.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola TractoTec, quiero solicitar una cotización para un servicio industrial.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-0.5"
          >
            <MessageCircle size={20} />
            Cotizar por WhatsApp
          </a>

          <Link
            to="/servicios"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 border border-gray-700 hover:border-red-600 text-white px-8 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Ver servicios
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;
