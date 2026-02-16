import { useEffect, useState } from "react";

function Hero() {
    const slides = [
        "/images/Fondos/Fondo_Logo_Hero.png",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80",
    ];

    const [active, setActive] = useState(0);

    useEffect(() => {
        // Preload
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

            {/* Slideshow: cada slide es una capa que hace crossfade por opacidad */}
            {slides.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url('${src}')`,
                        opacity: i === active ? 1 : 0,
                        transform: 'scale(1.05)'
                    }}
                />
            ))}

            {/* Overlay negro para legibilidad (leve). Se ajusta según slide activo para dar más visibilidad al logo */}
            <div
                className="absolute inset-0"
                style={{
                    // Más sombreado cuando el slide activo es el logo para mejorar legibilidad
                    backgroundColor: slides[active].includes('Fondo_Logo_Hero.png') ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.65)'
                }}
            />

            {/* Contenido */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                    Servicios de industrilales
                    <span className="block text-red-600 mt-2">
                        de Maquinaria Pesada
                    </span>
                </h1>

                <div className="w-24 h-1 bg-red-600 mt-6 mb-6"></div>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
                    Soluciones industriales en traccionamiento, estructuras metálicas
                    y fabricación de equipos de alto rendimiento.
                </p>

                <div className="flex gap-6 mt-2">
                    <a
                        href="#contacto"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-7 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-yellow-500/40"
                    >
                        Solicitar Cotización
                    </a>

                    <a
                        href="#proyectos"
                        className="bg-red-600 text-white px-7 py-3 rounded-md hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/40"
                    >
                        Ver Proyectos
                    </a>


                </div>
            </div>
        </section>
    );
}

export default Hero;
