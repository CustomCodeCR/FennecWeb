<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <img class="footer-logo" src="/logo__rojo.png" alt="Grupo Castro Fallas" />
        <p>Soluciones logísticas, aduaneras y de transporte internacional desde Costa Rica.</p>
      </div>
      <div>
        <strong>Contacto</strong>
        <a href="tel:+50622726772">+506 2272-6772</a>
        <a href="mailto:comercial@castrofallas.com">comercial@castrofallas.com</a>
      </div>
      <div>
        <strong>Accesos</strong>
        <NuxtLink to="/servicios-logisticos">Servicios</NuxtLink>
        <NuxtLink to="/web-tracking">Web Tracking</NuxtLink>
        <NuxtLink to="/cotizacion">Cotización</NuxtLink>
      </div>
    </div>
    <div class="container footer-bottom">© {{ new Date().getFullYear() }} Grupo Castro Fallas.</div>
  </footer>
</template>
