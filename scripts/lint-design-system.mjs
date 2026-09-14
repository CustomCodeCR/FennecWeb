import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const appRoot = join(root, 'app')
const violations = []

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await collect(full))
    else files.push(full)
  }
  return files
}

function assertTokenizedProperty(source, rel, property, message) {
  const pattern = new RegExp(`${property}\\s*:\\s*([^;}\\n]+)`, 'gi')
  for (const match of source.matchAll(pattern)) {
    const value = match[1]?.trim() ?? ''
    if (!value.startsWith('var(')) violations.push(`${rel}: ${message} Found: ${property}: ${value}`)
  }
}

const files = await collect(appRoot)
for (const file of files) {
  const rel = relative(root, file).replaceAll('\\', '/')
  const extension = extname(file)
  if (!['.vue', '.css'].includes(extension)) continue
  const source = await readFile(file, 'utf8')

  if (extension === '.vue') {
    if (/<style(?:\s|>)/i.test(source)) violations.push(`${rel}: component-local <style> is not allowed; use the Fennec Design System.`)
    if (/\sstyle\s*=/.test(source)) violations.push(`${rel}: inline style attributes are not allowed.`)
    if (/#[0-9a-f]{3,8}\b/i.test(source)) violations.push(`${rel}: hard-coded colors are not allowed in Vue components.`)
  }

  if (rel === 'app/assets/css/main.css' || rel === 'app/assets/css/cms.css') {
    if (/#[0-9a-f]{3,8}\b/i.test(source) || /rgba?\s*\(/i.test(source)) {
      violations.push(`${rel}: colors must come from design-system.css tokens.`)
    }
    assertTokenizedProperty(source, rel, 'border-radius', 'border radius must use a design-system token.')
    assertTokenizedProperty(source, rel, 'box-shadow', 'shadows must use a design-system token.')
    assertTokenizedProperty(source, rel, 'font-family', 'font families must use a design-system token.')
  }
}

if (violations.length) {
  console.error(violations.join('\n'))
  process.exit(1)
}

console.log('Fennec Design System lint passed.')
