import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const types = await readFile(new URL('../app/types/content.ts', import.meta.url), 'utf8')
const renderer = await readFile(new URL('../app/utils/contentRenderer.ts', import.meta.url), 'utf8')
const presets = await readFile(new URL('../app/motion/presets.ts', import.meta.url), 'utf8')

const fields = ['preset', 'duration', 'delay', 'easing', 'stagger', 'trigger', 'once', 'distance']

test('FASE 35 adds animation configuration to the CMS block contract', () => {
  assert.match(types, /animation:\s*MotionConfig/)
  assert.match(renderer, /record\.animation/)
  assert.match(renderer, /normalizeMotionConfig\(animationInput\)/)
})

test('FASE 35 reuses the FASE 34 contract instead of defining a second animation system', () => {
  assert.match(renderer, /from '~\/motion\/presets'/)
  for (const field of fields) assert.match(presets, new RegExp(`${field}:`))
  assert.doesNotMatch(renderer, /IntersectionObserver/)
  assert.doesNotMatch(renderer, /CmsMotion/)
})

test('FASE 35 keeps missing or malformed animation data safe by using central defaults', () => {
  assert.match(renderer, /animationInput[\s\S]*undefined/)
  assert.match(presets, /preset:\s*'none'/)
  assert.match(presets, /duration:\s*600/)
  assert.match(presets, /distance:\s*32/)
  assert.match(presets, /0, 3000/)
  assert.match(presets, /0, 1000/)
  assert.match(presets, /0, 160/)
})
