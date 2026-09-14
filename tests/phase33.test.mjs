import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const designSystem = await readFile(new URL('../app/assets/css/design-system.css', import.meta.url), 'utf8')
const mainCss = await readFile(new URL('../app/assets/css/main.css', import.meta.url), 'utf8')
const cmsCss = await readFile(new URL('../app/assets/css/cms.css', import.meta.url), 'utf8')
const tokens = await readFile(new URL('../app/design-system/tokens.ts', import.meta.url), 'utf8')
const nuxt = await readFile(new URL('../nuxt.config.ts', import.meta.url), 'utf8')
const page = await readFile(new URL('../app/pages/[...slug].vue', import.meta.url), 'utf8')

test('FASE 33 defines the complete Fennec visual token families', () => {
  for (const token of [
    '--ds-color-primary',
    '--ds-color-secondary',
    '--ds-font-family-sans',
    '--ds-font-size-display',
    '--ds-font-size-base',
    '--ds-space-4',
    '--ds-radius-md',
    '--ds-shadow-card',
    '--ds-button-padding-y',
    '--ds-container-max',
    '--ds-grid-gap-lg',
    '--ds-breakpoint-mobile',
    '--ds-breakpoint-tablet',
    '--ds-breakpoint-desktop',
  ]) assert.match(designSystem, new RegExp(token))
})

test('FASE 33 loads the Design System before application and CMS styles', () => {
  assert.match(nuxt, /design-system\.css'.*main\.css'.*cms\.css'/s)
})

test('FASE 33 application styles consume tokens instead of local color values', () => {
  for (const stylesheet of [mainCss, cmsCss]) {
    assert.doesNotMatch(stylesheet, /#[0-9a-f]{3,8}\b/i)
    assert.doesNotMatch(stylesheet, /rgba?\s*\(/i)
    assert.match(stylesheet, /var\(--ds-/)
  }
})

test('FASE 33 publishes shared breakpoints for TypeScript consumers', () => {
  assert.match(tokens, /mobile:\s*620/)
  assert.match(tokens, /tablet:\s*900/)
  assert.match(tokens, /desktop:\s*1180/)
  assert.match(tokens, /wide:\s*1440/)
})

test('FASE 33 dynamic CMS page uses semantic Design System classes', () => {
  assert.match(page, /class="cms-page"/)
  assert.match(page, /class="cms-page-header"/)
  assert.match(page, /class="cms-page-title"/)
  assert.doesNotMatch(page, /text-\[|bg-|border-slate|px-\d|py-\d/)
})
