<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockTitle, firstString, resolveBlockMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const image = computed(() => resolveBlockMedia(props.block, props.media, { urlKeys: ['imageUrl', 'src'], roles: ['featured', 'image'] }))
</script>

<template>
  <section v-if="image.url" class="section cms-section"><figure class="container narrow cms-figure">
    <img :src="image.url" :alt="firstString(block.data, ['alt', 'altText']) || image.media?.altText || blockTitle(block) || ''" class="cms-media">
    <figcaption v-if="firstString(block.data, ['caption']) || image.media?.caption" class="cms-caption">{{ firstString(block.data, ['caption']) || image.media?.caption }}</figcaption>
  </figure></section>
</template>
