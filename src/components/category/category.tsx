import { useState } from 'react'

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
    shortName: 'Transporte Aéreo',
    description:
      'Conexiones internacionales para envíos que requieren mayor velocidad.',
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
    shortName: 'Proyecto Carga',
    description:
      'Gestión especializada para maquinaria, vehículos y carga sobredimensionada.',
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

const category2: CategoryItem[] = [
  {
    icon: '/tramites_de_aduanas.png',
    name: 'Trámites de <br/> Aduanas',
    shortName: 'Trámites de Aduanas',
    description:
      'Gestión profesional de importaciones, exportaciones e Incoterms.',
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
    shortName: 'Almacenes de Carga',
    description:
      'Espacios de almacenamiento general y fiscal en puntos estratégicos.',
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
    shortName: 'Seguros de Carga',
    description:
      'Protección internacional para tus envíos de importación y exportación.',
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

  const openModal = (item: CategoryItem) => {
    setSelectedCategory(item)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <section id="servicios" className="services-section">
      {/* Principales */}
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
              <span className="service-premium-arrow">→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Adicionales */}
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

      {/* Modal */}
      {modalOpen && selectedCategory && (
        <div className="service-modal">
          <div className="service-modal-header">
            <div>
              <span>Servicio logístico</span>

              <h2>
                {selectedCategory.shortName}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="service-modal-close"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="service-modal-body">
            <div className="service-modal-image">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.shortName}
              />

              <div className="service-modal-image-overlay" />

              <div className="service-modal-image-title">
                <span>
                  Castro Fallas
                </span>

                <h2>
                  {selectedCategory.shortName}
                </h2>
              </div>
            </div>

            <div className="service-modal-content">
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: selectedCategory.content,
                }}
              />

              <button
                type="button"
                onClick={closeModal}
                className="service-modal-button"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Category