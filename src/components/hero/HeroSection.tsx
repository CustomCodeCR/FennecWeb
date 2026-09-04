import { Link } from 'react-router-dom'

const stats = [
  { value: '+48', label: 'años de experiencia' },
  { value: '+25', label: 'oficinas a nivel mundial' },
  { value: '+105', label: 'rutas internacionales' },
]

function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white px-4 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 flex flex-col justify-center px-7 py-12 sm:px-10 md:px-14 lg:min-h-[650px] lg:px-16 lg:py-16">
          <div className="mb-8 flex items-center gap-3">
            <img
              src="/logo__rojo.png"
              alt="Logo de Grupo Castro Fallas"
              width="52"
              height="52"
              className="h-12 w-12 object-contain"
            />
            <div className="h-px w-10 bg-[#c8171d]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#c8171d]">
              Logística internacional
            </span>
          </div>

          <p className="mb-4 max-w-xl text-sm font-bold uppercase tracking-[0.13em] text-slate-500 sm:text-base">
            Agencia aduanal y soluciones logísticas en Costa Rica
          </p>

          <h1 className="m-0 max-w-3xl text-[clamp(3.5rem,7vw,6.7rem)] font-black leading-[0.9] tracking-[-0.065em] text-slate-950">
            Grupo
            <span className="block text-[#c8171d]">Castro Fallas</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Coordinamos aduanas, transporte marítimo, aéreo y terrestre, almacenamiento y protección de carga para operaciones de importación y exportación.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cotizacion"
              className="inline-flex items-center justify-center rounded-2xl bg-[#c8171d] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(200,23,29,0.24)] transition hover:-translate-y-0.5 hover:bg-[#a91017]"
            >
              Solicitar cotización
            </Link>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-[#c8171d]/40 hover:text-[#c8171d]"
            >
              Conocer servicios
            </a>
          </div>

          <div className="mt-10 grid gap-3 border-t border-slate-200 pt-7 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong className="block text-2xl font-black tracking-tight text-slate-950">{stat.value}</strong>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden bg-slate-950 lg:min-h-[650px]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/logistica_maritima.jpg"
            aria-label="Operación logística internacional de Grupo Castro Fallas"
          >
            <source src="/video.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/25 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white/20 bg-black/30 p-5 text-white backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:p-6">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/70">
              Logística integral sin fronteras
            </span>
            <div className="mt-3 flex items-end justify-between gap-5">
              <p className="m-0 max-w-md text-xl font-bold leading-tight sm:text-2xl">
                Una sola coordinación para toda tu cadena logística.
              </p>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-2xl sm:flex">↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
