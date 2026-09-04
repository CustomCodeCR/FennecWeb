import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { companySeo, faqs, getArticleBySlug, seoServices } from '../data/seoContent'

const SITE_NAME = companySeo.name
const DEFAULT_SITE_URL = companySeo.url
const DEFAULT_IMAGE = '/logistica_maritima.jpg'
const DEFAULT_IMAGE_TYPE = 'image/jpeg'

const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

type SeoPage = {
  title: string
  description: string
  keywords: string[]
  image?: string
  imageAlt?: string
  imageType?: string
  noIndex?: boolean
}

const seoByRoute: Record<string, SeoPage> = {
  '/': {
    title: 'Grupo Castro Fallas',
    description:
      'Agencia aduanal y soluciones logísticas en Costa Rica: transporte marítimo, aéreo y terrestre, almacén fiscal, seguro de carga, cotización y tracking internacional.',
    keywords: [
      'agencia aduanal Costa Rica',
      'agencia de aduanas Costa Rica',
      'logística Costa Rica',
      'logística internacional Costa Rica',
      'transporte internacional Costa Rica',
      'transporte marítimo Costa Rica',
      'transporte aéreo Costa Rica',
      'transporte terrestre Centroamérica',
      'almacén fiscal Costa Rica',
      'seguro de carga internacional',
      'FCL Costa Rica',
      'LCL Costa Rica',
      'importaciones Costa Rica',
      'exportaciones Costa Rica',
      'Grupo Castro Fallas',
    ],
    imageAlt: 'Grupo Castro Fallas - logística internacional en Costa Rica',
  },
  '/web-tracking': {
    title: 'Rastreo de carga y contenedores | Grupo Castro Fallas',
    description:
      'Rastrea tu carga con Grupo Castro Fallas mediante IDTRA, BL o número de contenedor y consulta la información disponible de tu embarque internacional.',
    keywords: ['rastreo de carga', 'tracking de carga Costa Rica', 'seguimiento de contenedor', 'rastreo BL', 'IDTRA', 'tracking marítimo', SITE_NAME],
    imageAlt: 'Rastreo y seguimiento de carga - Grupo Castro Fallas',
  },
  '/cotizacion': {
    title: 'Cotización de transporte internacional | Grupo Castro Fallas',
    description:
      'Solicita una cotización de transporte marítimo, aéreo o terrestre desde Costa Rica y prepara los datos de tu carga para nuestro equipo de Pricing.',
    keywords: ['cotización logística Costa Rica', 'cotizar transporte internacional', 'cotización transporte marítimo', 'cotización transporte aéreo', 'cotización transporte terrestre', 'freight forwarder Costa Rica', SITE_NAME],
    imageAlt: 'Cotización de transporte internacional - Grupo Castro Fallas',
  },
  '/servicios-logisticos': {
    title: 'Servicios logísticos y agencia aduanal | Grupo Castro Fallas',
    description:
      'Conoce los servicios de agencia aduanal, transporte marítimo, aéreo y terrestre, almacén fiscal, seguro de carga y proyecto carga de Grupo Castro Fallas.',
    keywords: ['servicios logísticos Costa Rica', 'agencia aduanal Costa Rica', 'transporte marítimo', 'transporte aéreo', 'transporte terrestre', 'almacén fiscal', 'seguro de carga', SITE_NAME],
    imageAlt: 'Servicios logísticos de Grupo Castro Fallas',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas frecuentes | Grupo Castro Fallas',
    description:
      'Respuestas sobre servicios logísticos, agencia aduanal, transporte internacional, cotizaciones y rastreo de carga con Grupo Castro Fallas.',
    keywords: ['preguntas frecuentes logística', 'agencia aduanal', 'cotización de carga', 'rastreo de carga', SITE_NAME],
    imageAlt: 'Preguntas frecuentes de Grupo Castro Fallas',
  },
  '/articulos': {
    title: 'Artículos de logística y comercio exterior | Grupo Castro Fallas',
    description:
      'Consulta guías sobre agencia aduanal, FCL, LCL, transporte internacional y preparación de cotizaciones logísticas.',
    keywords: ['artículos logística', 'comercio exterior Costa Rica', 'agencia aduanal Costa Rica', 'FCL', 'LCL', 'transporte internacional', SITE_NAME],
    imageAlt: 'Artículos de logística y comercio exterior - Grupo Castro Fallas',
  },
  '/opiniones': {
    title: 'Opiniones de clientes | Grupo Castro Fallas',
    description: 'Página preparada para publicar opiniones verificadas de clientes de Grupo Castro Fallas.',
    keywords: ['opiniones Grupo Castro Fallas', 'clientes Grupo Castro Fallas'],
    noIndex: true,
  },
  '/500': {
    title: 'Error del servidor | Grupo Castro Fallas',
    description: 'Ocurrió un error al procesar la solicitud.',
    keywords: [SITE_NAME],
    noIndex: true,
  },
}

const normalizePath = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '')
  return normalized || '/'
}

const absoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value
  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

