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
    title: 'Agencia Aduanal y Logística en Costa Rica | Grupo Castro Fallas',
    description:
      'Agencia aduanal y soluciones logísticas en Costa Rica: transporte marítimo, aéreo y terrestre, almacén fiscal, seguro de carga, cotización y tracking internacional.',
    keywords: [
      'agencia aduanal Costa Rica',
      'agencia de aduanas Costa Rica',
      'logística Costa Rica',
      'logística internacional Costa Rica',
      'transporte internacional Costa Rica',
      'transporte marítimo Costa Rica',
      'carga marítima Costa Rica',
      'transporte aéreo Costa Rica',
      'carga aérea Costa Rica',
      'transporte terrestre Centroamérica',
      'almacén fiscal Costa Rica',
      'almacenamiento de carga',
      'seguro de carga internacional',
      'consolidado de carga',
      'FCL Costa Rica',
      'LCL Costa Rica',
      'importaciones Costa Rica',
      'exportaciones Costa Rica',
      'freight forwarder Costa Rica',
      'rastreo de carga',
      'Grupo Castro Fallas',
    ],
    imageAlt: 'Grupo Castro Fallas - agencia aduanal y soluciones logísticas en Costa Rica',
  },
  '/web-tracking': {
    title: 'Rastreo de carga y contenedores | Grupo Castro Fallas',
    description:
      'Rastrea tu carga con Grupo Castro Fallas mediante IDTRA, BL o número de contenedor y consulta la información disponible de tu embarque internacional.',
    keywords: [
      'rastreo de carga',
      'tracking de carga Costa Rica',
      'seguimiento de contenedor',
      'rastreo BL',
      'IDTRA',
      'tracking marítimo',
      'seguimiento de embarques',
      'Grupo Castro Fallas',
    ],
    imageAlt: 'Rastreo y seguimiento de carga - Grupo Castro Fallas',
  },
  '/cotizacion': {
    title: 'Cotización de transporte internacional | Grupo Castro Fallas',
    description:
      'Solicita una cotización de transporte marítimo, aéreo o terrestre desde Costa Rica y prepara los datos de tu carga para nuestro equipo de Pricing.',
    keywords: [
      'cotización logística Costa Rica',
      'cotizar transporte internacional',
      'cotización transporte marítimo',
      'cotización transporte aéreo',
      'cotización transporte terrestre',
      'freight forwarder Costa Rica',
      'freight forwarding Costa Rica',
      'Grupo Castro Fallas',
    ],
    imageAlt: 'Cotización de transporte internacional - Grupo Castro Fallas',
  },
  '/500': {
    title: 'Error del servidor | Grupo Castro Fallas',
    description: 'Ocurrió un error al procesar la solicitud.',
    keywords: ['Grupo Castro Fallas'],
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
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(companySeo.logo),
    },
    image: imageUrl,
    telephone: companySeo.telephone,
    email: companySeo.email,
    description:
      'Empresa de agencia aduanal, logística internacional, transporte marítimo, aéreo y terrestre, almacenamiento y servicios para la gestión de carga.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: companySeo.addressLocality,
      addressRegion: companySeo.addressRegion,
      postalCode: companySeo.postalCode,
      addressCountry: companySeo.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: companySeo.telephone,
        contactType: 'customer service',
        availableLanguage: ['es'],
      },
      {
        '@type': 'ContactPoint',
        telephone: companySeo.whatsapp,
        contactType: 'sales',
        availableLanguage: ['es'],
      },
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
    description:
      'Agencia aduanal y empresa de soluciones logísticas con sede en Curridabat, San José, Costa Rica.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: companySeo.addressLocality,
      addressRegion: companySeo.addressRegion,
      postalCode: companySeo.postalCode,
      addressCountry: companySeo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: companySeo.latitude,
      longitude: companySeo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '17:15',
      },
    ],
    parentOrganization: {
      '@id': organizationId,
    },
  }

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE_NAME,
    url: `${siteUrl}/`,
    inLanguage: 'es-CR',
    publisher: {
      '@id': organizationId,
    },
  }

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': webPageId,
    name: page.title,
    description: page.description,
    url: canonicalUrl,
    inLanguage: 'es-CR',
    isPartOf: {
      '@id': websiteId,
    },
    about: {
      '@id': organizationId,
    },
  }

  const breadcrumbItems = article
    ? [
        { name: 'Inicio', item: `${siteUrl}/` },
        { name: article.title, item: canonicalUrl },
      ]
    : normalizedPath === '/web-tracking'
      ? [
          { name: 'Inicio', item: `${siteUrl}/` },
          { name: 'Rastreo de carga', item: canonicalUrl },
        ]
      : normalizedPath === '/cotizacion'
        ? [
            { name: 'Inicio', item: `${siteUrl}/` },
            { name: 'Cotización', item: canonicalUrl },
          ]
        : [{ name: 'Inicio', item: `${siteUrl}/` }]

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

  const homeSchemas = normalizedPath === '/'
    ? [
        localBusinessSchema,
        ...seoServices.map((service, index) => ({
          '@type': 'Service',
          '@id': `${siteUrl}/#service-${index + 1}`,
          name: service.name,
          serviceType: service.serviceType,
          description: service.description,
          url: `${siteUrl}/#servicios`,
          provider: {
            '@id': organizationId,
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Costa Rica y mercados internacionales',
          },
        })),
        {
          '@type': 'FAQPage',
          '@id': `${siteUrl}/#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ]
    : []

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
          mainEntityOfPage: {
            '@id': webPageId,
          },
          author: {
            '@id': organizationId,
          },
          publisher: {
            '@id': organizationId,
          },
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
