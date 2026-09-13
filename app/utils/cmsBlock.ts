import type { CmsBlock, PublicContentMedia } from '~/types/content'

export type CmsRecord = Record<string, unknown>

export function firstString(record: CmsRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
  }
  return undefined
}

export function recordList(record: CmsRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key]
    if (Array.isArray(value)) {
      return value.filter((item): item is CmsRecord => !!item && typeof item === 'object' && !Array.isArray(item))
    }
  }
  return []
}

export function stringList(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.flatMap(item => typeof item === 'string' && item.trim() ? [item.trim()] : [])
}

export function safeHref(value?: string) {
  if (!value) return undefined
  const href = value.trim()
  if (/^(?:https?:\/\/|mailto:|tel:|\/|#)/i.test(href)) return href
  return undefined
}

export function safeMediaUrl(value?: string | null) {
  if (!value) return undefined
  const url = value.trim()
  if (/^(?:https?:\/\/|\/)/i.test(url)) return url
  return undefined
}

export function publicMediaUrl(media?: PublicContentMedia) {
  return safeMediaUrl(media?.publicUrl) || safeMediaUrl(media?.url) || safeMediaUrl(media?.storageUrl)
}

export function findMedia(media: PublicContentMedia[], id?: string, roles: string[] = []) {
  if (id) {
    const match = media.find(item => item.id === id || item.mediaReferenceId === id)
    if (match) return match
  }
  if (roles.length) {
    const normalized = roles.map(role => role.toLowerCase())
    return media.find(item => item.role && normalized.includes(item.role.toLowerCase()))
  }
  return undefined
}

export function resolveBlockMedia(
  block: CmsBlock,
  media: PublicContentMedia[],
  options: { urlKeys?: string[], idKeys?: string[], roles?: string[] } = {},
) {
  const url = safeMediaUrl(firstString(block.data, options.urlKeys || ['imageUrl', 'videoUrl', 'src', 'url']))
  if (url) return { url, media: undefined as PublicContentMedia | undefined }
  const id = firstString(block.data, options.idKeys || ['mediaId', 'mediaReferenceId', 'imageMediaId', 'videoMediaId'])
  const item = findMedia(media, id, options.roles)
  return { url: publicMediaUrl(item), media: item }
}

export function resolveItemMedia(item: CmsRecord, media: PublicContentMedia[]) {
  const direct = safeMediaUrl(firstString(item, ['imageUrl', 'videoUrl', 'src', 'url', 'logoUrl', 'avatarUrl']))
  if (direct) return direct
  const id = firstString(item, ['mediaId', 'mediaReferenceId', 'imageMediaId', 'videoMediaId'])
  return publicMediaUrl(findMedia(media, id))
}

export function blockTitle(block: CmsBlock) {
  return firstString(block.data, ['title', 'heading', 'name'])
}

export function blockDescription(block: CmsBlock) {
  return firstString(block.data, ['description', 'subtitle', 'excerpt'])
}

export function blockBody(block: CmsBlock) {
  return firstString(block.data, ['text', 'body', 'content'])
}

export function blockLink(block: CmsBlock) {
  return safeHref(firstString(block.data, ['href', 'url', 'link', 'ctaUrl']))
}

export function blockLinkLabel(block: CmsBlock) {
  return firstString(block.data, ['label', 'ctaLabel', 'buttonText', 'linkText']) || 'Ver más'
}
