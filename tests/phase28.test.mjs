import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = path => readFileSync(join(root, path), 'utf8')
const registry = read('app/utils/cmsComponentRegistry.ts')
const renderer = read('app/components/DynamicContentRenderer.vue')
const parser = read('app/utils/contentRenderer.ts')
const helper = read('app/utils/cmsBlock.ts')
const pkg = JSON.parse(read('package.json'))

const components = [
  'CmsHero', 'CmsRichText', 'CmsImage', 'CmsVideo', 'CmsGallery', 'CmsBanner', 'CmsCta',
  'CmsFaq', 'CmsTestimonials', 'CmsServicesGrid', 'CmsNewsGrid', 'CmsForm', 'CmsMeetingForm',
  'CmsLogos', 'CmsStats', 'CmsTeam',
]

test('phase 28 creates every required CMS Nuxt component', () => {
  for (const name of components) assert.ok(existsSync(join(root, 'app/components', `${name}.vue`)), `${name}.vue is required`)
})

test('all CMS block types are explicitly allow-listed in a component registry', () => {
  const mappings = {
    Hero: 'CmsHero', RichText: 'CmsRichText', Image: 'CmsImage', Video: 'CmsVideo', Gallery: 'CmsGallery',
    Banner: 'CmsBanner', CTA: 'CmsCta', FAQ: 'CmsFaq', Testimonials: 'CmsTestimonials', ServicesGrid: 'CmsServicesGrid',
    NewsGrid: 'CmsNewsGrid', Form: 'CmsForm', MeetingForm: 'CmsMeetingForm', Logos: 'CmsLogos', Stats: 'CmsStats', Team: 'CmsTeam',
  }
  for (const [type, component] of Object.entries(mappings)) {
    assert.match(registry, new RegExp(`${type}:\\s*${component}`))
    assert.match(registry, new RegExp(`import ${component} from`))
  }
  assert.match(registry, /Object\.freeze/)
})

test('renderer resolves only components from the explicit registry', () => {
  assert.match(renderer, /resolveCmsComponent\(block\.type\)/)
  assert.match(renderer, /<component/)
  assert.match(renderer, /:is="entry\.component"/)
  assert.doesNotMatch(renderer, /resolveComponent\(/)
  assert.doesNotMatch(renderer, /:is="entry\.block\.type"/)
})

test('CMS example block names normalize to canonical registry keys', () => {
  for (const alias of ['hero', 'richtext', 'video', 'faq', 'form', 'meetingform']) assert.match(parser, new RegExp(`\\['${alias}',`))
  assert.match(parser, /normalizeCmsBlockType\(rawType\)/)
})

test('CMS rendering keeps rich text, media and links on safe protocols without arbitrary HTML', () => {
  assert.doesNotMatch(renderer, /v-html/)
  assert.doesNotMatch(helper, /eval\(|new Function/)
  assert.match(helper, /https\?:\\\/\\\//)
  assert.match(helper, /mailto:/)
  assert.match(helper, /tel:/)
  for (const name of components) assert.doesNotMatch(read(`app/components/${name}.vue`), /v-html/)
})

test('Nuxt loads CMS styles and npm test includes phase 28 regression coverage', () => {
  assert.match(read('nuxt.config.ts'), /cms\.css/)
  assert.match(pkg.scripts.test, /phase28\.test\.mjs/)
})
