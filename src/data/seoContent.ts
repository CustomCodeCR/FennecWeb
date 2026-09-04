export interface SeoService {
  name: string
  description: string
  serviceType: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
}

export interface SeoArticle {
  slug: string
  title: string
  description: string
  keywords: string[]
  image: string
  imageAlt: string
  datePublished: string
  dateModified: string
  intro: string
  sections: ArticleSection[]
}

export interface CustomerReview {
  author: string
  text: string
  source?: string
}

export const companySeo = {
  name: 'Grupo Castro Fallas',
  legalName: 'Castro Fallas Logística Internacional',
  url: 'https://logisticacastrofallas.com',
  logo: '/logo__rojo.png',
  telephone: '+506 2272-6772',
  whatsapp: '+506 7078-6860',
  email: 'comercial@castrofallas.com',
  addressLabel: 'Curridabat, San José, Costa Rica',
  addressLocality: 'Curridabat',
  addressRegion: 'San José',
  postalCode: '11801',
  addressCountry: 'CR',
  latitude: 9.915085533193173,
  longitude: -84.0457210670351,
  openingHours: 'Lunes a viernes: 7:30 am a 5:15 pm',
  socialProfiles: [
    'https://es-la.facebook.com/grupocastrofallas1/',
    'https://twitter.com/castrofagrupo',
    'https://www.instagram.com/grupocastrofallas1/',
    'https://www.linkedin.com/company/grupo-castro-fallas/',
  ],
} as const

export const seoServices: SeoService[] = [
  {
    name: 'Agencia Aduanal y Trámites de Aduanas',
    serviceType: 'Agencia aduanal',
    description:
      'Gestión de importaciones, exportaciones, documentación y coordinación aduanera para operaciones de comercio exterior.',
  },
  {
    name: 'Transporte Internacional Marítimo',
    serviceType: 'Transporte marítimo internacional',
    description:
      'Soluciones de carga marítima internacional en modalidades FCL y LCL para operaciones de importación y exportación.',
  },
  {
    name: 'Transporte Internacional Aéreo',
    serviceType: 'Transporte aéreo internacional',
    description:
      'Coordinación de carga aérea internacional para operaciones que requieren mayor velocidad y alcance global.',
  },
  {
    name: 'Transporte Internacional Terrestre',
    serviceType: 'Transporte terrestre internacional',
    description:
      'Cobertura terrestre regional mediante soluciones LTL y FTL para movilización de mercancías.',
  },
  {
    name: 'Almacén Fiscal y Almacenamiento de Carga',
    serviceType: 'Almacenamiento fiscal',
    description:
      'Servicios de almacenamiento general y fiscal para apoyar la operación logística y aduanera de la carga.',
  },
  {
    name: 'Seguro de Carga Internacional',
    serviceType: 'Seguro de carga',
    description:
      'Gestión de pólizas de seguro para proteger carga internacional de importación y exportación.',
  },
  {
    name: 'Proyecto Carga',
    serviceType: 'Carga proyecto',
    description:
      'Coordinación especializada de maquinaria, vehículos, carga sobredimensionada y operaciones con requerimientos especiales.',
  },
]

export const faqs: FaqItem[] = [
  {
    question: '¿Qué servicios ofrece Grupo Castro Fallas?',
    answer:
      'Grupo Castro Fallas ofrece agencia aduanal, transporte marítimo, aéreo y terrestre, almacenamiento general y fiscal, seguro de carga, proyecto carga, cotización y seguimiento de embarques.',
  },
  {
    question: '¿Cómo puedo solicitar una cotización de transporte internacional?',
    answer:
      'Puedes utilizar la sección de cotización del sitio e indicar el tipo de transporte, origen, destino, tipo de carga, peso, dimensiones y cantidad de piezas. El equipo de Pricing podrá validar la información y preparar la propuesta.',
  },
  {
    question: '¿Cómo puedo rastrear mi carga?',
    answer:
      'En Web Tracking puedes consultar un embarque utilizando el IDTRA, BL o número de contenedor para revisar la información disponible de la ruta y el estado de la carga.',
  },
  {
    question: '¿Manejan transporte marítimo FCL y LCL?',
    answer:
      'Sí. El servicio de transporte marítimo contempla modalidades FCL para contenedor completo y LCL para carga consolidada, según las características de cada operación.',
  },
  {
    question: '¿Ofrecen transporte terrestre LTL y FTL?',
    answer:
      'Sí. Grupo Castro Fallas maneja opciones LTL para carga parcial y FTL para carga completa en operaciones de transporte terrestre regional.',
  },
  {
    question: '¿Grupo Castro Fallas ofrece servicios de agencia aduanal?',
    answer:
      'Sí. Se brinda gestión aduanera para operaciones de importación y exportación, incluyendo coordinación documental y atención de los procesos relacionados con la carga.',
  },
  {
    question: '¿Cuentan con almacén fiscal y seguro de carga?',
    answer:
      'Sí. La oferta de servicios incluye almacenamiento general y fiscal, además de gestión de seguros para carga internacional.',
  },
]

