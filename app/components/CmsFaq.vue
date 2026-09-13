<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, recordList } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const items = computed(() => recordList(props.block.data, ['items', 'faqs', 'questions']))
</script>

<template>
  <section class="section cms-section soft"><div class="container">
    <div class="section-heading"><h2>{{ blockTitle(block) || 'Preguntas frecuentes' }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div>
    <div class="faq-list"><details v-for="(item, index) in items" :key="index"><summary>{{ firstString(item, ['question', 'title', 'name']) }}</summary><p>{{ firstString(item, ['answer', 'body', 'text', 'description']) }}</p></details></div>
  </div></section>
</template>
