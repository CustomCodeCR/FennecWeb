<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, publicMediaUrl, recordList, resolveItemMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const items = computed(() => {
  const configured = recordList(props.block.data, ['items', 'images', 'gallery'])
  if (configured.length) return configured.map(item => ({ url: resolveItemMedia(item, props.media), alt: firstString(item, ['alt', 'altText', 'title']) || '', caption: firstString(item, ['caption', 'title']) }))
  return props.media.filter(item => item.role?.toLowerCase() === 'gallery').map(item => ({ url: publicMediaUrl(item), alt: item.altText || '', caption: item.caption || undefined }))
})
</script>

<template>
  <section class="section cms-section"><div class="container">
    <div v-if="blockTitle(block) || blockDescription(block)" class="section-heading"><h2 v-if="blockTitle(block)">{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div>
    <div class="cms-gallery"><figure v-for="(item, index) in items" :key="index" v-show="item.url"><img :src="item.url" :alt="item.alt" class="cms-media"><figcaption v-if="item.caption" class="cms-caption">{{ item.caption }}</figcaption></figure></div>
  </div></section>
</template>
