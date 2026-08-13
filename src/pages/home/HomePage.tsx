// Importa la sección principal
import HeroSection from '../../components/hero/HeroSection'

// Importa la sección de servicios
import Category from '../../components/category/category'

// Importa la sección de rastreo y cotización
import Track from '../../components/track/track'

// Importa la sección Nosotros
import Nosotros from '../../components/nosotros/Nosotros'

// Página principal
function HomePage() {
  return (
    <main>
      <HeroSection />
      <Category />
      <Track />
      <Nosotros />
    </main>
  )
}

// Exporta la página principal
export default HomePage