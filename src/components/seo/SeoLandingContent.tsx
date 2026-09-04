import { Link } from 'react-router-dom'

import { articles, customerReviews, faqs } from '../../data/seoContent'
import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

const seoServiceGroups = [
  {
    id: 'agencia-aduanal',
    title: 'Servicios de Agencia Aduanal',
    description:
      'Acompañamos operaciones de importación y exportación mediante coordinación documental, seguimiento de trámites y gestión aduanera integrada con la cadena logística.',
    topics: ['Importaciones y exportaciones', 'Trámites de aduanas', 'Coordinación de comercio exterior'],
  },
  {
    id: 'transporte-internacional',
    title: 'Transporte Internacional',
    description:
      'Coordinamos transporte marítimo, aéreo y terrestre para conectar la carga con diferentes destinos y necesidades operativas.',
    topics: ['Transporte marítimo FCL y LCL', 'Transporte aéreo internacional', 'Transporte terrestre LTL y FTL'],
  },
  {
    id: 'almacen-fiscal',
    title: 'Almacén Fiscal',
    description:
      'Contamos con soluciones de almacenamiento general y fiscal para apoyar el manejo, resguardo y coordinación de mercancías dentro de la operación logística.',
    topics: ['Almacenamiento fiscal', 'Almacenamiento de carga general', 'Coordinación con procesos aduaneros'],
  },
  {
    id: 'carga-maritima-aerea',
    title: 'Carga Marítima y Aérea',
    description:
      'Evaluamos la modalidad de transporte según volumen, peso, urgencia y características de la mercancía para preparar una solución adecuada para cada operación.',
    topics: ['Carga consolidada LCL', 'Contenedor completo FCL', 'Carga aérea para operaciones urgentes'],
  },
]

function SeoLandingContent() {
  return (
    <>
      <PageSection id="soluciones-logisticas" variant="light">
        <SectionHeader
          eyebrow="LOGÍSTICA Y ADUANAS"
          title="Agencia aduanal y soluciones logísticas en Costa Rica"
          description="Una estructura clara de servicios para importadores y exportadores que necesitan coordinar aduanas, transporte internacional, almacenamiento y protección de carga."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {seoServiceGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.05)] md:p-8"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {group.title}
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                {group.description}
              </p>

              <div className="mt-6 space-y-3">
                {group.topics.map((topic) => (
                  <div key={topic} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="mt-1 text-sm font-black text-[#c8171d]">✓</span>
                    <h3 className="m-0 text-sm font-semibold leading-6 text-slate-800">{topic}</h3>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </PageSection>

      <PageSection id="preguntas-frecuentes" variant="soft">
        <SectionHeader
          eyebrow="PREGUNTAS FRECUENTES"
          title="Preguntas frecuentes sobre logística y aduanas"
          description="Respuestas rápidas sobre nuestros servicios, cotizaciones y seguimiento de carga."
        />

        <div className="mx-auto grid max-w-5xl gap-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="articulos" variant="light">
        <SectionHeader
          eyebrow="ARTÍCULOS"
          title="Recursos sobre aduanas y transporte internacional"
          description="Contenido práctico para entender mejor decisiones frecuentes dentro de una operación logística."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#c8171d]">Guía logística</span>
                <h3 className="mt-3 text-xl font-bold leading-tight text-slate-950">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{article.description}</p>
                <Link
                  to={`/articulos/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c8171d] transition group-hover:gap-3"
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
        <SectionHeader
          eyebrow="OPINIONES"
          title="Experiencia de nuestros clientes"
          description="Las opiniones deben ser reales, verificables y publicadas con una fuente o autorización identificable."
        />

        {customerReviews.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {customerReviews.map((review) => (
              <blockquote key={`${review.author}-${review.text}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">“{review.text}”</p>
                <footer className="mt-4 text-sm font-bold text-slate-900">{review.author}</footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center">
            <h3 className="text-lg font-bold text-slate-900">Sección preparada para opiniones verificadas</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              No publicamos testimonios inventados. Mercadeo puede incorporar aquí reseñas reales con el nombre autorizado del cliente y su fuente para mantener la información confiable.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/cotizacion"
            className="inline-flex rounded-xl bg-[#c8171d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a91017]"
          >
            Solicitar una cotización
          </Link>
        </div>
      </PageSection>
    </>
  )
}

export default SeoLandingContent
