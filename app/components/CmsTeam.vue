<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, recordList, resolveItemMedia } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const members = computed(() => recordList(props.block.data, ['items', 'members', 'team']))
</script>

<template>
  <section class="section cms-section"><div class="container"><div class="section-heading"><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><div class="cms-grid three"><article v-for="(member, index) in members" :key="index" class="cms-card centered"><img v-if="resolveItemMedia(member, media)" :src="resolveItemMedia(member, media)" :alt="firstString(member, ['name']) || ''" class="cms-team-avatar"><h3>{{ firstString(member, ['name', 'title']) }}</h3><p class="cms-muted">{{ firstString(member, ['role', 'position', 'jobTitle']) }}</p><p>{{ firstString(member, ['bio', 'description']) }}</p></article></div></div></section>
</template>
