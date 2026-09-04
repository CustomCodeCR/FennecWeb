import { Link } from 'react-router-dom'

import { faqs } from '../../data/seoContent'
import PageSection from '../../ui/PageSection'

function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageSection variant="soft">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="text-sm font-bold text-[#c8171d]">← Volver al inicio</Link>

          <header className="mt-10 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">FAQ</span>
            <h1 className="mt-3 text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.05em] text-slate-950">
              Preguntas frecuentes
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
              Información sobre los servicios logísticos, cotizaciones, tracking, transporte internacional y gestión aduanera de Grupo Castro Fallas.
            </p>
          </header>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-slate-950">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/servicios-logisticos" className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800">Ver servicios</Link>
            <Link to="/cotizacion" className="rounded-xl bg-[#c8171d] px-6 py-3 text-sm font-bold text-white">Solicitar cotización</Link>
          </div>
        </div>
      </PageSection>
    </main>
  )
}

export default FaqPage
