import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface CategoryItem {
  icon: string
  name: string
  shortName: string
  description: string
  content: string
  image: string
}

const category: CategoryItem[] = [
  {
    icon: '/transporte_internacional_maritimo.png',
    name: 'Transporte Internacional <br/> Marítimo',
    shortName: 'Transporte Marítimo',
    description: 'Soluciones flexibles para carga marítima internacional LCL y FCL.',
    content: `
      <div>
        <p><strong>MODALIDAD LCL:</strong> Mayor flexibilidad en la gestión del almacenaje.</p>
        <p>Las tarifas se ajustan al volumen y el peso de la carga.</p>
        <p>Tarifas de transporte marítimo menos volátiles.</p>
        <p>Costos más bajos de transporte terrestre.</p>
        <p>Agilidad en el despacho de aduanas.</p>
      </div>
      <div>
        <p><strong>MODALIDAD FCL:</strong> La recolección y la entrega de la carga se programan fácilmente.</p>
        <p>La carga viaja con total seguridad, sin riesgo de daños por manipulaciones adicionales.</p>
        <p>Gastos portuarios locales estandarizados.</p>
        <p>No hay riesgo de retrasos o daños por el contacto con las cargas de otros expedidores.</p>
      </div>
    `,
    image: '/logistica_maritima.jpg',
  },
  {
    icon: '/transporte_internacional_terrestre.png',
    name: 'Transporte Internacional <br/> Terrestre',
    shortName: 'Transporte Terrestre',
    description: 'Cobertura terrestre regional con soluciones LTL y FTL.',
    content: `
      <div>
        <p><strong>MODALIDAD LTL:</strong> Mayor flexibilidad en la gestión del almacenaje.</p>
        <p>Las tarifas se ajustan al volumen y el peso de la carga.</p>
        <p>Tarifas de transporte terrestre menos volátiles.</p>
        <p>Agilidad en el despacho de aduanas.</p>
      </div>
      <div>
        <p><strong>MODALIDAD FTL:</strong> La recolección y la entrega de la carga se programan fácilmente.</p>
        <p>La carga viaja con total seguridad, sin riesgo de daños por manipulaciones adicionales.</p>
        <p>Gastos fronterizos locales estandarizados.</p>
        <p>No hay riesgo de retrasos o daños por el contacto con las cargas de otros expedidores.</p>
      </div>
    `,
    image: '/logistica_terreste.jpg',
  },
  {
    icon: '/transporte_internacional_aereo.png',
    name: 'Transporte Internacional <br/> Aéreo',
    shortName: 'Transporte Aéreo',
    description: 'Conexiones internacionales para envíos que requieren mayor velocidad.',
    content: `
      <div>
        <p><strong>TRANSPORTE AÉREO:</strong> Soluciones para envíos internacionales que necesitan rapidez.</p>
        <p>Las tarifas se ajustan al volumen y el peso de la carga.</p>
        <p>Coordinación eficiente de transporte internacional.</p>
        <p>Agilidad en el despacho de aduanas.</p>
      </div>
    `,
    image: '/logistica_aerea.jpg',
  },
  {
    icon: '/proyecto_carga.png',
    name: 'Proyecto Carga',
    shortName: 'Proyecto Carga',
    description: 'Gestión especializada para maquinaria, vehículos y carga sobredimensionada.',
    content: `
      <div>
        <p><strong>PROYECTO CARGA:</strong> Transporte especializado para operaciones de gran tamaño.</p>
        <p>Carga sobredimensionada, maquinaria y vehículos pesados.</p>
        <p>Carga proyecto, carga a granel, refrigerada y peligrosa.</p>
        <p>Soluciones adaptadas según los requerimientos de cada operación.</p>
      </div>
    `,
    image: '/logistica_aerea.jpg',
  },
]

const category2: CategoryItem[] = [
  {
    icon: '/tramites_de_aduanas.png',
    name: 'Trámites de <br/> Aduanas',
    shortName: 'Trámites de Aduanas',
    description: 'Gestión profesional de importaciones, exportaciones e Incoterms.',
    content: `
      <div>
        <p><strong>TRÁMITES DE ADUANAS:</strong> Personal altamente calificado, profesional y técnico.</p>
        <p>Servicio de agencia de aduanas para IMPORT y EXPORT.</p>
        <p>Trabajamos con diferentes tipos de INCOTERMS.</p>
        <p>Desde un EXW hasta un DDP.</p>
      </div>
    `,
    image: '/agenciamiento_aduanal.jpg',
  },
  {
    icon: '/whs.png',
    name: 'Almacenes de Carga <br/> General/Fiscal',
    shortName: 'Almacenes de Carga',
    description: 'Espacios de almacenamiento general y fiscal en puntos estratégicos.',
    content: `
      <div>
        <p><strong>ALMACENAMIENTO:</strong> Almacén Fiscal en Costa Rica con gran capacidad.</p>
        <p>Bodegas propias en Zona Libre, Colón, Panamá.</p>
        <p>Red de bodegas y almacenes con espacios preferenciales.</p>
        <p>Tarifas competitivas para nuestros clientes.</p>
      </div>
    `,
    image: '/almacen_fiscal.jpg',
  },
  {
    icon: '/seguro_de_carga.png',
    name: 'Seguros de Carga <br/> Internacional',
    shortName: 'Seguros de Carga',
    description: 'Protección internacional para tus envíos de importación y exportación.',
    content: `
      <div>
        <p><strong>SEGURO DE CARGA:</strong> Emisión de pólizas de seguro de carga internacional.</p>
        <p>Gestión inmediata y tarifas competitivas.</p>
        <p>Protección para operaciones de importación y exportación.</p>
      </div>
    `,
    image: '/transporte_carga.jpg',
  },
]

