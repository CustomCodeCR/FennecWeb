# FASE 27 — Renderer dinámico en FennecWeb

## Alcance

FennecWeb resuelve contenido público por la URL solicitada usando el endpoint existente de `DholeContentService`:

`GET /api/content/public/resolve?path={path}&siteKey={siteKey}&locale={locale}`

La ruta Nuxt `app/pages/[...slug].vue` cubre las URLs públicas que no tienen una página estática más específica.

## Flujo

1. Nuxt obtiene `route.path` y lo normaliza.
2. FennecWeb consulta `/resolve` con `siteKey=main` y `locale=es-CR` por defecto.
3. Solo se acepta contenido `Published`.
4. `BlocksJson` se convierte en una lista de bloques canónicos visibles.
5. La página aplica SEO, canonical, robots, OpenGraph y JSON-LD recibido desde ContentService.
6. `DynamicContentRenderer` renderiza cada bloque de forma genérica y segura.

## Seguridad

- No usa `v-html`.
- No permite componentes Vue arbitrarios.
- No ejecuta JavaScript recibido desde CMS.
- Solo acepta los tipos de bloque permitidos por el Page Builder.
- JSON-LD se parsea y serializa de nuevo antes de insertarse en `<head>`.
- Contenido no publicado o rutas inexistentes terminan en 404.

## Multimedia

El contrato de FennecWeb acepta opcionalmente `media` con URLs públicas y puede relacionarlo mediante `id` o `mediaReferenceId`. El endpoint `/resolve` actual ya expone `FeaturedMediaId` y `Seo.OpenGraphMediaId`, pero las asociaciones completas `content_media` siguen protegidas por la API administrativa.

FASE 27 no abre esos endpoints. Cuando la API pública exponga multimedia completa, el renderer podrá usarla sin cambiar el flujo de resolución.

## Fuera de alcance

- No se crean `CmsHero`, `CmsRichText`, `CmsImage`, etc.; pertenecen a FASE 28.
- No se reorganizan APIs bajo `/api/public/*`; pertenece a FASE 29.
- No se implementa preview de Draft; pertenece a FASE 30.
- No se implementa Redis/cache; pertenece a FASE 31.
