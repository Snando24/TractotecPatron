# ACCESSIBILITY.md

## 1. Objetivo

Referencia WCAG 2.1 AA (sin certificación ni auditoría formal; no se afirma cumplimiento total).

## 2. Semántica

- `<nav aria-label>`, `<main>`, `<footer>`; un `<h1>` por página; títulos del footer como `<h2>`.
- Tarjetas clicables (`div onClick`) convertidas en `<button type="button">` en Servicios, Proyectos y página de Servicios.

## 3. Teclado

- Todos los elementos interactivos son botones/enlaces nativos.
- Modal de imagen: `role="dialog"`, `aria-modal`, foco en el botón cerrar, Escape cierra, foco atrapado y devuelto al cerrar, scroll del body bloqueado.
- Menú móvil: `aria-label`, `aria-expanded`, `aria-controls`.

## 4. Formularios

- Contacto y panel: `<label htmlFor>` asociado a cada campo, `autocomplete`, errores con `role="alert"` (antes `alert()` nativo).
- Se añadió el campo "Ubicación del equipo", que el mensaje ya incluía pero no tenía input.

## 5. Imágenes

- `alt` descriptivos; logo del navbar con `alt=""` (el enlace tiene `aria-label`); iconos decorativos con `aria-hidden`.
- Fondos del hero marcados `aria-hidden`.
- `iframe` del mapa con `title`.

## 6. Contraste

Algunos textos `text-gray-500` sobre negro se subieron a `gray-400`. Pendiente: auditoría con herramienta (Lighthouse/axe) de amarillos/rojos sobre fondos oscuros.

## 7. Componentes complejos

Filtros de proyectos: `role="group"` + `aria-pressed`.

## 8. Responsive y zoom

Layout responsive con Tailwind. Pendiente: probar a 200 % de zoom.

## 9. Movimiento

El carrusel del hero no rota si el usuario tiene `prefers-reduced-motion: reduce`. Pendiente: respetarlo también en animaciones de hover/escala (`motion-safe:`).

## 10. Auditoría

| Fecha | Herramienta | Resultado |
|---|---|---|
| [POR DEFINIR] | Lighthouse / axe | [POR DEFINIR] |
