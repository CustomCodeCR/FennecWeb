import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = path => readFileSync(join(root, path), 'utf8')

const route = read('app/pages/[...slug].vue')
const renderer = read('app/components/DynamicContentRenderer.vue')
const utilities = read('app/utils/contentRenderer.ts')
const config = read('nuxt.config.ts')
const pkg = JSON.parse(read('package.json'))

test('phase 27 adds the Nuxt catch-all route and resolves ContentService by requested URL', () => {
  assert.ok(existsSync(join(root, 'app/pages/[...slug].vue')))
  assert.match(route, /route\.path/)
  assert.match(route, /buildResolveUrl\(requestedPath, siteKey, locale\)/)
  assert.match(route, /fetchPublic<PublicContentResponse>\(resolveUrl\)/)
  assert.match(route, /useAsyncData/)
})

test('phase 27 uses the existing anonymous ContentService resolve endpoint', () => {
  assert.match(config, /api\.logisticacastrofallas\.com\/api\/content\/public/)
  assert.match(utilities, /`\/resolve\?\$\{params\.toString\(\)\}`/)
  assert.match(utilities, /path:/)
  assert.match(utilities, /siteKey/)
  assert.match(utilities, /locale/)
})

test('only published public content is rendered and missing routes become 404', () => {
  assert.match(route, /content\.status\.toLowerCase\(\) !== 'published'/)
  assert.match(route, /createError\(\{ statusCode: 404/)
})

test('BlocksJson is parsed safely and only canonical visible block types are accepted', () => {
  for (const blockType of [
    'Hero', 'RichText', 'Image', 'Video', 'Gallery', 'CTA', 'ServicesGrid', 'NewsGrid',
    'FAQ', 'Testimonials', 'Logos', 'Stats', 'Team', 'Banner', 'Form', 'MeetingForm',
  ]) assert.match(utilities, new RegExp(`['\"]${blockType}['\"]`))
  assert.match(utilities, /JSON\.parse\(blocksJson/)
  assert.match(utilities, /record\.isVisible === false/)
  assert.match(utilities, /CMS_BLOCK_TYPES\.has\(type\)/)
})

test('dynamic renderer never renders unsafe HTML from BlocksJson', () => {
  assert.match(renderer, /:data-cms-block="entry\.block\.type"/)
  assert.doesNotMatch(renderer, /v-html/)
  assert.doesNotMatch(renderer, /resolveComponent\(/)
})

test('dynamic page applies CMS SEO and sanitizes structured data', () => {
  assert.match(route, /useSeoMeta/)
  assert.match(route, /useHead/)
  assert.match(route, /canonical/)
  assert.match(route, /structuredData/)
  assert.match(utilities, /replace\(\/<\/g, '\\\\u003c'\)/)
})

test('multimedia contract remains optional and public-only', () => {
  assert.match(route, /page\.value\?\.media \|\| \[\]/)
  assert.doesNotMatch(route, /\/api\/content\/items\/.*\/media/)
})

test('npm test keeps phase 26 and phase 27 regression coverage', () => {
  assert.match(pkg.scripts.test, /phase26\.test\.mjs/)
  assert.match(pkg.scripts.test, /phase27\.test\.mjs/)
})
