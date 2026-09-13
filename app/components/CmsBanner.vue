<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockLink, blockLinkLabel, blockTitle, firstString, resolveBlockMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const image = computed(() => resolveBlockMedia(props.block, props.media, { urlKeys: ['imageUrl', 'backgroundUrl', 'src'], roles: ['banner.desktop', 'banner', 'background'] }))
const href = computed(() => blockLink(props.block))
</script>

<template>
  <section class="section cms-section"><div class="container cms-banner">
    <img v-if="image.url" :src="image.url" :alt="firstString(block.data, ['alt', 'altText']) || image.media?.altText || ''" class="cms-banner-media">
    <div class="cms-banner-overlay" />
    <div class="cms-banner-content"><h2 v-if="blockTitle(block)">{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p><NuxtLink v-if="href" :to="href" class="btn primary">{{ blockLinkLabel(block) }}</NuxtLink></div>
  </div></section>
</template>
