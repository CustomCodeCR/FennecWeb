import { useState } from 'react'

interface CategoryItem {
  icon: string
  name: string
  content: string
  image: string
}

// Servicios
const category: CategoryItem[] = [
  {
    icon: '/transporte_internacional_maritimo.png',
    name: 'Transporte Internacional <br/> Marítimo',
    content: `
      <div>
        <p>
          <strong>MODALIDAD LCL:</strong>
          Mayor flexibilidad en la gestión del almacenaje.
        </p>

        <p>
          Las tarifas se ajustan al volumen y el peso de la carga.
        </p>

        <p>
          Tarifas de transporte marítimo menos volátiles.
        </p>

        <p>
          Costos más bajos de transporte terrestre.
        </p>

        <p>
          Agilidad en el despacho de aduanas.
        </p>
      </div>

      <br />

      <div>
        <p>
          <strong>MODALIDAD FCL:</strong>
          La recolección y la entrega de la carga se programan fácilmente.
        </p>

        <p>
          La carga viaja con total seguridad, sin riesgo de daños por
          manipulaciones adicionales.
        </p>

        <p>
          Gastos portuarios locales estandarizados.
        </p>

        <p>
          No hay riesgo de retrasos o daños por el contacto con las cargas
          de otros expedidores.
        </p>
      </div>
    `,
    image: '/logistica_maritima.jpg',
  },

  {
    icon: '/transporte_internacional_terrestre.png',
    name: 'Transporte Internacional <br/> Terrestre',
    content: `
      <div>
        <p>
          <strong>MODALIDAD LTL:</strong>
          Mayor flexibilidad en la gestión del almacenaje.
        </p>

        <p>
          Las tarifas se ajustan al volumen y el peso de la carga.
        </p>

        <p>
          Tarifas de transporte terrestre menos volátiles.
        </p>

        <p>
          Agilidad en el despacho de aduanas.
        </p>
      </div>

      <br />

      <div>
        <p>
          <strong>MODALIDAD FTL:</strong>
          La recolección y la entrega de la carga se programan fácilmente.
        </p>

        <p>
          La carga viaja con total seguridad, sin riesgo de daños por
          manipulaciones adicionales.
        </p>

        <p>
          Gastos fronterizos locales estandarizados.
        </p>

        <p>
          No hay riesgo de retrasos o daños por el contacto con las cargas
          de otros expedidores.
        </p>
      </div>
    `,
    image: '/logistica_terreste.jpg',
  },

  {
    icon: '/transporte_internacional_aereo.png',
    name: 'Transporte Internacional <br/> Aéreo',
    content: `
      <p>
        <strong>MODALIDAD LCL:</strong>
        Mayor flexibilidad en la gestión del almacenaje.
      </p>

      <p>
        Las tarifas se ajustan al volumen y el peso de la carga.
      </p>

      <p>
        Tarifas de transporte aéreo menos volátiles.
      </p>

      <p>
        Costos más bajos de transporte terrestre.
      </p>

      <p>
        Agilidad en el despacho de aduanas.
      </p>
    `,
    image: '/logistica_aerea.jpg',
  },

  {
    icon: '/proyecto_carga.png',
    name: 'Proyecto Carga',
    content: `
      <p>
        Ofrecemos el transporte de carga especial, como carga
        sobredimensionada, maquinaria y vehículos pesados, carga proyecto,
        carga a granel, carga refrigerada y carga peligrosa.
      </p>

      <p>
        Ajustamos las soluciones según los requerimientos específicos
        de cada caso.
      </p>
    `,
    image: '/logistica_aerea.jpg',
  },
]

// Adicionales
const category2: CategoryItem[] = [
  {
    icon: '/tramites_de_aduanas.png',
    name: 'Trámites de <br/> Aduanas',
    content: `
      <p>
        <strong>Personal altamente calificado, profesional y técnico.</strong>
        Le brindamos nuestro servicio de agencia de aduanas en
        <strong> IMPORT</strong> o <strong>EXPORT</strong>.
      </p>

      <br />

      <p>
        Trabajamos con diferentes tipos de <strong>INCOTERMS</strong>,
        desde un <strong>EXW</strong> hasta un <strong>DDP</strong>.
      </p>
    `,
    image: '/agenciamiento_aduanal.jpg',
  },

  {
    icon: '/whs.png',
    name: 'Almacenes de Carga <br/> General/Fiscal',
    content: `
      <p>
        <strong>Almacén Fiscal en CRC:</strong>
        Instalaciones propias con gran capacidad de almacenamiento.
      </p>

      <br />

      <p>
        Bodegas propias en
        <strong> ZONA LIBRE, COLÓN, PANAMÁ.</strong>
      </p>

      <br />

      <p>
        Red de bodegas y almacenes con espacios y tarifas preferenciales
        hacia nuestros clientes.
      </p>
    `,
    image: '/almacen_fiscal.jpg',
  },

  {
    icon: '/seguro_de_carga.png',
    name: 'Seguros de Carga <br/> Internacional',
    content: `
      <p>
        Brindamos a nuestros clientes la facilidad de emisión de pólizas
        de seguro de carga internacional de manera inmediata y con tarifas
        muy competitivas.
      </p>

      <br />

      <p>
        Resguardando así tus envíos en import o export.
      </p>
    `,
    image: '/transporte_carga.jpg',
  },
]

function Category() {
  const [modalOpen, setModalOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryItem | null>(null)

  // Abrir
  const openModal = (item: CategoryItem) => {
    setSelectedCategory(item)
    setModalOpen(true)
  }

  // Cerrar
  const closeModal = () => {
    setModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <section
      id="servicios"
      className="w-full py-10 px-4 md:px-6"
    >
      {/* Principales */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {category.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openModal(item)}
              className="service-card group w-full min-h-[225px] p-7 cursor-pointer"
            >
              <div className="service-icon-box">
                <img
                  src={item.icon}
                  alt={item.name.replace('<br/>', ' ')}
                  className="service-icon"
                />
              </div>

              <div className="service-name">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.name,
                  }}
                />
              </div>

              <span className="service-more">
                Ver servicio
                <span className="service-arrow">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Adicionales */}
      <div className="max-w-5xl mx-auto mt-20">
        <div className="text-center mb-9">
          <span className="text-red-600 text-xs font-bold tracking-[0.18em] uppercase">
            Más soluciones
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
            Servicios Adicionales
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {category2.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openModal(item)}
              className="service-card group w-full min-h-[225px] p-7 cursor-pointer"
            >
              <div className="service-icon-box">
                <img
                  src={item.icon}
                  alt={item.name.replace('<br/>', ' ')}
                  className="service-icon"
                />
              </div>

              <div className="service-name">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.name,
                  }}
                />
              </div>

              <span className="service-more">
                Ver servicio
                <span className="service-arrow">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detalle */}
      {modalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          {/* Barra */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-5">
              <div>
                <span className="text-red-600 text-xs font-bold tracking-[0.16em] uppercase">
                  Servicio
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedCategory.name,
                    }}
                  />
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-11 h-11 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-700 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="max-w-6xl mx-auto px-5 md:px-6 py-8 md:py-12">
            <div className="relative overflow-hidden rounded-[28px] shadow-xl">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.name.replace('<br/>', ' ')}
                className="w-full h-[280px] md:h-[450px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto mt-10 md:mt-12">
              <div
                className="service-content text-gray-700 text-base md:text-lg leading-8"
                dangerouslySetInnerHTML={{
                  __html: selectedCategory.content,
                }}
              />

              <div className="mt-10 pt-7 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Category