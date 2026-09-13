import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const analytics = await readFile(new URL('../app/composables/useContentAnalytics.ts', import.meta.url), 'utf8')
const page = await readFile(new URL('../app/pages/[...slug].vue', import.meta.url), 'utf8')
const cta = await readFile(new URL('../app/components/CmsCta.vue', import.meta.url), 'utf8')

test('FASE 32 tracks page views only on the client after published content renders', () => {
  assert.match(page, /onMounted/)
  assert.match(page, /trackPageView/)
  assert.match(analytics, /import\.meta\.server/)
  assert.match(analytics, /page-views/)
})

test('FASE 32 propagates campaign and UTM attribution', () => {
  for (const key of ['campaignId', 'utmSource', 'utmMedium', 'utmCampaign', 'utmContent', 'utmTerm']) {
    assert.match(analytics, new RegExp(key))
  }
})

test('FASE 32 records CMS CTA clicks without blocking navigation', () => {
  assert.match(cta, /@click="trackCta"/)
  assert.match(cta, /interactionType: 'cta'/)
  assert.match(analytics, /catch \{/)
})
