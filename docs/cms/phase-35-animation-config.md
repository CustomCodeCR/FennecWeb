# FASE 35 — Configuración de animaciones desde CMS

FennecWeb reconoce la propiedad opcional `animation` de cada bloque CMS y la normaliza utilizando directamente el contrato central creado en FASE 34.

Si `animation` no existe o no tiene una forma válida, `normalizeMotionConfig` entrega la configuración segura por defecto (`preset: none`). Valores numéricos consumidos por el frontend permanecen limitados por los rangos del Motion System.

Esta fase solo transporta y sanitiza la configuración. No crea `CmsMotion`, no usa `IntersectionObserver` y no ejecuta todavía la animación del bloque.
