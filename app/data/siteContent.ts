export interface ServiceItem {
  name: string
  description: string
  image: string
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
}

export interface ArticleItem {
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  datePublished: string
  intro: string
  sections: ArticleSection[]
}

export const services: ServiceItem[] = [
  { name: 'Agencia Aduanal y Trámites de Aduanas', description: 'Gestión de importaciones, exportaciones, documentación y coordinación aduanera para operaciones de comercio exterior.', image: '/agenciamiento_aduanal.jpg' },
  { name: 'Transporte Internacional Marítimo', description: 'Soluciones de carga marítima internacional en modalidades FCL y LCL para importación y exportación.', image: '/logistica_maritima.jpg' },
  { name: 'Transporte Internacional Aéreo', description: 'Coordinación de carga aérea internacional para operaciones que requieren mayor velocidad y alcance global.', image: '/logistica_aerea.jpg' },
  { name: 'Transporte Internacional Terrestre', description: 'Cobertura terrestre regional mediante soluciones LTL y FTL para movilización de mercancías.', image: '/logistica_terreste.jpg' },
  { name: 'Almacén Fiscal', description: 'Servicios de almacenamiento general y fiscal para apoyar la operación logística y aduanera de la carga.', image: '/almacen_fiscal.jpg' },
  { name: 'Seguro de Carga Internacional', description: 'Gestión de pólizas para proteger carga internacional de importación y exportación.', image: '/seguro_de_carga.png' },
]

export const faqs = [
  ['¿Qué servicios ofrece Grupo Castro Fallas?', 'Agencia aduanal, transporte marítimo, aéreo y terrestre, almacenamiento, seguro de carga, proyecto carga, cotización y seguimiento de embarques.'],
  ['¿Cómo puedo solicitar una cotización?', 'Utiliza la sección de cotización e indica transporte, origen, destino, tipo de carga, peso, dimensiones y piezas.'],
  ['¿Cómo puedo rastrear mi carga?', 'En Web Tracking puedes consultar por IDTRA, BL o número de contenedor.'],
  ['¿Manejan FCL y LCL?', 'Sí. El transporte marítimo contempla FCL para contenedor completo y LCL para carga consolidada.'],
]

export const articles: ArticleItem[] = [
  {
    slug: 'agencia-aduanal-costa-rica',
    title: '¿Qué hace una agencia aduanal y por qué es importante?',
    description: 'Conoce el papel de una agencia aduanal en Costa Rica y cómo ayuda a coordinar importaciones y exportaciones.',
    image: '/agenciamiento_aduanal.jpg',
    imageAlt: 'Gestión de agencia aduanal y trámites de aduanas en Costa Rica',
    datePublished: '2026-09-04',
    intro: 'Una agencia aduanal acompaña a importadores y exportadores en la coordinación de los procesos necesarios para el ingreso o salida de mercancías.',
    sections: [
      { heading: 'Funciones principales', paragraphs: ['Entre sus funciones se encuentran la revisión documental, la coordinación de trámites y el seguimiento de la operación con los participantes de la cadena logística.'] },
      { heading: 'Información que conviene preparar', paragraphs: ['Es recomendable contar con datos claros sobre mercancía, origen, destino, proveedor, documentos comerciales y modalidad de transporte.'] },
      { heading: 'Aduanas y logística', paragraphs: ['Cuando transporte internacional y gestión aduanera se coordinan de forma integrada, la información fluye de manera más consistente durante toda la operación.'] },
    ],
  },
  {
    slug: 'transporte-maritimo-fcl-lcl',
    title: 'FCL vs. LCL: cómo elegir transporte marítimo para tu carga',
    description: 'Diferencias entre FCL y LCL, cuándo conviene cada modalidad y qué datos considerar al cotizar.',
    image: '/logistica_maritima.jpg',
    imageAlt: 'Transporte marítimo internacional de contenedores FCL y carga LCL',
    datePublished: '2026-09-04',
    intro: 'FCL y LCL son dos modalidades frecuentes en transporte marítimo internacional. La elección depende del volumen, características y tiempos de la carga.',
    sections: [
      { heading: 'Qué es FCL', paragraphs: ['FCL se utiliza cuando la operación se organiza alrededor de un contenedor completo.'] },
      { heading: 'Qué es LCL', paragraphs: ['LCL permite consolidar mercancía de distintos embarcadores dentro de una misma operación marítima.'] },
      { heading: 'Qué revisar antes de cotizar', paragraphs: ['Conviene preparar origen, destino, peso, dimensiones, piezas, tipo de mercancía y cualquier requerimiento especial.'] },
    ],
  },
  {
    slug: 'como-cotizar-transporte-internacional',
    title: 'Qué información preparar para cotizar transporte internacional',
    description: 'Guía práctica con los datos que conviene reunir antes de solicitar una cotización marítima, aérea o terrestre.',
    image: '/transporte_carga.jpg',
    imageAlt: 'Preparación de información para cotizar transporte internacional de carga',
    datePublished: '2026-09-04',
    intro: 'Una cotización logística es más precisa cuando la información de la carga está completa desde el inicio.',
    sections: [
      { heading: 'Origen, destino y modalidad', paragraphs: ['Indica dónde se encuentra la carga, cuál es el destino final y si buscas transporte marítimo, aéreo o terrestre.'] },
      { heading: 'Peso, dimensiones y piezas', paragraphs: ['El peso total, largo, ancho, alto y cantidad de piezas son datos esenciales para dimensionar el embarque.'] },
      { heading: 'Características especiales', paragraphs: ['Si la carga es refrigerada, peligrosa o sobredimensionada, es importante indicarlo desde la solicitud.'] },
    ],
  },
]

export const getArticleBySlug = (slug: string) => articles.find((article) => article.slug === slug)
