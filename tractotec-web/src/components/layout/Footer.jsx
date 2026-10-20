import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "../../constants/navigation";
import { COMPANY } from "../../constants/site";

function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-red-600">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Marca */}
          <div>
            <p className="text-2xl font-bold mb-4 tracking-wider">
              <span className="text-white">TRACTO</span>
              <span className="text-red-600">TEC</span>
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              TractoTec ofrece servicios especializados de traccionamiento
               de chasis para camiones y maquinaria pesada en Huancayo. 
               Nuestro equipo realiza alineación, reparación y enderezado 
               de chasis, garantizando la recuperación estructural de 
               vehículos y equipos industriales.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h2 className="font-semibold mb-4 text-yellow-500">
              Enlaces Rápidos
            </h2>

            <ul className="space-y-2 text-gray-400 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-red-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="font-semibold mb-4 text-yellow-500">
              Contacto
            </h2>

            <div className="space-y-4 text-gray-400 text-sm">

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-yellow-500 shrink-0" aria-hidden="true" />
                <a href={COMPANY.phoneHref} className="hover:text-white transition">{COMPANY.phone}</a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-500 shrink-0" aria-hidden="true" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition break-all">{COMPANY.email}</a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-yellow-500 shrink-0" aria-hidden="true" />
                <span>{COMPANY.address}</span>
              </div>

            </div>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="mt-16 border-t border-gray-800 pt-6 text-center text-gray-400 text-xs space-y-2">
          
          <p>
            © {new Date().getFullYear()} {COMPANY.fullName}. 
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