import { Link } from 'react-router-dom'

import { articles, customerReviews, faqs } from '../../data/seoContent'
import PageSection from '../../ui/PageSection'

const seoServiceGroups = [
  {
    id: 'agencia-aduanal',
    number: '01',
    title: 'Servicios de Agencia Aduanal',
    description:
      'Acompañamos operaciones de importación y exportación mediante coordinación documental, seguimiento de trámites y gestión aduanera integrada con la cadena logística.',
    topics: ['Importaciones y exportaciones', 'Trámites de aduanas', 'Coordinación de comercio exterior'],
    image: '/agenciamiento_aduanal.jpg',
    imageAlt: 'Servicio de agencia aduanal de Grupo Castro Fallas en Costa Rica',
  },
  {
    id: 'transporte-internacional',
    number: '02',
    title: 'Transporte Internacional',
    description:
      'Coordinamos transporte marítimo, aéreo y terrestre para conectar la carga con diferentes destinos y necesidades operativas.',
    topics: ['Transporte marítimo FCL y LCL', 'Transporte aéreo internacional', 'Transporte terrestre LTL y FTL'],
    image: '/logistica_maritima.jpg',
    imageAlt: 'Transporte marítimo internacional coordinado por Grupo Castro Fallas',
  },
  {
    id: 'almacen-fiscal',
    number: '03',
    title: 'Almacén Fiscal',
    description:
      'Contamos con soluciones de almacenamiento general y fiscal para apoyar el manejo, resguardo y coordinación de mercancías dentro de la operación logística.',
    topics: ['Almacenamiento fiscal', 'Almacenamiento de carga general', 'Coordinación con procesos aduaneros'],
    image: '/almacen_fiscal.jpg',
    imageAlt: 'Soluciones de almacén fiscal y almacenamiento de carga de Grupo Castro Fallas',
  },
  {
    id: 'carga-maritima-aerea',
    number: '04',
    title: 'Carga Marítima y Aérea',
    description:
      'Evaluamos la modalidad de transporte según volumen, peso, urgencia y características de la mercancía para preparar una solución adecuada para cada operación.',
    topics: ['Carga consolidada LCL', 'Contenedor completo FCL', 'Carga aérea para operaciones urgentes'],
    image: '/logistica_aerea.jpg',
    imageAlt: 'Carga aérea y marítima internacional de Grupo Castro Fallas',
  },
]

function SeoLandingContent() {
  return (
    <>
      <PageSection id="soluciones-logisticas" variant="light">
        <div className="mx-auto mb-12 grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#c8171d]">
              Soluciones integrales
            </span>
            <h2 className="mt-4 max-w-xl text-[clamp(2.4rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.055em] text-slate-950">
              Logística y aduanas en una sola operación
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end lg:text-lg">
            Una estructura clara para importadores y exportadores que necesitan coordinar aduanas, transporte internacional, almacenamiento y protección de mercancías sin fragmentar su operación.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {seoServiceGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="relative h-56 overflow-hidden sm:h-64">
                <img
                  src={group.image}
                  alt={group.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-black tracking-[0.16em] text-white backdrop-blur">
                  {group.number}
                </span>
                <h2 className="absolute bottom-6 left-6 right-6 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                  {group.title}
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[15px] leading-7 text-slate-600">{group.description}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {group.topics.map((topic) => (
                    <div key={topic} className="rounded-2xl bg-slate-50 px-4 py-4">
                      <span className="mb-2 block h-1.5 w-8 rounded-full bg-[#c8171d]" />
                      <h3 className="m-0 text-sm font-bold leading-6 text-slate-800">{topic}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </PageSection>

      <PageSection id="preguntas-frecuentes" variant="soft">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#c8171d]">
              Preguntas frecuentes
            </span>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,4rem)] font-black leading-[0.98] tracking-[-0.05em] text-slate-950">
              Respuestas claras para tu operación logística
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
              Información rápida sobre servicios, cotizaciones, aduanas y seguimiento de carga.
            </p>
            <Link
              to="/cotizacion"
              className="mt-7 inline-flex rounded-2xl bg-[#c8171d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91017]"
            >
              Cotizar una operación
            </Link>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm open:border-[#c8171d]/20 open:shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-slate-900 marker:hidden">
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-black tracking-[0.14em] text-[#c8171d]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-base sm:text-lg">{faq.question}</span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition group-open:rotate-45 group-open:bg-red-50 group-open:text-[#c8171d]">+</span>
                </summary>
                <p className="mb-1 ml-10 mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="articulos" variant="light">
        <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#c8171d]">Artículos</span>
            <h2 className="mt-3 max-w-2xl text-[clamp(2.3rem,5vw,4rem)] font-black leading-none tracking-[-0.05em] text-slate-950">
              Recursos para tomar mejores decisiones logísticas
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-slate-600 md:text-right">
            Guías sobre aduanas, transporte marítimo, carga internacional y preparación de cotizaciones.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className={`group relative overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 ${index === 0 ? 'min-h-[520px] lg:row-span-2' : 'min-h-[250px]'}`}
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/65">Guía logística</span>
                <h3 className={`${index === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-3 max-w-xl font-black leading-tight tracking-[-0.035em]`}>
                  {article.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">{article.description}</p>
                <Link
                  to={`/articulos/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:gap-3"
                  aria-label={`Leer artículo: ${article.title}`}
                >
                  Leer artículo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="opiniones" variant="soft">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-300">Opiniones</span>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Experiencias verificadas de clientes</h2>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Esta sección está preparada para publicar únicamente testimonios reales y autorizados.
              </p>
            </div>

            <div className="p-8 sm:p-10">
              {customerReviews.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {customerReviews.map((review) => (
                    <blockquote key={`${review.author}-${review.text}`} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                      <p className="text-sm leading-7 text-white/80">“{review.text}”</p>
                      <footer className="mt-4 text-sm font-bold text-white">{review.author}</footer>
                    </blockquote>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[180px] flex-col justify-center rounded-[24px] border border-dashed border-white/20 bg-white/[0.04] p-7">
                  <span className="text-sm font-bold text-white">Próximamente</span>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/60">
                    Incorporaremos aquí opiniones verificadas de clientes para mantener la información pública confiable y respaldada por experiencias reales.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageSection>
    </>
  )
}

export default SeoLandingContent
