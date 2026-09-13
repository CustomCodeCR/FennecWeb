<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'

const props = withDefaults(defineProps<{
  blocks: CmsBlock[]
  media?: PublicContentMedia[]
}>(), {
  media: () => [],
})

const preferredTitleKeys = ['title', 'heading', 'name']
const preferredDescriptionKeys = ['description', 'subtitle', 'excerpt']
const preferredBodyKeys = ['text', 'body', 'content']
const preferredLinkKeys = ['href', 'url', 'link', 'ctaUrl']
const preferredLabelKeys = ['label', 'ctaLabel', 'buttonText', 'linkText']
const preferredImageKeys = ['imageUrl', 'src', 'image', 'backgroundUrl']

function firstString(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return undefined
}

function mediaUrl(media?: PublicContentMedia) {
  return media?.publicUrl || media?.url || media?.storageUrl || undefined
}

function mediaFor(block: CmsBlock) {
  const id = firstString(block.data, ['mediaId', 'mediaReferenceId', 'imageMediaId', 'videoMediaId'])
  if (!id) return undefined
  return props.media.find(item => item.id === id || item.mediaReferenceId === id)
}

function blockImage(block: CmsBlock) {
  const direct = firstString(block.data, preferredImageKeys)
  if (direct) return direct
  return mediaUrl(mediaFor(block))
}

function blockTitle(block: CmsBlock) {
  return firstString(block.data, preferredTitleKeys)
}

function blockDescription(block: CmsBlock) {
  return firstString(block.data, preferredDescriptionKeys)
}

function blockBody(block: CmsBlock) {
  return firstString(block.data, preferredBodyKeys)
}

function blockHref(block: CmsBlock) {
  return firstString(block.data, preferredLinkKeys)
}

function blockLabel(block: CmsBlock) {
  return firstString(block.data, preferredLabelKeys) || 'Ver más'
}

function flattenText(value: unknown, depth = 0): string[] {
  if (depth > 3 || value == null) return []
  if (typeof value === 'string') return value.trim() ? [value.trim()] : []
  if (typeof value === 'number' || typeof value === 'boolean') return [String(value)]
  if (Array.isArray(value)) return value.flatMap(item => flattenText(item, depth + 1))
  if (typeof value === 'object') return Object.values(value as Record<string, unknown>).flatMap(item => flattenText(item, depth + 1))
  return []
}

function fallbackText(block: CmsBlock) {
  const ignored = new Set([
    ...preferredTitleKeys,
    ...preferredDescriptionKeys,
    ...preferredBodyKeys,
    ...preferredLinkKeys,
    ...preferredLabelKeys,
    ...preferredImageKeys,
    'mediaId', 'mediaReferenceId', 'imageMediaId', 'videoMediaId',
  ])

  return Object.entries(block.data)
    .filter(([key]) => !ignored.has(key))
    .flatMap(([, value]) => flattenText(value))
    .slice(0, 12)
}
</script>

<template>
  <div class="cms-content-renderer">
    <section
      v-for="block in blocks"
      :key="block.id"
      class="cms-block border-b border-slate-100 py-10 last:border-b-0 sm:py-14"
      :data-cms-block="block.type"
      :data-cms-block-id="block.id"
    >
      <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <img
          v-if="blockImage(block) && ['Hero', 'Image', 'Gallery', 'Banner'].includes(block.type)"
          :src="blockImage(block)"
          :alt="firstString(block.data, ['alt', 'altText']) || blockTitle(block) || ''"
          class="mb-6 max-h-[620px] w-full rounded-3xl object-cover"
          loading="lazy"
        >

        <p v-if="firstString(block.data, ['eyebrow', 'kicker'])" class="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#c8171d]">
          {{ firstString(block.data, ['eyebrow', 'kicker']) }}
        </p>
        <h1 v-if="block.type === 'Hero' && blockTitle(block)" class="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
          {{ blockTitle(block) }}
        </h1>
        <h2 v-else-if="blockTitle(block)" class="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {{ blockTitle(block) }}
        </h2>
        <p v-if="blockDescription(block)" class="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {{ blockDescription(block) }}
        </p>
        <div v-if="blockBody(block)" class="mt-5 max-w-4xl whitespace-pre-line text-base leading-8 text-slate-700">
          {{ blockBody(block) }}
        </div>

        <video
          v-if="block.type === 'Video' && (firstString(block.data, ['videoUrl', 'src']) || mediaUrl(mediaFor(block)))"
          class="mt-6 w-full max-w-5xl rounded-3xl bg-black"
          controls
          preload="metadata"
        >
          <source :src="firstString(block.data, ['videoUrl', 'src']) || mediaUrl(mediaFor(block))">
        </video>

        <NuxtLink
          v-if="blockHref(block)"
          :to="blockHref(block)!"
          class="mt-6 inline-flex rounded-xl bg-[#c8171d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a91017]"
        >
          {{ blockLabel(block) }}
        </NuxtLink>

        <div v-if="fallbackText(block).length" class="mt-5 grid gap-3 sm:grid-cols-2">
          <p
            v-for="(value, index) in fallbackText(block)"
            :key="`${block.id}-value-${index}`"
            class="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
          >
            {{ value }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
