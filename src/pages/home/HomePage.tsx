import HeroSection from '../../components/hero/HeroSection'
import Category from '../../components/category/category'
import Track from '../../components/track/track'
import Nosotros from '../../components/nosotros/Nosotros'
import DataComponent from '../../components/datos/DataComponent'
import ScrollTopButton from '../../components/scrolltop/ScrollTopButton'

import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

function HomePage() {
  return (
    <main className="home-page">
      <HeroSection />

      <PageSection
        id="servicios-home"
        variant="light"
      >
        <SectionHeader
          eyebrow="NUESTROS SERVICIOS"
          title="Soluciones logísticas para cada necesidad"
          description="Conectamos tu carga con diferentes destinos de forma segura, eficiente y confiable."
        />

        <Category />
      </PageSection>

      <PageSection variant="soft">
        <Track />
      </PageSection>

      <PageSection variant="light">
        <Nosotros />
      </PageSection>

      <DataComponent />

      <ScrollTopButton />
    </main>
  )
}

export default HomePage