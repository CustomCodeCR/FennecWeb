# FASE 32 — Instrumentación pública

FennecWeb registra una visita cuando una página CMS publicada termina de hidratarse en el cliente y registra clicks explícitos de `CmsCta`.

La instrumentación usa `/api/public/analytics/page-views` y `/api/public/analytics/clicks`, conserva `campaignId` y parámetros UTM de la URL, y nunca bloquea la navegación si el servicio de analítica no está disponible.

El reporting y las agregaciones permanecen exclusivamente en `DholeReportsService`.
