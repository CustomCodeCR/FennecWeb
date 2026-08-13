function HeroSection() {
  return (
    <section
      id="inicio"
      className="w-full bg-white px-4 md:px-8 pt-6 pb-10"
    >
      <div className="hero-container relative max-w-7xl mx-auto overflow-hidden rounded-[28px] shadow-2xl">

        {/* Video real de fondo */}
        <video
          className="hero-video w-full h-[430px] md:h-[560px] lg:h-[620px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Oscurecimiento suave general */}
        <div className="hero-overlay absolute inset-0" />

        {/* Profundidad solamente alrededor del texto */}
        <div className="hero-text-shadow absolute inset-0" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5">

          <div className="hero-title-wrapper text-center">
            <h1 className="hero-main-title">
              <span>Grupo</span>
              <span>Castro Fallas</span>
            </h1>

            <p className="hero-subtitle">
              Logística integral sin fronteras
            </p>
          </div>

          {/* Flecha inferior */}
          <a
            href="#servicios"
            className="hero-arrow absolute bottom-7"
            aria-label="Ir a servicios"
          >
            <span>⌄</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection