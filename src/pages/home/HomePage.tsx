import HeroSection from "../../components/hero/HeroSection";
import Category from "../../components/category/category";
import Track from "../../components/track/track";
import Nosotros from "../../components/nosotros/Nosotros";
import DataComponent from "../../components/datos/DataComponent";
import ScrollTopButton from "../../components/scrolltop/ScrollTopButton";
import ContactForm from "../../Complements/Contact/ContactForm";

import PageSection from "../../ui/PageSection";


function HomePage() {
  return (
    <main className="home-page">
      {/* Hero principal */}
      <HeroSection />

      {/* Servicios */}
      <PageSection id="servicios-home" variant="light">
          eyebrow="NUESTROS SERVICIOS"
          title="Soluciones logísticas para cada necesidad"
          description="Conectamos tu carga con diferentes destinos de forma segura, eficiente y confiable."
        


         <Category />

        {/* Le pones el id a la section principal */}
        <section id="Nosotros" className="home-section home-section-light">
          <div className="home-section-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">Nosotros</span>
            </div>
            <Nosotros />
          </div>
        </section>


      {/* Tracking */}
      <PageSection variant="soft">
        <Track />
      </PageSection>

      {/* Datos destacados */}
      <DataComponent />

        {/* Mantiene el ID en mayúsculas para que el Navbar lo encuentre con el scroll */}
        <section id="CONTÁCTANOS" className="home-section home-section-light">
          <div className="home-section-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">CONTÁCTANOS</span>
            </div>
            {/* Componente corregido sin tildes para evitar el error de React */}
            <ContactForm />
          </div>
        </section>

       
      </PageSection>

      <ScrollTopButton />
    </main>
  );
}

export default HomePage;