import { NAV_LINKS } from "../constants/navigation";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className="bg-black text-white border-b-4 border-red-600 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <h1 className="text-2xl font-bold tracking-wider">
                    <span className="text-white">TRACTO</span>
                    <span className="text-red-600">TEC</span>
                </h1>

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
                    href="https://wa.me/34XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-yellow-500/40"
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382..." />
                    </svg>
                    <span className="hidden lg:inline">Cotizar</span>
                </a>

            </div>
        </nav>

    );
}

export default Navbar;
