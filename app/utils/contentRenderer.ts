import { normalizeMotionConfig, type MotionConfigInput } from '~/motion/presets'
import type { CmsBlock, PublicContentPage, PublicContentResponse } from '~/types/content'

export const CMS_BLOCK_TYPES = new Set([
  'Hero', 'RichText', 'Image', 'Video', 'Gallery', 'CTA', 'ServicesGrid', 'NewsGrid',
  'FAQ', 'Testimonials', 'Logos', 'Stats', 'Team', 'Banner', 'Form', 'MeetingForm',
])

const CMS_BLOCK_TYPE_ALIASES = new Map<string, string>([
  ['hero', 'Hero'],
  ['richtext', 'RichText'],
  ['image', 'Image'],
  ['video', 'Video'],
  ['gallery', 'Gallery'],
  ['cta', 'CTA'],
  ['servicesgrid', 'ServicesGrid'],
  ['newsgrid', 'NewsGrid'],
  ['faq', 'FAQ'],
  ['testimonials', 'Testimonials'],
  ['logos', 'Logos'],
  ['stats', 'Stats'],
  ['team', 'Team'],
  ['banner', 'Banner'],
  ['form', 'Form'],
  ['meetingform', 'MeetingForm'],
])

export function normalizeCmsBlockType(value: string) {
  const key = value.trim().replace(/[\s_-]+/g, '').toLowerCase()
  return CMS_BLOCK_TYPE_ALIASES.get(key)
}

export function normalizePublicPath(value: string) {
  const path = value.split('?')[0]?.split('#')[0] || '/'
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/')
  if (collapsed.length > 1 && collapsed.endsWith('/')) return collapsed.slice(0, -1)
  return collapsed || '/'
}

export function buildResolveUrl(path: string, siteKey: string, locale: string) {
  const params = new URLSearchParams({
    path: normalizePublicPath(path),
    siteKey,
    locale,
  })
  return `/resolve?${params.toString()}`
}

export function unwrapPublicContent(response: PublicContentResponse): PublicContentPage {
  const candidate = 'data' in response ? response.data : response
  if (!candidate || typeof candidate !== 'object' || !candidate.id || !candidate.title || !candidate.blocksJson) {
    throw new Error('ContentService returned an invalid public content payload.')
  }
  return candidate
}

export function parseCmsBlocks(blocksJson: string): CmsBlock[] {
  let raw: unknown
  try {
    raw = JSON.parse(blocksJson || '[]')
  } catch {
    return []
  }

  if (!Array.isArray(raw)) return []

  return raw.flatMap((value, index) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return []
    const record = value as Record<string, unknown>
    const rawType = typeof record.type === 'string' ? record.type : ''
    const type = normalizeCmsBlockType(rawType)
    if (!type || !CMS_BLOCK_TYPES.has(type) || record.isVisible === false) return []

    const animationInput = record.animation && typeof record.animation === 'object' && !Array.isArray(record.animation)
      ? record.animation as MotionConfigInput
      : undefined

    return [{
      id: typeof record.id === 'string' && record.id ? record.id : `${type}-${index}`,
      type,
      isVisible: true,
      data: record.data && typeof record.data === 'object' && !Array.isArray(record.data)
        ? record.data as Record<string, unknown>
        : {},
      animation: normalizeMotionConfig(animationInput),
    }]
  })
}

export function safeStructuredData(value?: string | null) {
  if (!value) return undefined
  try {
    const parsed = JSON.parse(value)
    if (!parsed || typeof parsed !== 'object') return undefined
    return JSON.stringify(parsed).replace(/</g, '\\u003c')
  } catch {
    return undefined
  }
}
