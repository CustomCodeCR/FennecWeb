interface SectionDataProps {
  title: string
  description: string
  values: string[]
}

function SectionData({ title, description, values }: SectionDataProps) {
  return (
    <div className="mx-auto w-full max-w-[1180px]">
      <div className="group relative h-[360px] w-full overflow-hidden rounded-[30px] bg-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.07),0_25px_55px_rgba(0,0,0,0.12)] sm:h-[430px] lg:h-[500px]">
        <video
          className="block h-full w-full object-cover transition duration-700 group-hover:scale-[1.025] group-hover:contrast-[1.03] group-hover:saturate-105"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/transporte_carga.jpg"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_35%,rgba(0,0,0,0.65)_100%)]" />

        <div className="absolute bottom-7 left-7 z-[2] text-white sm:bottom-10 sm:left-10">
          <span className="block text-[clamp(48px,6vw,78px)] font-extrabold leading-[0.9] tracking-[-3px] [text-shadow:0_5px_20px_rgba(0,0,0,0.3)]">+48</span>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">Años de experiencia</p>
        </div>
      </div>

      <div className="w-full bg-white pt-11">
        <span className="mb-5 inline-block text-xs font-extrabold uppercase tracking-[0.22em] text-[#c8171d]">CONÓCENOS</span>

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[85px]">
          <div className="group">
            <h2 className="m-0 text-[clamp(40px,5vw,66px)] font-bold leading-none tracking-[-0.04em] text-slate-950">{title}</h2>
            <div className="my-6 h-1 w-[52px] rounded-full bg-[#c8171d] transition-all duration-300 group-hover:w-[90px]" />
            <p className="m-0 max-w-[680px] text-base leading-[1.9] text-slate-500">{description}</p>
          </div>

          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400">LO QUE NOS DEFINE</span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Nuestros valores</h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {values.map((value, index) => (
                <div key={value} className="group/value flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-[#c8171d]/25 hover:bg-white hover:shadow-sm">
                  <span className="text-xs font-extrabold tracking-[0.12em] text-[#c8171d]">0{index + 1}</span>
                  <span className="font-semibold text-slate-700 transition-colors group-hover/value:text-slate-950">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionData
