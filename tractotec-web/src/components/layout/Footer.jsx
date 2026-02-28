import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-red-600">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Marca */}
          <div>
            <h2 className="text-2xl font-bold mb-4 tracking-wider">
              <span className="text-white">TRACTO</span>
              <span className="text-red-600">TEC</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas en fabricación, adaptación y mantenimiento
              de maquinaria pesada y estructuras metálicas industriales.
              Comprometidos con calidad, seguridad y eficiencia operativa.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-500">
              Enlaces Rápidos
            </h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-red-600 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-red-600 transition">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/proyectos" className="hover:text-red-600 transition">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-red-600 transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4 text-yellow-500">
              Contacto
            </h3>

            <div className="space-y-4 text-gray-400 text-sm">

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-yellow-500" />
                <span>+51 921 786 182</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-500" />
                <span>riveraogedar@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-yellow-500" />
                <span>
                  Jr. Nemesio Raez 2317 – Huancayo - Junín / Perú
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="mt-16 border-t border-gray-800 pt-6 text-center text-gray-500 text-xs space-y-2">
          
          <p>
            © {new Date().getFullYear()} Tractotec Servicios Generales. 
            Todos los derechos reservados.
          </p>

          <p className="opacity-70">
            Plataforma desarrollada por{" "}
            <span className="text-gray-400 font-medium">
              SoftNanTec
            </span>
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;