function normalizeBase(value: unknown) {
  return String(value || '').replace(/\/+$/, '')
}

function firstQueryValue(value: unknown) {
  if (Array.isArray(value)) return value.length ? String(value[0] || '') : undefined
  if (value === undefined || value === null || value === '') return undefined
  return String(value)
}

function validGuid(value?: string) {
  return value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) ? value : undefined
}

export function useContentAnalytics() {
  const config = useRuntimeConfig()
  const route = useRoute()
  const contentBase = normalizeBase(config.public.contentApiBase)
  const analyticsBase = contentBase
    .replace(/\/api\/content\/public$/i, '/api/public')
    .replace(/\/api\/public$/i, '/api/public')
  const trackedPages = useState<Record<string, boolean>>('content-analytics-page-views', () => ({}))

  function attribution() {
    return {
      campaignId: validGuid(firstQueryValue(route.query.campaignId)),
      utmSource: firstQueryValue(route.query.utm_source),
      utmMedium: firstQueryValue(route.query.utm_medium),
      utmCampaign: firstQueryValue(route.query.utm_campaign),
      utmContent: firstQueryValue(route.query.utm_content),
      utmTerm: firstQueryValue(route.query.utm_term),
    }
  }

  async function post(path: string, body: Record<string, unknown>) {
    if (import.meta.server) return
    try {
      await $fetch(`${analyticsBase}${path}`, { method: 'POST', body })
    } catch {
      // Analytics must never block public navigation or content rendering.
    }
  }

  async function trackPageView(input: { siteKey: string, contentId?: string, path: string, locale: string }) {
    if (import.meta.server) return
    const key = `${input.siteKey}:${input.locale}:${input.path}`
    if (trackedPages.value[key]) return
    trackedPages.value[key] = true
    await post('/analytics/page-views', {
      ...input,
      ...attribution(),
      referrerUrl: document.referrer || undefined,
    })
  }

  async function trackClick(input: { targetKey: string, interactionType?: string, contentId?: string, placementId?: string }) {
    await post('/analytics/clicks', {
      siteKey: String(config.public.contentSiteKey || 'main'),
      interactionType: input.interactionType || 'cta',
      targetKey: input.targetKey,
      contentId: validGuid(input.contentId),
      placementId: validGuid(input.placementId),
      sourceUrl: import.meta.client ? window.location.href : undefined,
      ...attribution(),
    })
  }

  return { trackPageView, trackClick }
}
