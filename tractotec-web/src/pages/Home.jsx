import Hero from "../components/Hero";
import RecentWork from "../components/RecentWork";
import Services from "../components/Services";
import Projects from "../components/Projects";
import BrandIdentity from "../components/BrandIdentity";
import About from "../components/About";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
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
