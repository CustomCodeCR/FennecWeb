<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockLink, blockLinkLabel, blockTitle, firstString, resolveBlockMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const image = computed(() => resolveBlockMedia(props.block, props.media, { urlKeys: ['imageUrl', 'backgroundUrl', 'src'], roles: ['hero', 'background'] }))
const href = computed(() => blockLink(props.block))
</script>

<template>
  <section class="cms-hero">
    <img v-if="image.url" :src="image.url" :alt="firstString(block.data, ['alt', 'altText']) || image.media?.altText || ''" class="cms-hero-media">
    <div class="cms-hero-overlay" />
    <div class="container cms-hero-content">
      <span v-if="firstString(block.data, ['eyebrow', 'kicker'])" class="eyebrow light">{{ firstString(block.data, ['eyebrow', 'kicker']) }}</span>
      <h1>{{ blockTitle(block) }}</h1>
      <p v-if="blockDescription(block)">{{ blockDescription(block) }}</p>
      <div v-if="href" class="hero-actions"><NuxtLink :to="href" class="btn primary">{{ blockLinkLabel(block) }}</NuxtLink></div>
    </div>
  </section>
</template>
