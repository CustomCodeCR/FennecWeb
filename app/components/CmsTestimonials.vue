<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, recordList, resolveItemMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const items = computed(() => recordList(props.block.data, ['items', 'testimonials']))
</script>

<template>
  <section class="section cms-section"><div class="container"><div class="section-heading"><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><div class="cms-grid three"><article v-for="(item, index) in items" :key="index" class="cms-card"><img v-if="resolveItemMedia(item, media)" :src="resolveItemMedia(item, media)" :alt="firstString(item, ['name', 'author']) || ''" class="cms-avatar"><p class="cms-quote">“{{ firstString(item, ['quote', 'text', 'body']) }}”</p><strong>{{ firstString(item, ['name', 'author']) }}</strong><span class="cms-muted">{{ firstString(item, ['role', 'company']) }}</span></article></div></div></section>
</template>
