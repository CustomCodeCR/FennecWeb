# FASE 33 — Fennec Design System

FASE 33 crea una fuente visual central para FennecWeb y no introduce animaciones ni configuración CMS de fases posteriores.

## Fuente de verdad

`app/assets/css/design-system.css` contiene los tokens compartidos. `main.css` y `cms.css` únicamente consumen esos tokens para aplicar estilos a páginas y componentes existentes.

## Paleta

Se conserva la identidad visual existente de Fennec:

- Primary: `#c8171d`
- Primary hover: `#a91017`
- Secondary/ink: `#111827`
- Neutrales para texto, superficies y bordes.

No se crea una nueva identidad de marca en esta fase.

## Sistema definido

- colores oficiales y secundarios
- familia tipográfica y pesos
- escala para display, títulos y texto
- escala de spacing
- border radius
- sombras
- botones
- cards
- containers
- grids y gaps
- breakpoints: mobile 620px, tablet 900px, desktop 1180px, wide 1440px

Los breakpoints también están disponibles en `app/design-system/tokens.ts` para consumidores TypeScript. Los media queries CSS reflejan esos mismos valores porque las custom properties no pueden utilizarse directamente como condiciones de media query.

## Reglas

Los componentes Vue no deben agregar `<style>`, atributos `style` ni colores hexadecimales hardcodeados. `main.css` y `cms.css` no pueden definir colores, radios, sombras o familias tipográficas independientes del Design System. `npm run lint` valida estas reglas.

## Compatibilidad

Las clases públicas existentes (`container`, `section`, `btn`, `card-grid`, `cms-*`, etc.) se mantienen para no romper las fases anteriores; su implementación ahora usa tokens `--ds-*`.
