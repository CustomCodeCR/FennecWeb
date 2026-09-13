<script setup lang="ts">
import type { CmsBlock, PublicContentMedia } from '~/types/content'
import { blockDescription, blockTitle, firstString, recordList, stringList } from '~/utils/cmsBlock'

const props = withDefaults(defineProps<{ block: CmsBlock, media?: PublicContentMedia[] }>(), { media: () => [] })
const fields = computed(() => recordList(props.block.data, ['fields', 'items']))
function fieldType(field: Record<string, unknown>) { return (firstString(field, ['type', 'fieldType']) || 'text').toLowerCase() }
</script>

<template>
  <section class="section cms-section"><div class="container narrow"><div class="section-heading"><h2>{{ blockTitle(block) }}</h2><p v-if="blockDescription(block)">{{ blockDescription(block) }}</p></div><form class="form-card" @submit.prevent><label v-for="(field, index) in fields" :key="index">{{ firstString(field, ['label', 'name']) }}<textarea v-if="fieldType(field) === 'textarea'" :name="firstString(field, ['key', 'name'])" :placeholder="firstString(field, ['placeholder'])" :required="field.required === true" /><select v-else-if="fieldType(field) === 'select'" :name="firstString(field, ['key', 'name'])" :required="field.required === true"><option value="">{{ firstString(field, ['placeholder']) || 'Seleccione' }}</option><option v-for="option in stringList(field.options)" :key="option" :value="option">{{ option }}</option></select><input v-else :type="['email', 'tel', 'number', 'date', 'time'].includes(fieldType(field)) ? fieldType(field) : 'text'" :name="firstString(field, ['key', 'name'])" :placeholder="firstString(field, ['placeholder'])" :required="field.required === true"></label><button type="submit" class="btn primary">{{ firstString(block.data, ['submitLabel', 'buttonText']) || 'Enviar' }}</button></form></div></section>
</template>
