import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const slides = [
    "/images/Fondos/Fondo_Logo_Hero.png",
    "/images/proyectos/Traccionamiento/traccionamiento_chasis/img_1.jpeg",
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const id = setInterval(() => {
      setActive((s) => (s + 1) % slides.length);
    }, 6000);

    return () => clearInterval(id);
  }, []); // eslint-disable-line

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === active ? 1 : 0,
            transform: "scale(1.05)",
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: slides[active].includes("Fondo_Logo_Hero.png")
            ? "rgba(0,0,0,0.75)"
            : "rgba(0,0,0,0.65)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <p className="text-yellow-500 font-semibold uppercase tracking-widest text-sm mb-4">
          Huancayo, Junín — Perú
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Servicios industriales
          <span className="block text-red-600 mt-2">
            de Maquinaria Pesada
          </span>
        </h1>

        <div className="w-24 h-1 bg-red-600 mt-6 mb-6" />

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Especialistas en traccionamiento de chasis, estructuras metálicas
          y fabricación de equipos industriales de alto rendimiento.
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <a
            href="#contacto"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-7 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-yellow-500/40"
          >
            Solicitar Cotización
          </a>

          <Link
            to="/proyectos"
            onClick={() => window.scrollTo(0, 0)}
            className="bg-red-600 text-white px-7 py-3 rounded-md hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/40"
          >
            Ver Proyectos
          </Link>

          <a
            href="#trabajos-recientes"
            className="border border-gray-600 hover:border-red-600 text-white px-7 py-3 rounded-md transition-all duration-300"
          >
            Trabajos Recientes
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
