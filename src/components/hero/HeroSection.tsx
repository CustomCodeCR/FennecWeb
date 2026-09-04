function HeroSection() {
  return (
    <section id="inicio" className="w-full bg-white px-4 pb-10 pt-6 md:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[28px] shadow-2xl">
        <video
          className="block h-[430px] w-full scale-[1.01] object-cover brightness-105 contrast-[1.04] saturate-[1.08] md:h-[560px] lg:h-[620px]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/logistica_maritima.jpg"
        >
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.08] to-black/[0.14]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.67)_0%,rgba(0,0,0,0.48)_25%,rgba(0,0,0,0.18)_53%,rgba(0,0,0,0)_76%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
          <div className="relative z-[2] text-center">
            <h1 className="m-0 flex flex-col font-serif text-[clamp(43px,8vw,116px)] font-medium uppercase leading-[0.9] tracking-[-0.035em] text-white [text-shadow:0_2px_0_rgba(255,255,255,0.15),0_5px_5px_rgba(0,0,0,0.75),0_12px_25px_rgba(0,0,0,0.55),0_0_28px_rgba(255,255,255,0.17)] md:leading-[0.88]">
              <span className="mb-5 block font-sans text-[clamp(13px,1.7vw,21px)] font-bold tracking-[0.1em] text-white/95 sm:tracking-[0.14em]">
                Agencia Aduanal y Soluciones Logísticas en Costa Rica
              </span>
              <span className="block text-[0.82em]">Grupo</span>
              <span className="mt-2 block md:mt-2.5">Castro Fallas</span>
            </h1>

            <p className="mt-6 border-y border-white/25 px-4 py-2.5 text-[11px] font-normal uppercase tracking-[0.15em] text-white/95 [text-shadow:0_3px_8px_rgba(0,0,0,0.8)] sm:mt-7 sm:px-6 sm:py-3 sm:text-[clamp(12px,1.5vw,18px)] sm:tracking-[0.2em] lg:tracking-[0.28em]">
              Logística integral sin fronteras
            </p>
          </div>

          <a
            href="#servicios"
            className="absolute bottom-7 z-[3] cursor-pointer text-white [text-shadow:0_3px_9px_rgba(0,0,0,0.75)]"
            aria-label="Ir a servicios"
          >
            <span className="block animate-bounce text-[40px] font-light leading-none motion-reduce:animate-none sm:text-[50px]">⌄</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
