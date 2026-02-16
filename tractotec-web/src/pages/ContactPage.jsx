import Contact from "../components/Contact";

function ContactPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-black via-gray-800 to-black py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            Solicita tu <span className="text-red-600">Cotización</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Nuestro equipo está listo para atender tu proyecto industrial.
          </p>
        </div>
      </section>
      <Contact />
    </div>
  );
}

export default ContactPage;
