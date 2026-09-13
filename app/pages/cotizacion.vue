<script setup lang="ts">
type ServiceType = 'Transporte aéreo' | 'Transporte marítimo' | 'Transporte terrestre'
const services: ServiceType[] = ['Transporte aéreo', 'Transporte marítimo', 'Transporte terrestre']
const offices = ['Costa Rica - Curridabat','Costa Rica - Calle Blancos','Nicaragua','Estados Unidos','Perú','China','Brasil','México','Guatemala','Panamá','Japón','El Salvador','India','Alemania','Colombia','España','Holanda','Honduras','Francia','Indonesia','Taiwán','Tailandia','Sudáfrica','Paraguay','Argentina','Chile','Canadá','Italia','Ecuador','Corea']
const form = reactive({ service: '' as ServiceType | '', origin: '', destination: '', cargo: '', weight: '', dimensions: '', pieces: '', notes: '' })
const ready = computed(() => form.service && form.origin && form.destination && form.cargo && form.weight)
const emailBody = computed(() => `Hola equipo de Pricing,\n\nDeseo solicitar una cotización:\nServicio: ${form.service}\nOrigen: ${form.origin}\nDestino: ${form.destination}\nTipo de carga: ${form.cargo}\nPeso: ${form.weight} kg\nDimensiones: ${form.dimensions || 'No indicado'}\nPiezas: ${form.pieces || 'No indicado'}\n\nInformación adicional:\n${form.notes || 'Sin información adicional'}\n\nGracias.`)
const mailto = computed(() => `mailto:pricing@grupocastrofallas.com?subject=${encodeURIComponent(`Solicitud de cotización - ${form.service || 'Logística'}`)}&body=${encodeURIComponent(emailBody.value)}`)
useSeoMeta({ title: 'Cotización', description: 'Cotiza tu carga de transporte aéreo, marítimo o terrestre en pocos pasos.' })
</script>
<template>
  <section class="section page-top">
    <div class="container narrow">
      <div class="section-heading"><span class="eyebrow">COTIZACIÓN</span><h1>Cotiza tu carga</h1><p>Prepara la información necesaria para solicitar una propuesta al equipo de Pricing.</p></div>
      <form class="form-card" @submit.prevent>
        <label>Servicio<select v-model="form.service" required><option value="">Selecciona</option><option v-for="service in services" :key="service">{{ service }}</option></select></label>
        <div class="form-grid"><label>Origen<select v-model="form.origin" required><option value="">Selecciona</option><option v-for="office in offices" :key="office">{{ office }}</option></select></label><label>Destino<select v-model="form.destination" required><option value="">Selecciona</option><option v-for="office in offices" :key="office" :disabled="office === form.origin">{{ office }}</option></select></label></div>
        <label>Tipo de carga<input v-model="form.cargo" placeholder="Carga general, vehículo, maquinaria..." required /></label>
        <div class="form-grid"><label>Peso total (kg)<input v-model="form.weight" type="number" min="0" required /></label><label>Cantidad de piezas<input v-model="form.pieces" type="number" min="1" /></label></div>
        <label>Dimensiones<input v-model="form.dimensions" placeholder="Largo x ancho x alto" /></label>
        <label>Información adicional<textarea v-model="form.notes" rows="5" /></label>
        <a class="btn primary" :class="{ disabled: !ready }" :href="ready ? mailto : undefined">Enviar solicitud a Pricing</a>
      </form>
    </div>
  </section>
</template>
