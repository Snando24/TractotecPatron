import { Phone, Mail, MapPin } from "lucide-react";

function Contact() {
  return (
    <section
      id="contacto"
      className="relative py-1 text-white overflow-hidden"
    >
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* Luz roja industrial */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Separador */}
        <div className="w-full h-[2px] bg-red-600 mb-16"></div>

        {/* Título */}
        <h2 className="text-4xl font-bold mb-4">
          Contácta<span className="text-red-600">nos</span>
        </h2>

        <div className="w-20 h-1 bg-red-600 mb-16"></div>

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* Información */}
          <div className="space-y-8">

            <div className="flex items-start gap-4">
              <Phone className="text-yellow-500" size={28} />
              <div>
                <h3 className="font-semibold">Teléfono</h3>
                <p className="text-gray-400">+34 XXX XXX XXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-yellow-500" size={28} />
              <div>
                <h3 className="font-semibold">Correo</h3>
                <p className="text-gray-400">info@tractotec.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-yellow-500" size={28} />
              <div>
                <h3 className="font-semibold">Ubicación</h3>
                <p className="text-gray-400">
                  Dirección industrial – Ciudad / País
                </p>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <a
              href="https://wa.me/34XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-yellow-500/40"
            >
              Cotizar por WhatsApp
            </a>

          </div>

          {/* Formulario */}
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800 shadow-xl">
            <form className="space-y-6">

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Mensaje
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
              >
                Enviar Mensaje
              </button>

            </form>
          </div>

        </div>

        {/* MAPA FULL WIDTH */}
        <div className="mt-20 rounded-xl pb-5 overflow-hidden border-gray-800 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1081.7034568605893!2d-75.22341268857595!3d-12.04630051555022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e9737b43cd923%3A0x5b455dcf4d3c26a7!2sTractoTec%20-Patron%20Santiago!5e0!3m2!1sen!2sus!4v1771189236355!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
