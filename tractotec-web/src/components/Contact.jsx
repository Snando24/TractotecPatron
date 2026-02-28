import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    servicio: "",
    ubicacion: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, empresa, servicio, ubicacion, mensaje } = formData;

    if (!nombre || !servicio || !mensaje) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const texto = `Hola TractoTec, solicito información:

👤 Nombre: ${nombre}
🏢 Empresa: ${empresa || "No especificado"}
🔧 Servicio: ${servicio}
📍 Ubicación: ${ubicacion || "No especificado"}

📝 Descripción:
${mensaje}`;

    const mensajeCodificado = encodeURIComponent(texto);

    const numero = "51921786182";

    window.open(
      `https://wa.me/${numero}?text=${mensajeCodificado}`,
      "_blank"
    );
  };

  return (
    <section
      id="contacto"
      className="relative py-24 text-white overflow-hidden"
    >
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* Luz roja industrial */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* GRID PRINCIPAL DESDE ARRIBA */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* IZQUIERDA */}
          <div>

            {/* Línea superior */}
            <div className="w-full h-[2px] bg-red-600 mb-10"></div>

            {/* Título */}
            <h2 className="text-4xl font-bold mb-4">
              Contácta<span className="text-red-600">nos</span>
            </h2>

            <div className="w-20 h-1 bg-red-600 mb-12"></div>

            {/* Información */}
            <div className="space-y-8">

              <div className="flex items-start gap-4">
                <Phone className="text-yellow-500" size={28} />
                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-gray-400">+51 921 786 182</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-yellow-500" size={28} />
                <div>
                  <h3 className="font-semibold">Correo Corporativo</h3>
                  <p className="text-gray-400">riveraogedar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-yellow-500" size={28} />
                <div>
                  <h3 className="font-semibold">Ubicación</h3>
                  <p className="text-gray-400">
                    Jr. Nemesio Raez 2317 – Huancayo - Junín / Perú
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/51921786182"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-yellow-500/40"
              >
                Cotizar directamente por WhatsApp
              </a>

            </div>
          </div>

          {/* DERECHA — FORMULARIO */}
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800 shadow-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Servicio requerido *
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                >
                  <option value="">Seleccione un servicio</option>
                  <option value="Traccionamiento">Traccionamiento</option>
                  <option value="Fabricación Industrial">Fabricación Industrial</option>
                  <option value="Mantenimiento y Reparación">Mantenimiento y Reparación</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Descripción del requerimiento *
                </label>
                <textarea
                  rows="4"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
              >
                Enviar solicitud por WhatsApp
              </button>

            </form>
          </div>

        </div>

        {/* MAPA */}
        <div className="mt-20 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1081.7034568605893!2d-75.22341268857595!3d-12.04630051555022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e9737b43cd923%3A0x5b455dcf4d3c26a7!2sTractoTec%20-Patron%20Santiago!5e0!3m2!1sen!2sus!4v1771189236355!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default Contact;