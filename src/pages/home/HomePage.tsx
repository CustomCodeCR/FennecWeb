import HeroSection from "../../components/hero/HeroSection";
import Category from "../../components/category/category";
import Track from "../../components/track/track";
import Nosotros from "../../components/nosotros/Nosotros";
import DataComponent from "../../components/datos/DataComponent";
import ScrollTopButton from "../../components/scrolltop/ScrollTopButton";
import ContactForm from "../../Complements/Contact/ContactForm";
import { Helmet } from "react-helmet-async";
import PageSection from "../../ui/PageSection";
import SectionHeader from "../../ui/SectionHeader";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Inicio | Tu Empresa</title>
        <meta
          name="description"
          content="Descripción de la página de inicio"
        />
        <meta property="og:title" content="Inicio | Tu Empresa" />
        <meta
          property="og:description"
          content="Descripción de la página de inicio"
        />
      </Helmet>

      <main className="home-page">
        {/* Hero principal */}
        <HeroSection />

        {/* Servicios */}
        <PageSection id="servicios-home" variant="light">
          <SectionHeader
            eyebrow="NUESTROS SERVICIOS"
            title="Soluciones logísticas para cada necesidad"
            description="Conectamos tu carga con diferentes destinos de forma segura, eficiente y confiable."
          />
          <Category />
        </PageSection>

        {/* Nosotros */}
        <section
          id="Nosotros"
          className="home-section home-section-light"
        >
          <div className="home-section-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">NOSOTROS</span>
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

        {/* Contacto */}
        <section
          id="CONTÁCTANOS"
          className="home-section home-section-light"
        >
          <div className="home-section-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">CONTÁCTANOS</span>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* Botón para volver arriba */}
        <ScrollTopButton />
      </main>
    </>
  );
}

export default HomePage;