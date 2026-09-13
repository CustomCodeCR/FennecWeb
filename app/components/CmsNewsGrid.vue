<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, recordList, resolveItemMedia, safeHref } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const items = computed(() => recordList(props.block.data, ['items', 'news', 'posts']))
const itemHref = (item: Record<string, unknown>) => safeHref(firstString(item, ['href', 'url', 'link']))
</script>

<template>
  <section class="section cms-section soft"><div class="container"><div class="section-heading"><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><div class="cms-grid three"><article v-for="(item, index) in items" :key="index" class="article-card"><img v-if="resolveItemMedia(item, media)" :src="resolveItemMedia(item, media)" :alt="firstString(item, ['title', 'name']) || ''"><div><time v-if="firstString(item, ['date', 'publishedAt'])">{{ firstString(item, ['date', 'publishedAt']) }}</time><h2>{{ firstString(item, ['title', 'name']) }}</h2><p>{{ firstString(item, ['excerpt', 'description', 'text']) }}</p><NuxtLink v-if="itemHref(item)" :to="itemHref(item) || '/'" class="text-link">Leer más</NuxtLink></div></article></div></div></section>
</template>
