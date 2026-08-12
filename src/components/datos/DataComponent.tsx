// Define la estructura de los datos
interface DataInfo {
  oficinas: string
  consolidados: string
  rutas: string
  atencion: string
}

// Datos destacados de la empresa
const data: DataInfo = {
  oficinas: '+25 Oficinas a nivel Mundial',
  consolidados: '#1 Consolidados terrestre Panamá - CRC',
  rutas: '+105 Rutas de Transporte Internacional',
  atencion: '24/7 Atención a nuestros clientes',
}

// Componente de datos destacados
function DataComponent() {
  return (
    <section className="w-full bg-red-500 px-4 py-5 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

        <div className="w-full md:w-1/4 py-4 md:px-5 border-b-2 md:border-b-0 md:border-r-2 border-white flex items-center justify-center">
          <p className="text-white text-center font-medium">
            {data.oficinas}
          </p>
        </div>

        <div className="w-full md:w-1/4 py-4 md:px-5 border-b-2 md:border-b-0 md:border-r-2 border-white flex items-center justify-center">
          <p className="text-white text-center font-medium">
            {data.consolidados}
          </p>
        </div>

        <div className="w-full md:w-1/4 py-4 md:px-5 border-b-2 md:border-b-0 md:border-r-2 border-white flex items-center justify-center">
          <p className="text-white text-center font-medium">
            {data.rutas}
          </p>
        </div>

        <div className="w-full md:w-1/4 py-4 md:px-5 flex items-center justify-center">
          <p className="text-white text-center font-medium">
            {data.atencion}
          </p>
        </div>

      </div>
    </section>
  )
}

export default DataComponent