import { Link, useParams } from 'react-router-dom'

import { getArticleBySlug } from '../../data/seoContent'
import NotFound from '../NotFound'

function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <NotFound />

  return (
    <main className="min-h-screen bg-white px-5 pb-20 pt-24 md:px-8">
      <article className="mx-auto w-full max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="font-semibold transition hover:text-[#c8171d]">Inicio</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/#articulos" className="font-semibold transition hover:text-[#c8171d]">Artículos</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700" aria-current="page">{article.title}</li>
          </ol>
        </nav>

        <header>
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">RECURSO LOGÍSTICO</span>
          <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-slate-950">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{article.description}</p>
          <time dateTime={article.datePublished} className="mt-5 block text-sm font-semibold text-slate-400">
            Publicado por Grupo Castro Fallas · {article.datePublished}
          </time>
        </header>

        <img
          src={article.image}
          alt={article.imageAlt}
          decoding="async"
          fetchPriority="high"
          className="mt-10 h-[280px] w-full rounded-3xl object-cover shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:h-[380px]"
        />

        <div className="mt-10 space-y-10">
          <p className="text-lg leading-8 text-slate-700">{article.intro}</p>

          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-600">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-14 rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-bold">¿Necesitas una cotización para tu operación?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Prepara los datos de tu carga y envíalos al equipo de Pricing desde el cotizador de Grupo Castro Fallas.
          </p>
          <Link
            to="/cotizacion"
            className="mt-6 inline-flex rounded-xl bg-[#c8171d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a91017]"
          >
            Cotizar transporte internacional
          </Link>
        </aside>
      </article>
    </main>
  )
}

export default ArticlePage
