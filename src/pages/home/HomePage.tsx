// Importa la sección principal
import HeroSection from '../../components/hero/HeroSection'

// Importa la sección de servicios
import Category from '../../components/category/category'

// Página principal
function HomePage() {
  return (
    <main>
      <HeroSection />
      <Category />
    </main>
  )
}

export default HomePage