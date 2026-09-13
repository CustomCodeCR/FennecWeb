<script setup lang="ts">
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios-logisticos', label: 'Servicios' },
  { to: '/articulos', label: 'Artículos' },
  { to: '/web-tracking', label: 'Web Tracking' },
  { to: '/opiniones', label: 'Opiniones' },
]
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <NuxtLink to="/" class="brand" aria-label="Grupo Castro Fallas - Inicio">
        <img src="/logo__rojo.png" alt="Grupo Castro Fallas" />
        <span>Grupo Castro Fallas</span>
      </NuxtLink>
      <button class="nav-toggle" type="button" :aria-expanded="open" aria-label="Abrir navegación" @click="open = !open">☰</button>
      <nav class="nav-links" :class="{ open }" aria-label="Navegación principal">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
        <NuxtLink class="nav-cta" to="/cotizacion">Cotizar</NuxtLink>
      </nav>
    </div>
  </header>
</template>
