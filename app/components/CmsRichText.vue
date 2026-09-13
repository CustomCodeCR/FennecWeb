<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockBody, blockDescription, blockTitle, stringList } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const paragraphs = computed(() => stringList(props.block.data.paragraphs))
</script>

<template>
  <section class="section cms-section"><div class="container narrow">
    <h2 v-if="blockTitle(block)" class="cms-title">{{ blockTitle(block) }}</h2>
    <p v-if="blockDescription(block)" class="lead">{{ blockDescription(block) }}</p>
    <div class="cms-rich-text">
      <p v-if="blockBody(block)">{{ blockBody(block) }}</p>
      <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
    </div>
  </div></section>
</template>
