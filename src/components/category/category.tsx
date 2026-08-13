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
    description:
      'Soluciones flexibles para carga marítima internacional LCL y FCL.',
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
    shortName: 'Transporte Terrestre',
    description:
      'Cobertura terrestre regional con soluciones LTL y FTL.',
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
    shortName: 'Transporte Aéreo',
    description:
      'Conexiones internacionales para envíos que requieren mayor velocidad.',
    content: `
      <div>
        <p>
          <strong>TRANSPORTE AÉREO:</strong>
          Soluciones para envíos internacionales que necesitan rapidez.
        </p>

        <p>
          Las tarifas se ajustan al volumen y el peso de la carga.
        </p>

        <p>
          Coordinación eficiente de transporte internacional.
        </p>

        <p>
          Agilidad en el despacho de aduanas.
        </p>
      </div>
    `,
    image: '/logistica_aerea.jpg',
  },

  {
    icon: '/proyecto_carga.png',
    name: 'Proyecto Carga',
    shortName: 'Proyecto Carga',
    description:
      'Gestión especializada para maquinaria, vehículos y carga sobredimensionada.',
    content: `
      <div>
        <p>
          <strong>PROYECTO CARGA:</strong>
          Transporte especializado para operaciones de gran tamaño.
        </p>

        <p>
          Carga sobredimensionada, maquinaria y vehículos pesados.
        </p>

        <p>
          Carga proyecto, carga a granel, refrigerada y peligrosa.
        </p>

        <p>
          Soluciones adaptadas según los requerimientos de cada operación.
        </p>
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
    description:
      'Gestión profesional de importaciones, exportaciones e Incoterms.',
    content: `
      <div>
        <p>
          <strong>TRÁMITES DE ADUANAS:</strong>
          Personal altamente calificado, profesional y técnico.
        </p>

        <p>
          Servicio de agencia de aduanas para IMPORT y EXPORT.
        </p>

        <p>
          Trabajamos con diferentes tipos de INCOTERMS.
        </p>

        <p>
          Desde un EXW hasta un DDP.
        </p>
      </div>
    `,
    image: '/agenciamiento_aduanal.jpg',
  },

  {
    icon: '/whs.png',
    name: 'Almacenes de Carga <br/> General/Fiscal',
    shortName: 'Almacenes de Carga',
    description:
      'Espacios de almacenamiento general y fiscal en puntos estratégicos.',
    content: `
      <div>
        <p>
          <strong>ALMACENAMIENTO:</strong>
          Almacén Fiscal en Costa Rica con gran capacidad.
        </p>

        <p>
          Bodegas propias en Zona Libre, Colón, Panamá.
        </p>

        <p>
          Red de bodegas y almacenes con espacios preferenciales.
        </p>

        <p>
          Tarifas competitivas para nuestros clientes.
        </p>
      </div>
    `,
    image: '/almacen_fiscal.jpg',
  },

  {
    icon: '/seguro_de_carga.png',
    name: 'Seguros de Carga <br/> Internacional',
    shortName: 'Seguros de Carga',
    description:
      'Protección internacional para tus envíos de importación y exportación.',
    content: `
      <div>
        <p>
          <strong>SEGURO DE CARGA:</strong>
          Emisión de pólizas de seguro de carga internacional.
        </p>

        <p>
          Gestión inmediata y tarifas competitivas.
        </p>

        <p>
          Protección para operaciones de importación y exportación.
        </p>
      </div>
    `,
    image: '/transporte_carga.jpg',
  },
]

function Category() {
  const [modalOpen, setModalOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryItem | null>(null)

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
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [modalOpen])

  return (
    <>
      <section
        id="servicios"
        className="services-section"
      >
        <div className="services-grid">
          {category.map((item, index) => (
            <button
              key={item.shortName}
              type="button"
              onClick={() => openModal(item)}
              className="service-premium-card"
            >
              <span className="service-card-number">
                0{index + 1}
              </span>

              <div className="service-premium-icon">
                <img
                  src={item.icon}
                  alt={item.shortName}
                />
              </div>

              <div className="service-premium-content">
                <h3>{item.shortName}</h3>
                <p>{item.description}</p>
              </div>

              <div className="service-premium-footer">
                <span>Conocer servicio</span>
                <span className="service-premium-arrow">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="additional-services">
          <div className="additional-heading">
            <span>Más soluciones</span>

            <h2>
              Servicios complementarios
            </h2>

            <p>
              Soluciones adicionales para acompañar cada etapa
              de tu operación logística.
            </p>
          </div>

          <div className="additional-grid">
            {category2.map((item) => (
              <button
                key={item.shortName}
                type="button"
                onClick={() => openModal(item)}
                className="additional-card"
              >
                <div className="additional-icon">
                  <img
                    src={item.icon}
                    alt={item.shortName}
                  />
                </div>

                <div className="additional-content">
                  <h3>{item.shortName}</h3>
                  <p>{item.description}</p>
                </div>

                <span className="additional-arrow">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {modalOpen &&
        selectedCategory &&
        createPortal(
          <div
            className="service-modal-overlay"
            onMouseDown={closeModal}
          >
            <article
              className="service-modal-window"
              role="dialog"
              aria-modal="true"
              aria-label={selectedCategory.shortName}
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >
              <header className="service-modal-top">
                <div>
                  <span className="service-modal-eyebrow">
                    SERVICIO LOGÍSTICO
                  </span>

                  <h2>
                    {selectedCategory.shortName}
                  </h2>
                </div>

                <button
                  type="button"
                  className="service-modal-x"
                  onClick={closeModal}
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </header>

              <div className="service-modal-scroll">
                <div className="service-modal-hero">
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.shortName}
                  />

                  <div className="service-modal-hero-shade" />

                  <div className="service-modal-hero-title">
                    <span>CASTRO FALLAS</span>

                    <h3>
                      {selectedCategory.shortName}
                    </h3>
                  </div>
                </div>

                <div className="service-modal-grid">
                  <div
                    className="service-modal-description"
                    dangerouslySetInnerHTML={{
                      __html: selectedCategory.content,
                    }}
                  />

                  <aside className="service-modal-benefits">
                    <div className="service-benefit">
                      <div className="service-benefit-icon">
                        ✓
                      </div>

                      <div>
                        <h4>Seguridad</h4>
                        <p>
                          Gestión orientada a proteger la carga
                          durante cada etapa del proceso.
                        </p>
                      </div>
                    </div>

                    <div className="service-benefit">
                      <div className="service-benefit-icon">
                        ◎
                      </div>

                      <div>
                        <h4>Cobertura</h4>
                        <p>
                          Conexiones y soluciones adaptadas a
                          operaciones nacionales e internacionales.
                        </p>
                      </div>
                    </div>

                    <div className="service-benefit">
                      <div className="service-benefit-icon">
                        ↗
                      </div>

                      <div>
                        <h4>Eficiencia</h4>
                        <p>
                          Coordinación enfocada en optimizar
                          tiempos y procesos logísticos.
                        </p>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="service-modal-actions">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="service-modal-close-button"
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