// Sección principal del Home
function HeroSection() {
  return (
    <section>
      {/* Video principal */}
      <video className="h-full" autoPlay loop muted playsInline>
        <source src="/video.mp4" type="video/mp4" />

        Tu navegador no soporta el elemento de video.
      </video>
    </section>
  )
}

// Exporta el componente
export default HeroSection