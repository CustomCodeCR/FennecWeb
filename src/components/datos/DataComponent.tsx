interface DataInfo {
  value: string
  label: string
}

const data: DataInfo[] = [
  {
    value: '+25',
    label: 'Oficinas a nivel mundial',
  },
  {
    value: '#1',
    label: 'Consolidados terrestre Panamá - CRC',
  },
  {
    value: '+105',
    label: 'Rutas de transporte internacional',
  },
  {
    value: '24/7',
    label: 'Atención a nuestros clientes',
  },
]

function DataComponent() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {data.map((item) => (
          <div
            key={item.label}
            className="stat-item"
          >
            <span className="stat-value">
              {item.value}
            </span>

            <p className="stat-label">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DataComponent