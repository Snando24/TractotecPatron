import { NAV_LINKS } from "../constants/navigation";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white border-b-4 border-red-600 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/Fondos/Fondo_Logo.png"
            alt="Logo TractoTec"
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold tracking-wider">
            <span className="text-white">TRACTO</span>
            <span className="text-red-600">TEC</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-red-600 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp Desktop */}
        <a
          href="https://wa.me/51921786182"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-yellow-500/40"
        >
          <span>Cotizar</span>
        </a>

        {/* Botón Hamburguesa (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 pb-6">
          <div className="flex flex-col gap-6 mt-6">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo(0, 0);
                }}
                className="text-gray-300 hover:text-red-600 transition"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://wa.me/51921786182"
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