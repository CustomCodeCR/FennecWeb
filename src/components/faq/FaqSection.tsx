import { faqs } from '../../data/seoContent'

function FaqSection() {
  return (
    <section id="preguntas-frecuentes" className="w-full bg-slate-50 px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">FAQ</span>
          <h2 className="mt-3 text-[clamp(2.1rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-500 md:text-[17px]">
            Información sobre nuestros servicios logísticos, cotizaciones, tracking, transporte internacional y gestión aduanera.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
