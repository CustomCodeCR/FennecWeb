export const motionPresets = [
  'none',
  'fade',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'slide-up',
  'slide-left',
  'slide-right',
  'zoom-in',
  'zoom-out',
  'scale',
  'blur-in',
] as const

export const motionEasings = ['standard', 'decelerate', 'accelerate', 'linear'] as const
export const motionTriggers = ['scroll', 'load'] as const

export type MotionPreset = typeof motionPresets[number]
export type MotionEasing = typeof motionEasings[number]
export type MotionTrigger = typeof motionTriggers[number]

export interface MotionConfig {
  preset: MotionPreset
  duration: number
  delay: number
  easing: MotionEasing
  stagger: number
  trigger: MotionTrigger
  once: boolean
  distance: number
}

export type MotionConfigInput = Partial<MotionConfig>

export const defaultMotionConfig: MotionConfig = {
  preset: 'none',
  duration: 600,
  delay: 0,
  easing: 'standard',
  stagger: 100,
  trigger: 'scroll',
  once: true,
  distance: 32,
}

const easingCssVariables: Record<MotionEasing, string> = {
  standard: 'var(--motion-easing-standard)',
  decelerate: 'var(--motion-easing-decelerate)',
  accelerate: 'var(--motion-easing-accelerate)',
  linear: 'var(--motion-easing-linear)',
}

function clamp(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === 'number' && Number.isFinite(value) ? value : fallback
  return Math.min(max, Math.max(min, numeric))
}

function includes<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === 'string' && values.includes(value as T[number])
}

export function normalizeMotionConfig(input?: MotionConfigInput | null): MotionConfig {
  return {
    preset: includes(motionPresets, input?.preset) ? input.preset : defaultMotionConfig.preset,
    duration: clamp(input?.duration, defaultMotionConfig.duration, 0, 3000),
    delay: clamp(input?.delay, defaultMotionConfig.delay, 0, 3000),
    easing: includes(motionEasings, input?.easing) ? input.easing : defaultMotionConfig.easing,
    stagger: clamp(input?.stagger, defaultMotionConfig.stagger, 0, 1000),
    trigger: includes(motionTriggers, input?.trigger) ? input.trigger : defaultMotionConfig.trigger,
    once: typeof input?.once === 'boolean' ? input.once : defaultMotionConfig.once,
    distance: clamp(input?.distance, defaultMotionConfig.distance, 0, 160),
  }
}

export function motionCssVariables(config: MotionConfig): Record<string, string> {
  return {
    '--motion-duration': `${config.duration}ms`,
    '--motion-delay': `${config.delay}ms`,
    '--motion-stagger': `${config.stagger}ms`,
    '--motion-distance': `${config.distance}px`,
    '--motion-easing': easingCssVariables[config.easing],
  }
}
