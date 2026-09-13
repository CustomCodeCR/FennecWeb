<script setup lang="ts">
interface TrackingData {
  idtra?: string
  bl?: string
  equipment_quantity?: number
  containers?: string[]
  status?: string
  pol?: string
  poe?: string
  pod?: string
  transit_days?: number
}
const config = useRuntimeConfig()
const query = ref('')
const data = ref<TrackingData | null>(null)
const loading = ref(false)
const error = ref('')
async function track() {
  const value = query.value.trim()
  if (!value) { error.value = 'Ingresa un IDTRA, BL o número de contenedor.'; return }
  loading.value = true; error.value = ''; data.value = null
  try {
    const base = String(config.public.trackingApiBase).replace(/\/$/, '')
    data.value = await $fetch<TrackingData>(`${base}/tracking/${encodeURIComponent(value)}`)
  } catch (caught) {
    const status = (caught as { statusCode?: number }).statusCode
    error.value = status === 404 ? 'No se encontró el embarque solicitado.' : 'No fue posible consultar el tracking.'
  } finally { loading.value = false }
}
useSeoMeta({ title: 'Web Tracking', description: 'Consulta el estado y la información de tu carga mediante IDTRA, BL o número de contenedor.' })
</script>
<template>
  <section class="section page-top">
    <div class="container narrow">
      <div class="section-heading"><span class="eyebrow">WEB TRACKING</span><h1>Rastrea tu carga</h1><p>Ingresa tu IDTRA, BL o número de contenedor.</p></div>
      <form class="tracking-form" @submit.prevent="track"><input v-model="query" placeholder="IDTRA, BL o número de contenedor" /><button class="btn primary" :disabled="loading">{{ loading ? 'Buscando…' : 'Rastrear' }}</button></form>
      <div v-if="error" class="alert">{{ error }}</div>
      <div v-else-if="data" class="tracking-result">
        <div class="result-head"><div><span>Estado actual</span><strong>{{ data.status || 'Sin información' }}</strong></div><div><span>Días de tránsito</span><strong>{{ data.transit_days ?? 0 }}</strong></div></div>
        <dl><div><dt>IDTRA</dt><dd>{{ data.idtra || 'No disponible' }}</dd></div><div><dt>BL</dt><dd>{{ data.bl || 'No disponible' }}</dd></div><div><dt>POL</dt><dd>{{ data.pol || 'No disponible' }}</dd></div><div><dt>POE</dt><dd>{{ data.poe || 'No disponible' }}</dd></div><div><dt>POD</dt><dd>{{ data.pod || 'No disponible' }}</dd></div><div><dt>Equipo</dt><dd>{{ data.equipment_quantity ?? data.containers?.length ?? 0 }}</dd></div></dl>
      </div>
      <div v-else class="empty-state">Consulta el estado de tu envío.</div>
    </div>
  </section>
</template>
