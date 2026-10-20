import { NAV_LINKS } from "../constants/navigation";
import { whatsappLink } from "../constants/site";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const linkClass = ({ isActive }) =>
  `transition-colors duration-300 hover:text-red-600 ${isActive ? "text-red-500" : ""}`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed top-0 left-0 w-full bg-black text-white border-b-4 border-red-600 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" aria-label="TractoTec, ir al inicio">
          <img
            src="/images/Fondos/Fondo_Logo.png"
            alt=""
            className="h-10 w-auto object-contain"
          />
          <span className="text-2xl font-bold tracking-wider">
            <span className="text-white">TRACTO</span>
            <span className="text-red-600">TEC</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} to={link.href} end={link.href === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* WhatsApp Desktop */}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-yellow-500/40"
        >
          <span>Cotizar</span>
        </a>

        {/* Botón Hamburguesa (Mobile) */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-black border-t border-gray-800 px-6 pb-6">
          <div className="flex flex-col gap-6 mt-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.href === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `transition hover:text-red-600 ${isActive ? "text-red-500" : "text-gray-300"}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-md text-center"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