export function Seo() {
  const { pathname } = useLocation()
  const normalizedPath = normalizePath(pathname)
  const articleSlug = normalizedPath.startsWith('/articulos/')
    ? normalizedPath.slice('/articulos/'.length)
    : ''
  const article = articleSlug ? getArticleBySlug(articleSlug) : undefined

  const page: SeoPage = article
    ? {
        title: `${article.title} | ${SITE_NAME}`,
        description: article.description,
        keywords: [...article.keywords, SITE_NAME],
        image: article.image,
        imageAlt: article.imageAlt,
      }
    : seoByRoute[normalizedPath] ?? {
        title: `Página no encontrada | ${SITE_NAME}`,
        description: 'La página solicitada no está disponible.',
        keywords: [SITE_NAME],
        noIndex: true,
      }

  const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`
  const imageUrl = absoluteUrl(page.image ?? DEFAULT_IMAGE)
  const imageAlt = page.imageAlt ?? `${SITE_NAME} - soluciones logísticas`
  const imageType = page.imageType ?? DEFAULT_IMAGE_TYPE

  const indexingSetting = import.meta.env.VITE_ALLOW_INDEXING
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isProductionHost =
    hostname === 'logisticacastrofallas.com' || hostname === 'www.logisticacastrofallas.com'
  const allowIndexing =
    indexingSetting === 'true' || (indexingSetting !== 'false' && isProductionHost)
  const shouldIndex = allowIndexing && !page.noIndex
  const robots = shouldIndex
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow'

  const organizationId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`
  const webPageId = `${canonicalUrl}#webpage`

  const organizationSchema = {
    '@type': 'Organization',
    '@id': organizationId,
    name: companySeo.name,
    legalName: companySeo.legalName,
    url: `${siteUrl}/`,
    logo: { '@type': 'ImageObject', url: absoluteUrl(companySeo.logo) },
    image: imageUrl,
    telephone: companySeo.telephone,
    email: companySeo.email,
    description:
      'Empresa de agencia aduanal, logística internacional, transporte marítimo, aéreo y terrestre, almacenamiento y servicios para la gestión de carga.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: companySeo.streetAddress,
      addressLocality: companySeo.addressLocality,
      addressRegion: companySeo.addressRegion,
      postalCode: companySeo.postalCode,
      addressCountry: companySeo.addressCountry,
    },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: companySeo.telephone, contactType: 'customer service', availableLanguage: ['es'] },
      { '@type': 'ContactPoint', telephone: companySeo.whatsapp, contactType: 'sales', availableLanguage: ['es'] },
    ],
    sameAs: companySeo.socialProfiles,
  }

  const localBusinessSchema = {
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: companySeo.name,
    url: `${siteUrl}/`,
    logo: absoluteUrl(companySeo.logo),
    image: imageUrl,
    telephone: companySeo.telephone,
    email: companySeo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companySeo.streetAddress,
      addressLocality: companySeo.addressLocality,
      addressRegion: companySeo.addressRegion,
      postalCode: companySeo.postalCode,
      addressCountry: companySeo.addressCountry,
    },
    geo: { '@type': 'GeoCoordinates', latitude: companySeo.latitude, longitude: companySeo.longitude },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '17:15',
      },
    ],
    parentOrganization: { '@id': organizationId },
  }

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE_NAME,
    url: `${siteUrl}/`,
    inLanguage: 'es-CR',
    publisher: { '@id': organizationId },
  }

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': webPageId,
    name: page.title,
    description: page.description,
    url: canonicalUrl,
    inLanguage: 'es-CR',
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
  }

  const pageLabels: Record<string, string> = {
    '/web-tracking': 'Rastreo de carga',
    '/cotizacion': 'Cotización',
    '/servicios-logisticos': 'Servicios logísticos',
    '/preguntas-frecuentes': 'Preguntas frecuentes',
    '/articulos': 'Artículos',
    '/opiniones': 'Opiniones',
  }

  const breadcrumbItems = article
    ? [
        { name: 'Inicio', item: `${siteUrl}/` },
        { name: 'Artículos', item: `${siteUrl}/articulos` },
        { name: article.title, item: canonicalUrl },
      ]
    : normalizedPath === '/'
      ? [{ name: 'Inicio', item: `${siteUrl}/` }]
      : [
          { name: 'Inicio', item: `${siteUrl}/` },
          { name: pageLabels[normalizedPath] ?? page.title, item: canonicalUrl },
        ]

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  const serviceSchemas = normalizedPath === '/servicios-logisticos'
    ? seoServices.map((service, index) => ({
        '@type': 'Service',
        '@id': `${siteUrl}/servicios-logisticos#service-${index + 1}`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        url: `${siteUrl}/servicios-logisticos`,
        provider: { '@id': organizationId },
        areaServed: { '@type': 'AdministrativeArea', name: 'Costa Rica y mercados internacionales' },
      }))
    : []

  const faqSchemas = normalizedPath === '/preguntas-frecuentes'
    ? [
        {
          '@type': 'FAQPage',
          '@id': `${siteUrl}/preguntas-frecuentes#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ]
    : []

  const homeSchemas = normalizedPath === '/' ? [localBusinessSchema] : []

  const articleSchemas = article
    ? [
        {
          '@type': 'Article',
          '@id': `${canonicalUrl}#article`,
          headline: article.title,
          description: article.description,
          image: [absoluteUrl(article.image)],
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          inLanguage: 'es-CR',
          keywords: article.keywords.join(', '),
          mainEntityOfPage: { '@id': webPageId },
          author: { '@id': organizationId },
          publisher: { '@id': organizationId },
        },
      ]
    : []

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      webPageSchema,
      breadcrumbSchema,
      ...homeSchemas,
      ...serviceSchemas,
      ...faqSchemas,
      ...articleSchemas,
    ],
  }

  return (
    <Helmet htmlAttributes={{ lang: 'es' }}>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="keywords" content={page.keywords.join(', ')} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <meta name="creator" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="theme-color" content="#c8171d" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="geo.region" content="CR-SJ" />
      <meta name="geo.placename" content="Curridabat, San José" />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es-CR" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:locale" content="es_CR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@castrofagrupo" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}

export default Seo