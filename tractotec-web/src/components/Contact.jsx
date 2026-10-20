import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { COMPANY, whatsappLink } from "../constants/site";
import { SERVICES } from "../constants/services";

const INITIAL_FORM = {
  nombre: "",
  empresa: "",
  servicio: "",
  ubicacion: "",
  mensaje: "",
};

const inputClass =
  "w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600/40 transition";

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = formData.nombre.trim();
    const mensaje = formData.mensaje.trim();
    const { empresa, servicio, ubicacion } = formData;

    if (!nombre || !servicio || !mensaje) {
      setError("Por favor completa los campos obligatorios (*).");
      return;
    }
    setError("");

    const texto = `Hola TractoTec, solicito información:

👤 Nombre: ${nombre}
🏢 Empresa: ${empresa.trim() || "No especificado"}
🔧 Servicio: ${servicio}
📍 Ubicación: ${ubicacion.trim() || "No especificado"}

📝 Descripción:
${mensaje}`;

    window.open(whatsappLink(texto), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="relative py-24 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* IZQUIERDA */}
          <div>
            <div className="w-full h-[2px] bg-red-600 mb-10" aria-hidden="true"></div>

            <h2 className="text-4xl font-bold mb-4">
              Contácta<span className="text-red-600">nos</span>
            </h2>

            <div className="w-20 h-1 bg-red-600 mb-12" aria-hidden="true"></div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="text-yellow-500 shrink-0" size={28} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <a href={COMPANY.phoneHref} className="text-gray-400 hover:text-white transition">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-yellow-500 shrink-0" size={28} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Correo</h3>
                  <a href={`mailto:${COMPANY.email}`} className="text-gray-400 hover:text-white transition break-all">
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-yellow-500 shrink-0" size={28} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Ubicación</h3>
                  <p className="text-gray-400">{COMPANY.address}</p>
                </div>
              </div>

              <a
                href={whatsappLink()}
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
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="contact-nombre" className="block text-sm mb-2 text-gray-300">
                  Nombre completo *
                </label>
                <input
                  id="contact-nombre"
                  type="text"
                  name="nombre"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-empresa" className="block text-sm mb-2 text-gray-300">
                  Empresa
                </label>
                <input
                  id="contact-empresa"
                  type="text"
                  name="empresa"
                  autoComplete="organization"
                  maxLength={100}
                  value={formData.empresa}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-servicio" className="block text-sm mb-2 text-gray-300">
                  Servicio requerido *
                </label>
                <select
                  id="contact-servicio"
                  name="servicio"
                  required
                  value={formData.servicio}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Seleccione un servicio</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-ubicacion" className="block text-sm mb-2 text-gray-300">
                  Ubicación del equipo
                </label>
                <input
                  id="contact-ubicacion"
                  type="text"
                  name="ubicacion"
                  maxLength={120}
                  placeholder="Ej.: Huancayo, mina, obra…"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-mensaje" className="block text-sm mb-2 text-gray-300">
                  Descripción del requerimiento *
                </label>
                <textarea
                  id="contact-mensaje"
                  rows="4"
                  name="mensaje"
                  required
                  maxLength={1000}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={inputClass}
                ></textarea>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
              >
                Enviar solicitud por WhatsApp
              </button>

              <p className="text-xs text-gray-400">
                Al enviar se abrirá WhatsApp con tu mensaje. Esta web no almacena
                los datos del formulario.
              </p>
            </form>
          </div>
        </div>

        {/* MAPA */}
        <div className="mt-20 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <iframe
            title="Ubicación de TractoTec en Google Maps"
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
