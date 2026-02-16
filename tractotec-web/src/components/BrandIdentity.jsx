function BrandIdentity() {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Imagen del Santo */}
        <div className="flex justify-center">
          <img
            src="/branding/santo.png"
            alt="Patrón del Negocio"
            className="h-96 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Texto */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Nuestra <span className="text-red-600">Identidad</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">
            En Tractotec Servicios Generales, nuestra tradición y fe forman parte
            de nuestra identidad. Bajo la protección de nuestro santo patrón,
            trabajamos con compromiso, responsabilidad y dedicación en cada proyecto.
          </p>

          {/* Slogan destacado */}
          <div className="bg-red-600/10 border-l-4 border-red-600 p-6 rounded-md">
            <p className="text-xl font-semibold text-yellow-500">
              "Traccionamiento de chasis y alargados de chasis"
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BrandIdentity;
