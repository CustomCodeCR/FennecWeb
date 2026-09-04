import { Link } from 'react-router-dom'

import { customerReviews } from '../../data/seoContent'
import PageSection from '../../ui/PageSection'

function ReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <PageSection variant="dark">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="text-sm font-bold text-red-300">← Volver al inicio</Link>

          <header className="mt-10 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-300">OPINIONES</span>
            <h1 className="mt-3 text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.05em] text-white">
              Opiniones de clientes
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
              Esta página está preparada para publicar únicamente testimonios reales y verificables de clientes de Grupo Castro Fallas.
            </p>
          </header>

          {customerReviews.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {customerReviews.map((review) => (
                <blockquote key={`${review.author}-${review.text}`} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                  <p className="text-base leading-8 text-slate-200">“{review.text}”</p>
                  <footer className="mt-5 text-sm font-bold text-white">{review.author}</footer>
                  {review.source && <p className="mt-1 text-xs text-slate-400">Fuente: {review.source}</p>}
                </blockquote>
              ))}
            </div>
          ) : (
            <section className="mt-12 rounded-3xl border border-dashed border-white/20 bg-white/5 p-8">
              <h2 className="text-xl font-bold text-white">Pendiente de opiniones verificadas</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                No se publican testimonios inventados. Mercadeo puede añadir aquí opiniones reales con autorización del cliente y una fuente identificable.
              </p>
            </section>
          )}
        </div>
      </PageSection>
    </main>
  )
}

export default ReviewsPage
