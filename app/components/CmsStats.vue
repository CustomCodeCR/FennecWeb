<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, recordList } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const items = computed(() => recordList(props.block.data, ['items', 'stats', 'statistics']))
</script>

<template>
  <section class="section cms-section"><div class="container"><div class="section-heading"><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><div class="cms-stat-grid"><div v-for="(item, index) in items" :key="index" class="cms-stat"><strong>{{ firstString(item, ['value', 'number', 'amount']) }}</strong><span>{{ firstString(item, ['label', 'title', 'name']) }}</span></div></div></div></section>
</template>
