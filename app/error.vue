<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
function goHome() { clearError({ redirect: '/' }) }
</script>
<template><div class="section page-top"><div class="container narrow centered"><span class="error-code">{{ error.statusCode || 500 }}</span><h1>{{ error.statusCode === 404 ? 'Página no encontrada' : 'Ocurrió un error' }}</h1><p class="lead">{{ error.statusMessage || 'No fue posible completar la solicitud.' }}</p><button class="btn primary" @click="goHome">Volver al inicio</button></div></div></template>
