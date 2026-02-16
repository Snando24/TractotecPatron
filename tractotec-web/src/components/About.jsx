import { ShieldCheck, Hammer, Users } from "lucide-react";

function About() {
  return (
    <section id="nosotros" className="relative py-24 text-white overflow-hidden">
      
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* Luz roja industrial */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Separador */}
        <div className="w-full h-[2px] bg-red-600 mb-16"></div>

        {/* Título */}
        <h2 className="text-4xl font-bold mb-4">
          Sobre <span className="text-red-600">Nosotros</span>
        </h2>

        <div className="w-20 h-1 bg-red-600 mb-12"></div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <p className="text-gray-300 leading-relaxed mb-6">
              En <span className="text-yellow-500 font-semibold">Tractotec Servicios Generales</span>, 
              contamos con años de experiencia en la fabricación, adaptación y mantenimiento 
              de maquinaria pesada y estructuras metálicas industriales.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Nuestro compromiso es ofrecer soluciones técnicas de alto rendimiento, 
              garantizando calidad, resistencia y seguridad en cada proyecto ejecutado.
            </p>
          </div>

          {/* Valores / Pilares */}
          <div className="space-y-8">

            <div className="flex items-start gap-4">
              <ShieldCheck className="text-yellow-500" size={40} />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Calidad y Seguridad
                </h3>
                <p className="text-gray-400 text-sm">
                  Procesos técnicos rigurosos y estándares industriales en cada fabricación.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Hammer className="text-yellow-500" size={40} />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Experiencia Técnica
                </h3>
                <p className="text-gray-400 text-sm">
                  Equipo especializado en maquinaria pesada y soluciones personalizadas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="text-yellow-500" size={40} />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Compromiso con el Cliente
                </h3>
                <p className="text-gray-400 text-sm">
                  Atención personalizada y cumplimiento en tiempos de entrega.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
