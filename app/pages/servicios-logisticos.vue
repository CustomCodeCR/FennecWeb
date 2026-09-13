<script setup lang="ts">
import { services } from '~/data/siteContent'
useSeoMeta({ title: 'Servicios logísticos', description: 'Agencia aduanal, transporte marítimo, aéreo, terrestre, almacenamiento y seguros de carga.' })
</script>
<template>
  <section class="section page-top">
    <div class="container">
      <div class="section-heading"><span class="eyebrow">SERVICIOS</span><h1>Servicios logísticos internacionales</h1><p>Soluciones para importación, exportación, transporte y gestión aduanera.</p></div>
      <div class="card-grid three">
        <article v-for="service in services" :key="service.name" class="service-card">
          <img :src="service.image" :alt="service.name" />
          <div><h2>{{ service.name }}</h2><p>{{ service.description }}</p><NuxtLink class="text-link" to="/cotizacion">Cotizar servicio →</NuxtLink></div>
        </article>
      </div>
    </div>
  </section>
</template>
