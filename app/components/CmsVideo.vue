<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, resolveBlockMedia, safeMediaUrl } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const video = computed(() => resolveBlockMedia(props.block, props.media, { urlKeys: ['videoUrl', 'src'], roles: ['video'] }))
const poster = computed(() => safeMediaUrl(String(props.block.data.posterUrl || '')) || resolveBlockMedia(props.block, props.media, { idKeys: ['posterMediaId'], roles: ['video.poster'] }).url)
</script>

<template>
  <section v-if="video.url" class="section cms-section"><div class="container">
    <div v-if="blockTitle(block)" class="section-heading"><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div>
    <video class="cms-video" controls preload="metadata" :poster="poster"><source :src="video.url"></video>
  </div></section>
</template>
