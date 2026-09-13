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
  ]) {
    assert.match(utilities, new RegExp(`['\"]${blockType}['\"]`))
  }
  assert.match(utilities, /JSON\.parse\(blocksJson/)
  assert.match(utilities, /record\.isVisible === false/)
  assert.match(utilities, /CMS_BLOCK_TYPES\.has\(type\)/)
})

test('generic renderer renders every block without unsafe HTML or arbitrary Vue components', () => {
  assert.match(renderer, /v-for="block in blocks"/)
  assert.match(renderer, /:data-cms-block="block\.type"/)
  assert.doesNotMatch(renderer, /v-html/)
  assert.doesNotMatch(renderer, /<component\s|:is=/)
  assert.doesNotMatch(renderer, /CmsHero|CmsRichText|CmsImage/)
})

test('dynamic page applies CMS SEO and sanitizes structured data', () => {
  assert.match(route, /useSeoMeta/)
  assert.match(route, /useHead/)
  assert.match(route, /canonical/)
  assert.match(route, /structuredData/)
  assert.match(utilities, /replace\(\/<\/g, '\\\\u003c'\)/)
})

test('multimedia contract is optional and supports public URLs without opening admin endpoints', () => {
  assert.match(route, /page\.value\?\.media \|\| \[\]/)
  assert.match(renderer, /publicUrl/)
  assert.match(renderer, /mediaReferenceId/)
  assert.doesNotMatch(route, /\/api\/content\/items\/.*\/media/)
})

test('phase 28 component registry is not implemented in phase 27', () => {
  for (const component of ['CmsHero.vue', 'CmsRichText.vue', 'CmsImage.vue', 'CmsVideo.vue']) {
    assert.equal(existsSync(join(root, 'app/components', component)), false)
  }
})

test('npm test keeps phase 26 regression coverage and adds phase 27', () => {
  assert.match(pkg.scripts.test, /phase26\.test\.mjs/)
  assert.match(pkg.scripts.test, /phase27\.test\.mjs/)
})
