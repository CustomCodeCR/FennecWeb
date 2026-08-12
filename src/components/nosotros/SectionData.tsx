// Define los datos que recibe el componente
interface SectionDataProps {
  titles: string[]
  contents: string[]
  imageFirst: boolean
}

// Componente reutilizable para mostrar información
function SectionData({
  titles,
  contents,
  imageFirst,
}: SectionDataProps) {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-8 ${
        imageFirst ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Video de la sección Nosotros */}
      <div className="w-full lg:w-1/2">
        <video
          className="w-full rounded-2xl object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      {/* Información de Nosotros y Valores */}
      <div className="w-full lg:w-1/2 p-4">
        {titles.map((title, index) => (
          <div key={title} className="mb-6">
            <h2 className="text-black text-2xl font-bold text-center mb-3">
              {title}
            </h2>

            {index < titles.length - 1 && (
              <hr className="mb-4 border-gray-300" />
            )}

            <p className="text-left text-gray-700 text-lg leading-7">
              {contents[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionData