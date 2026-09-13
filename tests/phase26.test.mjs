import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const text = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

async function missing(path) {
  try { await access(new URL(`../${path}`, import.meta.url)); return false } catch { return true }
}

test('phase 26 uses Nuxt + Vue 3 + TypeScript and removes React/Vite runtime dependencies', async () => {
  const pkg = JSON.parse(await text('package.json'))
  assert.ok(pkg.dependencies.nuxt)
  assert.ok(pkg.dependencies.vue)
  assert.ok(pkg.devDependencies.typescript)
  for (const dependency of ['react', 'react-dom', 'react-router', 'react-router-dom', 'vite', '@vitejs/plugin-react']) {
    assert.equal(pkg.dependencies?.[dependency] ?? pkg.devDependencies?.[dependency], undefined, `${dependency} must not remain in runtime tooling`)
  }
})

test('Nuxt runtime is configured as the public FennecWeb application', async () => {
  const config = await text('nuxt.config.ts')
  assert.match(config, /contentApiBase/)
  assert.match(config, /\/api\/content\/public/)
  assert.match(config, /typeCheck:\s*true/)
  const docker = await text('Dockerfile')
  assert.match(docker, /\.output\/server\/index\.mjs/)
  assert.doesNotMatch(docker, /nginx/)
  assert.doesNotMatch(docker, /\/dist/)
})

test('existing phase 26 public routes remain represented by Nuxt file routing', async () => {
  for (const path of ['app/pages/index.vue','app/pages/web-tracking.vue','app/pages/cotizacion.vue','app/pages/servicios-logisticos.vue','app/pages/articulos/index.vue','app/pages/articulos/[slug].vue','app/pages/opiniones.vue','app/pages/500.vue']) await access(new URL(`../${path}`, import.meta.url))
})

test('ContentService access remains isolated behind the public API client', async () => {
  const client = await text('app/composables/useContentApi.ts')
  const config = await text('nuxt.config.ts')
  assert.match(client, /useRuntimeConfig/)
  assert.match(client, /\$fetch/)
  assert.match(config, /https:\/\/api\.logisticacastrofallas\.com\/api\/content\/public/)
  assert.doesNotMatch(client, /\/api\/cms\//)
})

test('legacy React entrypoints and Vite configs are removed', async () => {
  for (const path of ['src/App.tsx','src/main.tsx','vite.config.ts','vitest.config.ts','index.html','nginx.conf']) assert.equal(await missing(path), true, `${path} should be removed`)
})

test('CI validates tests, Nuxt typecheck and Nuxt build before develop', async () => {
  const ci = await text('.github/workflows/ci.yml')
  assert.match(ci, /pull_request:/)
  assert.match(ci, /develop/)
  assert.match(ci, /npm test/)
  assert.match(ci, /npm run typecheck/)
  assert.match(ci, /npm run build/)
})
