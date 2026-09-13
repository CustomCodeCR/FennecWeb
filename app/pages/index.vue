<script setup lang="ts">
import { faqs, services } from '~/data/siteContent'
useSeoMeta({
  title: 'Logística Internacional',
  description: 'Grupo Castro Fallas: agencia aduanal, transporte marítimo, aéreo y terrestre, almacenamiento y seguros de carga.',
  ogTitle: 'Grupo Castro Fallas | Logística Internacional',
  ogDescription: 'Soluciones logísticas y aduaneras para conectar tu carga con distintos destinos.',
})
</script>

<template>
  <div>
    <section class="hero">
      <video class="hero-media" autoplay muted loop playsinline poster="/transporte_carga.jpg">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay" />
      <div class="container hero-content">
        <span class="eyebrow light">LOGÍSTICA INTERNACIONAL</span>
        <h1>Conectamos tu carga con el mundo</h1>
        <p>Soluciones logísticas, aduaneras y de transporte internacional con atención cercana y experiencia regional.</p>
        <div class="hero-actions">
          <NuxtLink class="btn primary" to="/cotizacion">Solicitar cotización</NuxtLink>
          <NuxtLink class="btn ghost" to="/web-tracking">Rastrear carga</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">NUESTROS SERVICIOS</span>
          <h2>Soluciones logísticas para cada necesidad</h2>
          <p>Conectamos tu carga con diferentes destinos de forma segura, eficiente y confiable.</p>
        </div>
        <div class="card-grid three">
          <article v-for="service in services" :key="service.name" class="service-card">
            <img :src="service.image" :alt="service.name" />
            <div><h3>{{ service.name }}</h3><p>{{ service.description }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section soft">
      <div class="container split">
        <div>
          <span class="eyebrow">NOSOTROS</span>
          <h2>Experiencia para mover tu negocio</h2>
          <p>Coordinamos soluciones de comercio exterior desde Costa Rica con una visión integral de origen, transporte, aduanas y destino.</p>
          <NuxtLink class="text-link" to="/servicios-logisticos">Conocer nuestros servicios →</NuxtLink>
        </div>
        <div class="stats-panel">
          <strong>Logística + Aduanas</strong>
          <span>Un solo equipo para acompañar tu operación.</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container track-cta">
        <div><span class="eyebrow">WEB TRACKING</span><h2>Consulta tu embarque</h2><p>Revisa la información disponible de tu carga mediante IDTRA, BL o contenedor.</p></div>
        <NuxtLink class="btn primary" to="/web-tracking">Rastrear ahora</NuxtLink>
      </div>
    </section>

    <section class="section soft">
      <div class="container">
        <div class="section-heading"><span class="eyebrow">PREGUNTAS FRECUENTES</span><h2>Información útil para tu operación</h2></div>
        <div class="faq-list">
          <details v-for="faq in faqs" :key="faq[0]"><summary>{{ faq[0] }}</summary><p>{{ faq[1] }}</p></details>
        </div>
      </div>
    </section>
  </div>
</template>
