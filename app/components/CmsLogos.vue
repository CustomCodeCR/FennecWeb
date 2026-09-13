<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, publicMediaUrl, recordList, resolveItemMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const logos = computed(() => {
  const configured = recordList(props.block.data, ['items', 'logos'])
  if (configured.length) return configured.map(item => ({ url: resolveItemMedia(item, props.media), alt: firstString(item, ['alt', 'altText', 'name']) || '' }))
  return props.media.filter(item => item.role?.toLowerCase().includes('logo')).map(item => ({ url: publicMediaUrl(item), alt: item.altText || '' }))
})
</script>

<template>
  <section class="section cms-section"><div class="container"><div v-if="blockTitle(block) || blockDescription(block)" class="section-heading"><h2 v-if="blockTitle(block)">{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><div class="cms-logo-grid"><img v-for="(logo, index) in logos" v-show="logo.url" :key="index" :src="logo.url" :alt="logo.alt"></div></div></section>
</template>
