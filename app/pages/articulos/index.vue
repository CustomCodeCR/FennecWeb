<script setup lang="ts">
import { articles } from '~/data/siteContent'
useSeoMeta({ title: 'Artículos de logística', description: 'Guías sobre logística internacional, aduanas, transporte y cotización de carga.' })
</script>
<template>
  <section class="section page-top">
    <div class="container">
      <div class="section-heading"><span class="eyebrow">ARTÍCULOS</span><h1>Información para comercio exterior</h1><p>Contenido práctico para preparar y entender mejor tus operaciones logísticas.</p></div>
      <div class="card-grid three">
        <article v-for="article in articles" :key="article.slug" class="article-card">
          <img :src="article.image" :alt="article.imageAlt" />
          <div><time :datetime="article.datePublished">{{ article.datePublished }}</time><h2>{{ article.title }}</h2><p>{{ article.description }}</p><NuxtLink class="text-link" :to="`/articulos/${article.slug}`">Leer artículo →</NuxtLink></div>
        </article>
      </div>
    </div>
  </section>
</template>
