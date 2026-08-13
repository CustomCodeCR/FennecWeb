import HeroSection from '../../components/hero/HeroSection'
import Category from '../../components/category/category'
import Track from '../../components/track/track'
import Nosotros from '../../components/nosotros/Nosotros'
import DataComponent from '../../components/datos/DataComponent'
import ScrollTopButton from '../../components/scrolltop/ScrollTopButton'

function HomePage() {
  return (
    <main className="home-page">
      {/* Hero principal */}
      <HeroSection />

      {/* Servicios */}
      <section className="home-section home-section-light">
        <div className="home-section-container">
          <div className="home-section-heading">
            <span className="home-eyebrow">NUESTROS SERVICIOS</span>

            <h2>
              Soluciones logísticas para cada necesidad
            </h2>

            <p>
              Conectamos tu carga con diferentes destinos de forma segura,
              eficiente y confiable.
            </p>
          </div>

          <Category />
        </div>
      </section>

      {/* Tracking */}
      <section className="home-section home-section-soft">
        <div className="home-section-container">
          <Track />
        </div>
      </section>

      {/* Nosotros */}
      <section className="home-section home-section-light">
        <div className="home-section-container">
          <Nosotros />
        </div>
      </section>

      {/* Datos destacados */}
      <DataComponent />

      {/* Botón para volver arriba */}
      <ScrollTopButton />
    </main>
  )
}

export default HomePage