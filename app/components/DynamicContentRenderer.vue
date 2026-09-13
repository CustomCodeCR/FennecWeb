<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { resolveCmsComponent } from '~/utils/cmsComponentRegistry'

const props = withDefaults(defineProps<{
  blocks: CmsBlock[]
  media?: PublicContentMedia[]
}>(), {
  media: () => [],
})

const renderableBlocks = computed(() => props.blocks.flatMap((block) => {
  const component = resolveCmsComponent(block.type)
  return component ? [{ block, component }] : []
}))
</script>

<template>
  <div class="cms-content-renderer">
    <component
      v-for="entry in renderableBlocks"
      :is="entry.component"
      :key="entry.block.id"
      :block="entry.block"
      :media="media"
      :data-cms-block="entry.block.type"
      :data-cms-block-id="entry.block.id"
    />
  </div>
</template>
