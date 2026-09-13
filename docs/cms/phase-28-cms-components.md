# FASE 28 — Componentes CMS en Nuxt

FennecWeb renderiza los bloques del Page Builder mediante componentes Vue explícitos y un registro cerrado.

## Componentes

`CmsHero`, `CmsRichText`, `CmsImage`, `CmsVideo`, `CmsGallery`, `CmsBanner`, `CmsCta`, `CmsFaq`, `CmsTestimonials`, `CmsServicesGrid`, `CmsNewsGrid`, `CmsForm`, `CmsMeetingForm`, `CmsLogos`, `CmsStats` y `CmsTeam`.

## Registro

`app/utils/cmsComponentRegistry.ts` es la única fuente para resolver un tipo de bloque a un componente. El JSON del CMS nunca se pasa directamente a `resolveComponent` ni a `:is`.

Los nombres del Page Builder se normalizan (`hero`, `richText`, `meetingForm`, etc.) a las claves canónicas que usa el registro.

## Seguridad

- No se usa `v-html`.
- No se permite JavaScript o Vue proveniente de `BlocksJson`.
- Links y media aceptan únicamente protocolos/rutas permitidos.
- Los tipos desconocidos se descartan antes de renderizar.

FASE 29 queda fuera de este cambio: formularios y componentes se presentan visualmente, pero la separación definitiva de endpoints `/api/cms/*` y `/api/public/*` se implementa en la siguiente fase.
