<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockLink, blockLinkLabel, blockTitle } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const href = computed(() => blockLink(props.block))
</script>

<template>
  <section class="section cms-section soft"><div class="container track-cta"><div><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><NuxtLink v-if="href" :to="href" class="btn primary">{{ blockLinkLabel(block) }}</NuxtLink></div></section>
</template>