function Category() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)

  const openModal = (item: CategoryItem) => {
    setSelectedCategory(item)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCategory(null)
  }

  useEffect(() => {
    if (!modalOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [modalOpen])

  return (
    <>
      <section id="servicios" className="w-full">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {category.map((item, index) => (
            <button
              key={item.shortName}
              type="button"
              onClick={() => openModal(item)}
              className="group relative min-h-[300px] overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#c8171d]/25 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
            >
              <span className="absolute right-6 top-5 text-xs font-extrabold tracking-[0.18em] text-slate-300 transition-colors group-hover:text-[#c8171d]">
                0{index + 1}
              </span>

              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 transition-transform duration-300 group-hover:scale-105">
                <img src={item.icon} alt={item.shortName} className="h-14 w-14 object-contain" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#c8171d]">
                  {item.shortName}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
              </div>

              <div className="absolute bottom-6 left-7 right-7 flex items-center justify-between text-sm font-bold text-[#c8171d]">
                <span>Conocer servicio</span>
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">Más soluciones</span>
            <h2 className="mt-2 text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.04em] text-slate-900">
              Servicios complementarios
            </h2>
            <p className="mx-auto mt-4 text-[15px] leading-7 text-slate-500">
              Soluciones adicionales para acompañar cada etapa de tu operación logística.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {category2.map((item) => (
              <button
                key={item.shortName}
                type="button"
                onClick={() => openModal(item)}
                className="group relative flex min-h-[145px] items-center overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 text-left shadow-[0_6px_18px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-[#c8171d]/25 hover:shadow-[0_18px_38px_rgba(15,23,42,0.1)]"
              >
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[18px] bg-red-50 transition-transform duration-300 group-hover:scale-105">
                  <img src={item.icon} alt={item.shortName} className="h-[50px] w-[50px] object-contain" />
                </div>

                <div className="ml-[18px] pr-8">
                  <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-[#c8171d]">
                    {item.shortName}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.description}</p>
                </div>

                <span className="absolute right-5 text-xl text-[#c8171d] opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && selectedCategory && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-md sm:p-8 lg:p-14"
          onMouseDown={closeModal}
        >
          <article
            className="flex max-h-[calc(100dvh-24px)] w-full max-w-[860px] flex-col overflow-hidden rounded-3xl border border-white/25 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.32)] sm:max-h-[calc(100dvh-64px)]"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCategory.shortName}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex min-h-[88px] shrink-0 items-center justify-between border-b border-slate-200/70 bg-white px-6 py-4 sm:px-7">
              <div>
                <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#c8171d]">SERVICIO LOGÍSTICO</span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{selectedCategory.shortName}</h2>
              </div>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-600 transition hover:bg-red-50 hover:text-[#c8171d] active:scale-95"
                onClick={closeModal}
                aria-label="Cerrar"
              >
                ×
              </button>
            </header>

            <div className="overflow-y-auto">
              <div className="relative h-[230px] overflow-hidden sm:h-[300px]">
                <img src={selectedCategory.image} alt={selectedCategory.shortName} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.18em]">CASTRO FALLAS</span>
                  <h3 className="mt-2 max-w-xl text-[clamp(30px,5vw,48px)] font-bold leading-none tracking-[-0.04em]">
                    {selectedCategory.shortName}
                  </h3>
                </div>
              </div>

              <div className="grid gap-8 px-6 py-7 md:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.85fr)] md:px-8">
                <div
                  className="space-y-4 text-sm leading-7 text-slate-600 [&_div]:space-y-3 [&_p]:m-0 [&_strong]:font-extrabold [&_strong]:text-slate-900"
                  dangerouslySetInnerHTML={{ __html: selectedCategory.content }}
                />

                <aside className="space-y-4">
                  {[
                    ['✓', 'Seguridad', 'Gestión orientada a proteger la carga durante cada etapa del proceso.'],
                    ['◎', 'Cobertura', 'Conexiones y soluciones adaptadas a operaciones nacionales e internacionales.'],
                    ['↗', 'Eficiencia', 'Coordinación enfocada en optimizar tiempos y procesos logísticos.'],
                  ].map(([icon, title, text]) => (
                    <div key={title} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 font-extrabold text-[#c8171d]">{icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-900">{title}</h4>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
                      </div>
                    </div>
                  ))}
                </aside>
              </div>

              <div className="flex justify-end border-t border-slate-100 px-6 py-5 sm:px-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-gradient-to-br from-[#d71923] to-[#b90f18] px-7 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(200,23,29,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(200,23,29,0.3)] active:translate-y-0"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </article>
        </div>,
        document.body
      )}
    </>
  )
}

export default Category
