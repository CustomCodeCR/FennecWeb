import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const css = await readFile(new URL('../app/assets/css/motion-system.css', import.meta.url), 'utf8')
const presets = await readFile(new URL('../app/motion/presets.ts', import.meta.url), 'utf8')
const nuxt = await readFile(new URL('../nuxt.config.ts', import.meta.url), 'utf8')
const lint = await readFile(new URL('../scripts/lint-design-system.mjs', import.meta.url), 'utf8')

const requiredPresets = [
  'none', 'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
  'slide-up', 'slide-left', 'slide-right', 'zoom-in', 'zoom-out', 'scale', 'blur-in',
]

test('FASE 34 exposes every roadmap motion preset centrally', () => {
  for (const preset of requiredPresets) {
    assert.match(presets, new RegExp(`['\"]${preset}['\"]`))
    assert.match(css, new RegExp(`data-motion-preset=['\"]${preset}['\"]`))
  }
})

test('FASE 34 central configuration contains all required controls', () => {
  for (const property of ['duration', 'delay', 'easing', 'stagger', 'trigger', 'once', 'distance']) {
    assert.match(presets, new RegExp(`${property}:`))
  }
  assert.match(presets, /normalizeMotionConfig/)
  assert.match(presets, /motionCssVariables/)
})

test('FASE 34 loads the motion system globally and prevents independent CSS animations', () => {
  assert.match(nuxt, /motion-system\.css/)
  assert.match(lint, /animations must be defined in motion-system\.css/)
  assert.match(lint, /transitions must be defined in motion-system\.css/)
})

test('FASE 34 defines stagger without coupling it to a component', () => {
  assert.match(css, /--motion-stagger-index/)
  assert.match(css, /--motion-stagger/)
  assert.doesNotMatch(css, /CmsMotion/)
})
