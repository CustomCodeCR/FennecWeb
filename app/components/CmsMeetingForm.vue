<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString } from '~/utils/cmsBlock'

withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
</script>

<template>
  <section class="section cms-section soft"><div class="container narrow"><div class="section-heading"><h2>{{ blockTitle(block) || 'Agendar reunión' }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><form class="form-card" @submit.prevent><div class="form-grid"><label>Nombre<input name="name" type="text" required></label><label>Correo<input name="email" type="email" required></label><label>Fecha<input name="date" type="date" required></label><label>Hora<input name="time" type="time" required></label></div><label>Mensaje<textarea name="message" :placeholder="firstString(block.data, ['messagePlaceholder']) || '¿En qué podemos ayudarle?'" /></label><button type="submit" class="btn primary">{{ firstString(block.data, ['submitLabel', 'buttonText']) || 'Solicitar reunión' }}</button></form></div></section>
</template>
