import SectionData from './SectionData'

function Nosotros() {
  const sectionData = {
    title: 'Nosotros',

    description:
      'Castro Fallas Logística Internacional es una compañía creada hace 37 años, con el fin de satisfacer las necesidades de los diferentes eslabones de la cadena logística y los diferentes actores que en ella intervienen, a través de la gestión, coordinación y supervisión del transporte de mercancías con los diferentes medios a nivel nacional e internacional, para carga de importación y exportación.',

    values: [
      'Compromiso',
      'Ética',
      'Trabajo en equipo',
      'Experiencia',
      'Calidad',
    ],
  }

  return (
    <section id="nosotros" className="about-section">
      <SectionData {...sectionData} />
    </section>
  )
}

export default Nosotros