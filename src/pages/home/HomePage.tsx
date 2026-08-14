import type { ReactNode } from 'react'

import HeroSection from '../../components/hero/HeroSection'
import Category from '../../components/category/category'
import Track from '../../components/track/track'
import Nosotros from '../../components/nosotros/Nosotros'
import DataComponent from '../../components/datos/DataComponent'
import ScrollTopButton from '../../components/scrolltop/ScrollTopButton'

interface HomeSectionProps {
  children: ReactNode
  variant?: 'light' | 'soft'
}

function HomeSection({
  children,
  variant = 'light',
}: HomeSectionProps) {
  return (
    <section className={`home-section home-section-${variant}`}>
      <div className="home-section-container">
        {children}
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <main className="home-page">
      <HeroSection />

      <HomeSection>
        <div className="home-section-heading">
          <span className="home-eyebrow">
            NUESTROS SERVICIOS
          </span>

          <h2>
            Soluciones logísticas para cada necesidad
          </h2>

          <p>
            Conectamos tu carga con diferentes destinos de forma segura,
            eficiente y confiable.
          </p>
        </div>

        <Category />
      </HomeSection>

      <HomeSection variant="soft">
        <Track />
      </HomeSection>

      <HomeSection>
        <Nosotros />
      </HomeSection>

      <DataComponent />

      <ScrollTopButton />
    </main>
  )
}

export default HomePage