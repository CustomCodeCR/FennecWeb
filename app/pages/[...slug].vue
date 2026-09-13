<script setup lang="ts">
import type { PublicContentMedia, PublicContentResponse } from '~/types/content'
import {
  buildResolveUrl,
  normalizePublicPath,
  parseCmsBlocks,
  safeStructuredData,
  unwrapPublicContent,
} from '~/utils/contentRenderer'

const route = useRoute()
const config = useRuntimeConfig()
const { fetchPublic } = useContentApi()
const { trackPageView } = useContentAnalytics()

const requestedPath = normalizePublicPath(route.path)
const siteKey = String(config.public.contentSiteKey || 'main')
const locale = String(config.public.contentLocale || 'es-CR')
const resolveUrl = buildResolveUrl(requestedPath, siteKey, locale)

const { data: page, error } = await useAsyncData(
  `public-content:${siteKey}:${locale}:${requestedPath}`,
  async () => {
    try {
      const response = await fetchPublic<PublicContentResponse>(resolveUrl)
      const content = unwrapPublicContent(response)
      if (content.status.toLowerCase() !== 'published') {
        throw createError({ statusCode: 404, statusMessage: 'Contenido no encontrado' })
      }
      return content
    } catch (cause: unknown) {
      const source = cause as { statusCode?: number, status?: number, response?: { status?: number } }
      const statusCode = source.statusCode || source.status || source.response?.status
      if (statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Contenido no encontrado' })
      throw cause
    }
  },
)

if (error.value) throw error.value
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Contenido no encontrado' })

const blocks = computed(() => parseCmsBlocks(page.value?.blocksJson || '[]'))
const hasHero = computed(() => blocks.value.some(block => block.type === 'Hero'))
const media = computed(() => page.value?.media || [])

function publicMediaUrl(item?: PublicContentMedia) {
  return item?.publicUrl || item?.url || item?.storageUrl || undefined
}

function findMediaUrl(id?: string | null) {
  if (!id) return undefined
  const item = media.value.find(value => value.id === id || value.mediaReferenceId === id)
  return publicMediaUrl(item)
}

const openGraphImage = computed(() => findMediaUrl(page.value?.seo.openGraphMediaId) || findMediaUrl(page.value?.featuredMediaId))
const structuredData = computed(() => safeStructuredData(page.value?.seo.structuredDataJson))

onMounted(() => {
  if (!page.value) return
  void trackPageView({ siteKey, contentId: page.value.id, path: requestedPath, locale })
})

useSeoMeta({
  title: () => page.value?.seo.title || page.value?.title || 'Grupo Castro Fallas',
  description: () => page.value?.seo.description || page.value?.excerpt || undefined,
  robots: () => page.value?.seo.robots || 'index,follow',
  ogTitle: () => page.value?.seo.title || page.value?.title || undefined,
  ogDescription: () => page.value?.seo.description || page.value?.excerpt || undefined,
  ogImage: () => openGraphImage.value,
  twitterCard: () => openGraphImage.value ? 'summary_large_image' : 'summary',
})

useHead(() => ({
  link: page.value?.seo.canonicalUrl ? [{ rel: 'canonical', href: page.value.seo.canonicalUrl }] : [],
  meta: page.value?.seo.keywords ? [{ name: 'keywords', content: page.value.seo.keywords }] : [],
  script: structuredData.value ? [{ type: 'application/ld+json', innerHTML: structuredData.value }] : [],
}))
</script>

<template>
  <main class="min-h-screen bg-white">
    <header v-if="page && !hasHero" class="border-b border-slate-100 bg-slate-50 py-12 sm:py-16">
      <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p class="text-xs font-extrabold uppercase tracking-[0.18em] text-[#c8171d]">{{ page.type }}</p>
        <h1 class="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{{ page.title }}</h1>
        <p v-if="page.excerpt" class="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{{ page.excerpt }}</p>
      </div>
    </header>
    <DynamicContentRenderer v-if="page" :blocks="blocks" :media="media" />
    <section v-if="page && blocks.length === 0" class="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
      <p class="text-slate-600">{{ page.excerpt || page.title }}</p>
    </section>
  </main>
</template>
