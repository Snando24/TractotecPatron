export const CATEGORY_ORDER = [
  "Traccionamiento",
  "Siniestros de chasis",
  "Pintura Industrial",
  "Reparación Pistones",
  "Fabricación",
  "Mantenimiento",
];

export const CATEGORY_SLUG_MAP = {
  Traccionamiento: "traccionamiento-chasis",
  "Siniestros de chasis": "siniestros-chasis",
  "Pintura Industrial": "pintura-industrial",
  "Reparación Pistones": "reparacion-pistones",
  Fabricación: "fabricacion-industrial",
  Mantenimiento: "mantenimiento-maquinaria",
};

export const SLUG_CATEGORY_MAP = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_MAP).map(([category, slug]) => [slug, category])
);

export const PROJECT_STATUS = {
  en_progreso: { label: "En curso", className: "bg-yellow-500 text-black" },
  completado: { label: "Completado", className: "bg-green-600 text-white" },
};

import { COMPANY } from "./site";

export const WHATSAPP_NUMBER = COMPANY.whatsapp;
