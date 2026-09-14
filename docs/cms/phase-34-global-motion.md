# FASE 34 — Sistema global de animaciones

FASE 34 crea la infraestructura de movimiento central de FennecWeb. No conecta todavía la configuración al CMS y no crea `CmsMotion`; esas responsabilidades pertenecen a FASE 35 y FASE 36.

## Presets

- `none`
- `fade`
- `fade-up`
- `fade-down`
- `fade-left`
- `fade-right`
- `slide-up`
- `slide-left`
- `slide-right`
- `zoom-in`
- `zoom-out`
- `scale`
- `blur-in`

## Configuración central

`app/motion/presets.ts` define y normaliza `duration`, `delay`, `easing`, `stagger`, `trigger`, `once` y `distance`. Los valores numéricos se limitan a rangos seguros para impedir movimientos o tiempos extremos cuando futuras fases los reciban desde el CMS.

`app/assets/css/motion-system.css` contiene todas las transiciones visuales y usa atributos `data-motion-preset`/`data-motion-state`, de modo que el futuro `CmsMotion` solo tendrá que resolver cuándo cambiar de estado.

El stagger se implementa mediante `--motion-stagger-index` y `--motion-stagger`, sin acoplar el sistema a un componente específico.

## Regla de arquitectura

El lint rechaza `animation`, `@keyframes` y `transition` fuera de `motion-system.css`. Así los componentes no pueden crear animaciones independientes y todo Fennec reutiliza el mismo sistema.
