import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'Grupo Castro Fallas'
const DEFAULT_SITE_URL = 'https://logisticacastrofallas.com'
const DEFAULT_IMAGE = '/logistica_maritima.jpg'

const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

type SeoRoute = {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

const seoByRoute: Record<string, SeoRoute> = {
  '/': {
    title: 'Grupo Castro Fallas | Logística, Aduanas y Transporte Internacional',
    description:
      'Soluciones de logística internacional, transporte marítimo, aéreo y terrestre, agencia aduanal, almacenamiento, seguro de carga y seguimiento de embarques.',
  },
  '/web-tracking': {
    title: 'Rastreo de carga | Grupo Castro Fallas',
    description:
      'Consulta el estado de tu carga con Grupo Castro Fallas mediante IDTRA, BL o número de contenedor y revisa la ruta de tu embarque.',
  },
  '/cotizacion': {
    title: 'Cotiza tu transporte internacional | Grupo Castro Fallas',
    description:
      'Solicita una cotización para transporte marítimo, aéreo o terrestre con Grupo Castro Fallas y recibe atención para tu operación logística.',
  },
  '/500': {
    title: 'Error del servidor | Grupo Castro Fallas',
    description: 'Ocurrió un error al procesar la solicitud.',
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
  const page = seoByRoute[normalizedPath] ?? {
    title: 'Página no encontrada | Grupo Castro Fallas',
    description: 'La página solicitada no está disponible.',
    noIndex: true,
  }

  const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`
  const imageUrl = absoluteUrl(page.image ?? DEFAULT_IMAGE)

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

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonicalUrl,
    inLanguage: 'es-CR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${siteUrl}/`,
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${siteUrl}/`,
    logo: absoluteUrl('/logo__rojo.png'),
    description:
      'Empresa de soluciones logísticas, transporte internacional, agencia aduanal, almacenamiento y servicios para la gestión de carga.',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${siteUrl}/`,
    inLanguage: 'es-CR',
  }

  return (
    <Helmet htmlAttributes={{ lang: 'es' }}>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="theme-color" content="#c8171d" />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es-CR" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_CR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${SITE_NAME} - soluciones logísticas`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      {normalizedPath === '/' && (
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      )}
      {normalizedPath === '/' && (
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      )}
    </Helmet>
  )
}

export default Seo
