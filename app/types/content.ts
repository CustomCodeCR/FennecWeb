export interface PublicSeo {
  title?: string | null
  description?: string | null
  keywords?: string | null
  canonicalUrl?: string | null
  robots?: string | null
  openGraphMediaId?: string | null
  structuredDataJson?: string | null
}

export interface PublicContentMedia {
  id?: string
  mediaReferenceId?: string
  role?: string
  altText?: string | null
  caption?: string | null
  url?: string | null
  publicUrl?: string | null
  storageUrl?: string | null
}

export interface CmsBlock {
  id: string
  type: string
  isVisible: boolean
  data: Record<string, unknown>
}

export interface PublicContentPage {
  id: string
  siteKey: string
  type: string
  status: string
  title: string
  slug: string
  excerpt?: string | null
  blocksJson: string
  renderedHtml?: string | null
  featuredMediaId?: string | null
  locale: string
  templateKey?: string | null
  seo: PublicSeo
  publishedAtUtc?: string | null
  updatedAtUtc?: string | null
  media?: PublicContentMedia[]
}

export type PublicContentResponse = PublicContentPage | { data: PublicContentPage }
