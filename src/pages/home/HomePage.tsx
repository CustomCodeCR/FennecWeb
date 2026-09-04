import ContactForm from '../../Complements/Contact/ContactForm'
import Category from '../../components/category/category'
import DataComponent from '../../components/datos/DataComponent'
import HeroSection from '../../components/hero/HeroSection'
import Nosotros from '../../components/nosotros/Nosotros'
import ScrollTopButton from '../../components/scrolltop/ScrollTopButton'
import SeoLandingContent from '../../components/seo/SeoLandingContent'
import Track from '../../components/track/track'
import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-gradient-to-b from-white to-slate-50">
      <HeroSection />

      <PageSection id="servicios-home" variant="light">
        <SectionHeader
          eyebrow="NUESTROS SERVICIOS"
          title="Soluciones logísticas para importación y exportación"
          description="Conectamos tu carga con diferentes destinos mediante servicios de aduanas, transporte internacional, almacenamiento y protección de mercancías."
        />
        <Category />
      </PageSection>

      <PageSection id="Nosotros" variant="light">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">NOSOTROS</span>
        </div>
        <Nosotros />
      </PageSection>

      <PageSection variant="soft">
        <Track />
      </PageSection>

      <DataComponent />
      <SeoLandingContent />

      <section id="CONTÁCTANOS" className="w-full bg-white py-16 md:py-20">
        <ContactForm />
      </section>

      <ScrollTopButton />
    </main>
  )
}

export default HomePage
