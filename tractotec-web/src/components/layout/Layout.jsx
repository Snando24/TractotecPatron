import Navbar from "../navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">

      {/* Contenido real */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>

    </div>
  );
}

export default Layout;
