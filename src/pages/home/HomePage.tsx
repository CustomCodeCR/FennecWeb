// Importa la sección principal
import HeroSection from '../../components/hero/HeroSection'

// Importa la sección de servicios
import Category from '../../components/category/category'

// Importa la sección de rastreo y cotización
import Track from '../../components/track/track'

// Página principal
function HomePage() {
  return (
    <main>
      <HeroSection />
      <Category />
      <Track />
    </main>
  )
}

// Exporta la página principal
export default HomePage