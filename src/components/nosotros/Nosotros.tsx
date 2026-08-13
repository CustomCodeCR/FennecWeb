import SectionData from './SectionData'

function Nosotros() {
  const imageData = {
    imageSrc: 'nosotros.png',
  }

  const sectionData = {
    titles: ['Nosotros', 'Valores'],

    contents: [
      'Castro Fallas Logística Internacional es una compañía creada hace 37 años, con el fin de satisfacer las necesidades de los diferentes eslabones de la cadena logística y los diferentes actores que en ella intervienen, a través de la gestión, coordinación y supervisión del transporte de mercancías con los diferentes medios a nivel nacional e internacional, para carga de importación y exportación.',

      'Compromiso, Ética, Trabajo en equipo, Experiencia y Calidad.',
    ],
  }

  return (
    <section id="nosotros" className="about-section">
      <SectionData
        {...imageData}
        {...sectionData}
        imageFirst={true}
      />
    </section>
  )
}

export default Nosotros