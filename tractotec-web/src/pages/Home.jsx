import Hero from "../components/Hero";
import RecentWork from "../components/RecentWork";
import Services from "../components/Services";
import Projects from "../components/Projects";
import BrandIdentity from "../components/BrandIdentity";
import About from "../components/About";
import Contact from "../components/Contact";
import Seo from "../components/seo/Seo";

function Home() {
  return (
    <>
      <Seo
        title="Traccionamiento de Chasis para Camiones y Maquinaria Pesada | TractoTec Huancayo"
        description="TractoTec ofrece traccionamiento, alineación y enderezado de chasis, fabricación industrial y mantenimiento de maquinaria pesada en Huancayo, Perú."
        path="/"
      />
      <Hero />
      <RecentWork />
      <Services />
      <Projects />
      <BrandIdentity />
      <About />
      <Contact />
    </>
  );
}

export default Home;
