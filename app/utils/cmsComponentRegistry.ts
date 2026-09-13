import type { Component } from 'vue'
import CmsBanner from '~/components/CmsBanner.vue'
import CmsCta from '~/components/CmsCta.vue'
import CmsFaq from '~/components/CmsFaq.vue'
import CmsForm from '~/components/CmsForm.vue'
import CmsGallery from '~/components/CmsGallery.vue'
import CmsHero from '~/components/CmsHero.vue'
import CmsImage from '~/components/CmsImage.vue'
import CmsLogos from '~/components/CmsLogos.vue'
import CmsMeetingForm from '~/components/CmsMeetingForm.vue'
import CmsNewsGrid from '~/components/CmsNewsGrid.vue'
import CmsRichText from '~/components/CmsRichText.vue'
import CmsServicesGrid from '~/components/CmsServicesGrid.vue'
import CmsStats from '~/components/CmsStats.vue'
import CmsTeam from '~/components/CmsTeam.vue'
import CmsTestimonials from '~/components/CmsTestimonials.vue'
import CmsVideo from '~/components/CmsVideo.vue'

export const CMS_COMPONENT_REGISTRY: Readonly<Record<string, Component>> = Object.freeze({
  Hero: CmsHero,
  RichText: CmsRichText,
  Image: CmsImage,
  Video: CmsVideo,
  Gallery: CmsGallery,
  Banner: CmsBanner,
  CTA: CmsCta,
  FAQ: CmsFaq,
  Testimonials: CmsTestimonials,
  ServicesGrid: CmsServicesGrid,
  NewsGrid: CmsNewsGrid,
  Form: CmsForm,
  MeetingForm: CmsMeetingForm,
  Logos: CmsLogos,
  Stats: CmsStats,
  Team: CmsTeam,
})

export function resolveCmsComponent(type: string) {
  return CMS_COMPONENT_REGISTRY[type]
}
