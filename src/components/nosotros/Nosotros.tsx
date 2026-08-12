import SectionData from './SectionData'

// Títulos de la sección
const titles: string[] = [
  'Nosotros',
  'Valores',
]

// Información de la empresa
const contents: string[] = [
  'Castro Fallas Logistica Internacional es una compañía creada hace 37 años, con el fin de satisfacer las necesidades de los diferentes eslabones de la cadena logística y los diferentes actores que en ella intervienen, a través de la gestión, coordinación y supervisión del transporte de mercancías con los diferentes medios a nivel nacional e internacional, para carga de importación y exportación.',
  'Compromiso, Ética, Trabajo en equipo, Experiencia, Calidad',
]

// Componente Nosotros
function Nosotros() {
  return (
    <section
      id="nosotros"
      className="w-full bg-white py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <SectionData
          titles={titles}
          contents={contents}
          imageFirst={true}
        />
      </div>
    </section>
  )
}

export default Nosotros