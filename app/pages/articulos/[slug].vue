<script setup lang="ts">
import { getArticleBySlug } from '~/data/siteContent'
const route = useRoute()
const article = computed(() => getArticleBySlug(String(route.params.slug)))
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
useSeoMeta({
  title: () => article.value?.title ?? 'Artículo',
  description: () => article.value?.description ?? '',
  ogTitle: () => article.value?.title ?? '',
  ogDescription: () => article.value?.description ?? '',
  ogImage: () => article.value?.image ?? '',
})
</script>
<template>
  <article v-if="article" class="section page-top article-page">
    <div class="container narrow">
      <NuxtLink class="text-link" to="/articulos">← Todos los artículos</NuxtLink>
      <span class="eyebrow">LOGÍSTICA</span>
      <h1>{{ article.title }}</h1>
      <p class="lead">{{ article.description }}</p>
      <img class="article-hero" :src="article.image" :alt="article.imageAlt" />
      <p>{{ article.intro }}</p>
      <section v-for="section in article.sections" :key="section.heading" class="article-section">
        <h2>{{ section.heading }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
      </section>
    </div>
  </article>
</template>
