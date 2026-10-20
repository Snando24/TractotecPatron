import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";

function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-black px-6 pt-24 text-center text-white">
      <Seo title="Página no encontrada | TractoTec" path="/404" noindex />
      <div>
        <p className="text-yellow-500 text-sm font-semibold uppercase tracking-widest">Error 404</p>
        <h1 className="mt-4 text-4xl font-bold">Página no encontrada</h1>
        <p className="mt-4 text-gray-400">La página que buscas no existe o fue movida.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