export const articles: SeoArticle[] = [
  {
    slug: 'agencia-aduanal-costa-rica',
    title: '¿Qué hace una agencia aduanal y por qué es importante?',
    description:
      'Conoce el papel de una agencia aduanal en Costa Rica, qué información requiere una operación y cómo ayuda a coordinar importaciones y exportaciones.',
    keywords: [
      'agencia aduanal Costa Rica',
      'agencia de aduanas Costa Rica',
      'trámites aduaneros',
      'importaciones Costa Rica',
      'exportaciones Costa Rica',
    ],
    image: '/agenciamiento_aduanal.jpg',
    imageAlt: 'Gestión de agencia aduanal y trámites de aduanas en Costa Rica',
    datePublished: '2026-09-04',
    dateModified: '2026-09-04',
    intro:
      'Una agencia aduanal acompaña a importadores y exportadores en la coordinación de los procesos necesarios para el ingreso o salida de mercancías. Su función combina revisión documental, seguimiento operativo y comunicación con los distintos participantes de la cadena logística.',
    sections: [
      {
        heading: 'Funciones principales de una agencia aduanal',
        paragraphs: [
          'Entre sus funciones se encuentran la revisión de la documentación disponible, la coordinación de trámites de importación y exportación, el seguimiento de la operación y la comunicación con clientes, transportistas, almacenes y demás participantes involucrados.',
          'Una coordinación ordenada permite detectar faltantes de información con anticipación y mantener mayor visibilidad sobre las etapas del proceso aduanero.',
        ],
      },
      {
        heading: 'Información que conviene preparar antes de una operación',
        paragraphs: [
          'Es recomendable contar con datos claros sobre la mercancía, origen, destino, proveedor, documentos comerciales, modalidad de transporte y condiciones de la operación. Dependiendo del tipo de carga pueden existir requisitos adicionales que deben revisarse antes del despacho.',
        ],
      },
      {
        heading: 'Agencia aduanal y logística en un mismo proceso',
        paragraphs: [
          'Cuando el transporte internacional y la gestión aduanera se coordinan de forma integrada, la información puede fluir de manera más consistente entre las etapas de origen, tránsito, llegada y despacho. Grupo Castro Fallas reúne servicios logísticos y aduaneros para acompañar ese proceso.',
        ],
      },
    ],
  },
  {
    slug: 'transporte-maritimo-fcl-lcl',
    title: 'FCL vs. LCL: cómo elegir transporte marítimo para tu carga',
    description:
      'Diferencias entre FCL y LCL, cuándo conviene cada modalidad y qué datos considerar al cotizar transporte marítimo internacional.',
    keywords: [
      'FCL Costa Rica',
      'LCL Costa Rica',
      'transporte marítimo Costa Rica',
      'carga marítima internacional',
      'consolidado marítimo',
    ],
    image: '/logistica_maritima.jpg',
    imageAlt: 'Transporte marítimo internacional de contenedores FCL y carga LCL',
    datePublished: '2026-09-04',
    dateModified: '2026-09-04',
    intro:
      'FCL y LCL son dos modalidades frecuentes en transporte marítimo internacional. La elección depende del volumen de la mercancía, características de la carga, tiempos esperados y forma en que se desea organizar el embarque.',
    sections: [
      {
        heading: 'Qué es FCL',
        paragraphs: [
          'FCL se utiliza cuando la operación se organiza alrededor de un contenedor completo. Puede resultar conveniente cuando el volumen justifica el uso exclusivo del equipo o cuando se busca reducir manipulaciones adicionales de la mercancía.',
        ],
      },
      {
        heading: 'Qué es LCL',
        paragraphs: [
          'LCL permite consolidar mercancía de distintos embarcadores dentro de una misma operación marítima. El cobro suele relacionarse con el volumen y peso de la carga, por lo que puede ser una alternativa para embarques que no requieren un contenedor completo.',
        ],
      },
      {
        heading: 'Qué revisar antes de cotizar',
        paragraphs: [
          'Para comparar opciones conviene preparar origen, destino, peso, dimensiones, cantidad de piezas, tipo de mercancía y cualquier requerimiento especial. Con estos datos el equipo de Pricing puede evaluar la modalidad que mejor se adapte a la operación.',
        ],
      },
    ],
  },
  {
    slug: 'como-cotizar-transporte-internacional',
    title: 'Qué información preparar para cotizar transporte internacional',
    description:
      'Guía práctica con los datos que conviene reunir antes de solicitar una cotización de transporte marítimo, aéreo o terrestre.',
    keywords: [
      'cotización transporte internacional',
      'cotización logística Costa Rica',
      'cotizar carga marítima',
      'cotizar carga aérea',
      'freight forwarder Costa Rica',
    ],
    image: '/transporte_carga.jpg',
    imageAlt: 'Preparación de información para cotizar transporte internacional de carga',
    datePublished: '2026-09-04',
    dateModified: '2026-09-04',
    intro:
      'Una cotización logística es más precisa cuando la información de la carga está completa desde el inicio. Preparar los datos básicos permite reducir intercambios adicionales y facilita que Pricing compare las alternativas disponibles.',
    sections: [
      {
        heading: 'Origen, destino y modalidad de transporte',
        paragraphs: [
          'Indica dónde se encuentra la carga, cuál es el destino final y si buscas transporte marítimo, aéreo o terrestre. Si todavía no conoces la modalidad más conveniente, estos datos ayudan a evaluar alternativas.',
        ],
      },
      {
        heading: 'Peso, dimensiones y cantidad de piezas',
        paragraphs: [
          'El peso total, largo, ancho, alto y cantidad de piezas son datos esenciales para dimensionar el embarque. También conviene informar si se trata de tarimas, cajas, maquinaria, vehículos u otro tipo de unidad de carga.',
        ],
      },
      {
        heading: 'Características especiales de la mercancía',
        paragraphs: [
          'Si la carga es refrigerada, peligrosa, sobredimensionada o requiere un manejo específico, es importante indicarlo desde la solicitud. Esa información puede cambiar el tipo de equipo, ruta o servicio requerido.',
          'FennecWeb incluye un flujo de cotización para reunir estos datos y enviarlos al equipo de Pricing de Grupo Castro Fallas.',
        ],
      },
    ],
  },
]

export const customerReviews: CustomerReview[] = []

export const getArticleBySlug = (slug: string) =>
  articles.find((article) => article.slug === slug)
