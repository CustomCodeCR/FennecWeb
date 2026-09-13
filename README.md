# FennecWeb

Página pública de Grupo Castro Fallas construida con **Nuxt, Vue 3 y TypeScript**.

## Desarrollo

```bash
npm install
npm run dev
```

## Validación

```bash
npm test
npm run typecheck
npm run build
```

## Configuración

Nuxt usa variables de runtime para los servicios externos:

- `NUXT_PUBLIC_CONTENT_API_BASE`: base de la API pública de `DholeContentService`. Valor por defecto: `https://api.logisticacastrofallas.com/api/public`.
- `NUXT_PUBLIC_TRACKING_API_BASE`: API del tracking público. Conserva por defecto el backend histórico `http://127.0.0.1:8000` para desarrollo y debe configurarse en despliegues.

La integración CMS está centralizada en `app/composables/useContentApi.ts`. FASE 26 no implementa el renderer dinámico por URL; el catch-all `pages/[...slug].vue` corresponde a FASE 27.

## Docker

El contenedor ejecuta el servidor Nitro generado por Nuxt en el puerto 80 y expone `GET /health` para los workflows de despliegue existentes.
