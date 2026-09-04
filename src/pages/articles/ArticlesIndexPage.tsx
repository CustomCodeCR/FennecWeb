import { Link } from 'react-router-dom'

import { articles } from '../../data/seoContent'
import PageSection from '../../ui/PageSection'

function ArticlesIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageSection variant="light">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="text-sm font-bold text-[#c8171d]">← Volver al inicio</Link>

          <header className="mt-10 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">ARTÍCULOS</span>
            <h1 className="mt-3 text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.05em] text-slate-950">
              Recursos de logística y comercio exterior
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
              Guías sobre agencia aduanal, transporte internacional, FCL, LCL y preparación de información para cotizaciones logísticas.
            </p>
          </header>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-52 w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold leading-tight text-slate-950">{article.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{article.description}</p>
                  <Link to={`/articulos/${article.slug}`} className="mt-5 inline-flex text-sm font-bold text-[#c8171d]">
                    Leer artículo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageSection>
    </main>
  )
}

export default ArticlesIndexPage
