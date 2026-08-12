import HeroSection from '../../components/hero/HeroSection'
import Category from '../../components/category/category'
import Track from '../../components/track/track'
import Nosotros from '../../components/nosotros/Nosotros'
import DataComponent from '../../components/datos/DataComponent'

function HomePage() {
  return (
    <main>
      <HeroSection />
      <Category />
      <Track />
      <Nosotros />
      <DataComponent />
    </main>
  )
}

export default HomePage