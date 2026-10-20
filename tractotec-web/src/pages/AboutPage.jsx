import About from "../components/About";
import Seo from "../components/seo/Seo";

function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <Seo
        title="Nosotros | TractoTec Servicios Generales – Huancayo"
        description="Conoce a Tractotec Servicios Generales: taller en Huancayo especializado en chasis, estructuras metálicas y maquinaria pesada."
        path="/nosotros"
      />
      <About as="h1" />
    </div>
  );
}

export default AboutPage;
