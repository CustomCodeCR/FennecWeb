import { Link } from 'react-router-dom'

import { seoServices } from '../../data/seoContent'
import PageSection from '../../ui/PageSection'

function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageSection variant="light">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="text-sm font-bold text-[#c8171d]">← Volver al inicio</Link>

          <header className="mt-10 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">SERVICIOS</span>
            <h1 className="mt-3 text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.05em] text-slate-950">
              Servicios de Grupo Castro Fallas
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
              Soluciones para operaciones de importación y exportación que integran agencia aduanal, transporte internacional, almacenamiento, seguros y coordinación especializada de carga.
            </p>
          </header>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {seoServices.map((service, index) => (
              <article key={service.name} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
                <span className="text-xs font-extrabold tracking-[0.15em] text-[#c8171d]">0{index + 1}</span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{service.name}</h2>
                <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-400">{service.serviceType}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/cotizacion" className="rounded-xl bg-[#c8171d] px-6 py-3 text-sm font-bold text-white">Solicitar cotización</Link>
            <Link to="/preguntas-frecuentes" className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-800">Ver preguntas frecuentes</Link>
          </div>
        </div>
      </PageSection>
    </main>
  )
}

export default ServicesPage
