// [POR CONFIRMAR] Dominio definitivo (index.html usa www; antes el sitemap usaba sin www).
export const SITE_URL = "https://www.tractotec.com";

export const COMPANY = {
  name: "TractoTec",
  fullName: "Tractotec Servicios Generales",
  location: "Huancayo, Junín — Perú",
  address: "Jr. Nemesio Raez 2317 – Huancayo - Junín / Perú",
  phone: "+51 921 786 182",
  phoneHref: "tel:+51921786182",
  email: "riveraogedar@gmail.com",
  whatsapp: "51921786182",
};

export function whatsappLink(text) {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// [POR CONFIRMAR] Cifras no verificadas: confirmar con el cliente antes de mostrarlas.
// StatsBar no se usa actualmente en ninguna página.
export const SITE_STATS = [
  { value: "15+", label: "Años de experiencia" },
  { value: "12+", label: "Líneas de servicio" },
  { value: "100+", label: "Proyectos ejecutados" },
  { value: "24/7", label: "Atención de emergencias" },
];

export const TRUST_BADGES = [
  "Cotización sin compromiso",
  "Taller especializado en Huancayo",
  "Atención directa por WhatsApp",
];
