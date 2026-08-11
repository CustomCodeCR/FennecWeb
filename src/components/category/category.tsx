import { useState } from 'react'

// Define cómo debe estar formado cada servicio
interface CategoryItem {
  icon: string
  name: string
  content: string
  image: string
}

// Servicios principales
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

// Servicios adicionales
const category2: CategoryItem[] = [
  {
    icon: '/tramites_de_aduanas.png',
    name: 'Trámites de <br/> Aduanas',
    content: `
      <p>
        <strong>Personal altamente calificado, profesional y técnico.</strong>
        Le brindamos nuestro servicio de agencia de aduanas en
        <strong>IMPORT</strong> o <strong>EXPORT</strong>.
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
        <strong>ZONA LIBRE, COLÓN, PANAMÁ.</strong>
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

// Componente principal
function Category() {
  // Controla si la información está abierta
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  // Guarda el servicio seleccionado
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryItem | null>(null)

  // Abre la información de un servicio
  const openModal = (item: CategoryItem) => {
    setSelectedCategory(item)
    setModalOpen(true)
  }

  // Cierra la información
  const closeModal = () => {
    setModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <section
      id="servicios"
      className="w-full bg-gray-50 py-16 px-6"
    >
      {/* Título principal */}
      <div className="text-center mb-12">
        <p className="text-red-500 font-semibold uppercase tracking-widest text-sm">
          Lo que hacemos
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Nuestros Servicios
        </h1>

        <p className="text-gray-500 mt-3">
          Soluciones logísticas para tus necesidades.
        </p>
      </div>

      {/* Servicios principales */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {category.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openModal(item)}
              className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Contenedor del icono */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <img
                  src={item.icon}
                  alt={item.name.replace('<br/>', ' ')}
                  className="w-14 h-14 object-contain"
                />
              </div>

              {/* Nombre */}
              <div className="mt-4 font-semibold text-gray-800 text-sm md:text-base leading-tight">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.name,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Servicios adicionales */}
      <div className="max-w-4xl mx-auto mt-14">
        <h2 className="text-2xl font-bold text-center mb-7">
          Servicios Adicionales
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {category2.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openModal(item)}
              className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Contenedor del icono */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <img
                  src={item.icon}
                  alt={item.name.replace('<br/>', ' ')}
                  className="w-14 h-14 object-contain"
                />
              </div>

              {/* Nombre */}
              <div className="mt-4 font-semibold text-gray-800 text-sm md:text-base leading-tight">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.name,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedCategory && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Caja del modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Botón X */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-700 text-xl hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Imagen grande */}
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name.replace('<br/>', ' ')}
              className="w-full h-56 md:h-72 object-cover rounded-t-2xl"
            />

            {/* Información */}
            <div className="p-6 md:p-8 text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">
                <span
                  dangerouslySetInnerHTML={{
                    __html: selectedCategory.name,
                  }}
                />
              </h2>

              <div
                className="text-gray-600 leading-7 space-y-3"
                dangerouslySetInnerHTML={{
                  __html: selectedCategory.content,
                }}
              />

              {/* Botón cerrar */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors cursor-pointer"
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