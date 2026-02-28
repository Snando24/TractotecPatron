import { NAV_LINKS } from "../constants/navigation";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black text-white border-b-4 border-red-600 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo + Imagen */}
                <Link to="/" className="flex items-center gap-3">

                    {/* Imagen */}
                    <img
                        src="/images/Fondos/Fondo_Logo.png"
                        alt="Logo TractoTec"
                        className="h-10 w-auto object-contain"
                    />

                    {/* Texto */}
                    <h1 className="text-2xl font-bold tracking-wider">
                        <span className="text-white">TRACTO</span>
                        <span className="text-red-600">TEC</span>
                    </h1>

                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="hover:text-red-600 transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Botón WhatsApp */}
                <a
                    href="https://wa.me/51921786182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-yellow-500/40"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    <span className="hidden lg:inline">Cotizar</span>
                </a>

            </div>
        </nav>
    );
}

export default Navbar;