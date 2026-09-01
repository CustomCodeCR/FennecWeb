import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import logoIcon from '../../assets/logo-castro-fallas.ico'
import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

type ServiceType = 'Transporte aéreo' | 'Transporte marítimo' | 'Transporte terrestre'

type Office = {
  id: string
  label: string
}

const offices: Office[] = [
  { id: 'cr-curridabat', label: 'Costa Rica - Curridabat' },
  { id: 'cr-calle-blancos', label: 'Costa Rica - Calle Blancos' },
  { id: 'nicaragua', label: 'Nicaragua' },
  { id: 'usa', label: 'Estados Unidos' },
  { id: 'peru', label: 'Perú' },
  { id: 'china', label: 'China' },
  { id: 'brasil', label: 'Brasil' },
  { id: 'mexico', label: 'México' },
  { id: 'guatemala', label: 'Guatemala' },
  { id: 'panama', label: 'Panamá' },
  { id: 'japon', label: 'Japón' },
  { id: 'salvador', label: 'El Salvador' },
  { id: 'india', label: 'India' },
  { id: 'alemania', label: 'Alemania' },
  { id: 'colombia', label: 'Colombia' },
  { id: 'espana', label: 'España' },
  { id: 'holanda', label: 'Holanda' },
  { id: 'honduras', label: 'Honduras' },
  { id: 'francia', label: 'Francia' },
  { id: 'indonesia', label: 'Indonesia' },
  { id: 'taiwan', label: 'Taiwán' },
  { id: 'tailandia', label: 'Tailandia' },
  { id: 'sudafrica', label: 'Sudáfrica' },
  { id: 'paraguay', label: 'Paraguay' },
  { id: 'argentina', label: 'Argentina' },
  { id: 'chile', label: 'Chile' },
  { id: 'canada', label: 'Canadá' },
  { id: 'italia', label: 'Italia' },
  { id: 'ecuador', label: 'Ecuador' },
  { id: 'korea', label: 'Corea' },
]

const serviceOptions: Array<{ value: ServiceType; icon: string; description: string }> = [
  { value: 'Transporte aéreo', icon: '✈️', description: 'Para envíos rápidos y cargas urgentes.' },
  { value: 'Transporte marítimo', icon: '🚢', description: 'Para cargas internacionales de mayor volumen.' },
  { value: 'Transporte terrestre', icon: '🚚', description: 'Para transporte regional por carretera.' },
]

const cargoOptions = [
  { value: 'Carga general', icon: '📦', description: 'Mercancía, cajas, paquetes y productos generales.' },
  { value: 'Vehículo', icon: '🚗', description: 'Automóviles, motocicletas y otros vehículos.' },
  { value: 'Maquinaria', icon: '🏗️', description: 'Equipos industriales y maquinaria pesada.' },
  { value: 'Carga refrigerada', icon: '❄️', description: 'Productos que requieren control de temperatura.' },
  { value: 'Carga peligrosa', icon: '⚠️', description: 'Materiales que requieren manejo especializado.' },
  { value: 'Otra', icon: '+', description: 'Si tu carga no encaja en las categorías anteriores.' },
]

const cardClass = 'rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(0,0,0,0.06)] sm:p-10'
const stepClass = 'mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.16em] text-[#c8171d]'
const titleClass = 'm-0 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'
const introClass = 'mb-8 mt-2 text-base leading-7 text-slate-500'
const selectedClass = 'mb-5 inline-flex flex-wrap items-center gap-2 rounded-xl border border-[#c8171d]/15 bg-red-50 px-3 py-2 text-sm text-slate-500 [&_strong]:text-[#c8171d]'
const labelClass = 'mb-2 block text-sm font-bold text-slate-700'
const controlClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#c8171d] focus:ring-4 focus:ring-[#c8171d]/10'
const changeClass = 'rounded-xl border border-[#c8171d]/25 bg-transparent px-4 py-2.5 text-sm font-bold text-[#c8171d] transition hover:bg-red-50'
const nextClass = 'rounded-xl bg-[#c8171d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a91017] disabled:cursor-not-allowed disabled:opacity-[0.45]'
const actionRowClass = 'mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'

function QuotePage() {
  const [service, setService] = useState<ServiceType | null>(null)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [cargoType, setCargoType] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [pieces, setPieces] = useState('')
  const [dimensionsComplete, setDimensionsComplete] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [reviewReady, setReviewReady] = useState(false)

  const availableDestinations = offices.filter((office) => office.label !== origin)

  const resetDimensions = () => {
    setWeight('')
    setLength('')
    setWidth('')
    setHeight('')
    setPieces('')
    setDimensionsComplete(false)
    setAdditionalInfo('')
    setReviewReady(false)
  }

  const emailSubject = service ? `Solicitud de cotización - ${service}` : 'Solicitud de cotización'

  const emailBody = `Hola equipo de Pricing,

Deseo solicitar una cotización con la siguiente información:

Servicio: ${service ?? ''}
Origen: ${origin}
Destino: ${destination}
Tipo de carga: ${cargoType}
Peso total: ${weight} kg
Dimensiones: ${length} x ${width} x ${height} cm
Cantidad de piezas: ${pieces}

Información adicional:
${additionalInfo.trim() || 'Sin información adicional'}

Quedo atento a la cotización.

Gracias.`

  const pricingMailto =
    `mailto:pricing@grupocastrofallas.com` +
    `?subject=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`

  const pricingGmail =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent('pricing@grupocastrofallas.com')}` +
    `&su=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`

  const OptionGrid = ({
    options,
    onSelect,
    cargo = false,
  }: {
    options: Array<{ value: string; icon: string; description: string }>
    onSelect: (value: string) => void
    cargo?: boolean
  }) => (
    <div className={`grid gap-4 ${cargo ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className="group flex min-h-[150px] flex-col items-start justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#c8171d] hover:bg-red-50/30 hover:shadow-[0_12px_30px_rgba(200,23,29,0.1)]"
        >
          <span className="text-3xl">{option.icon}</span>
          <strong className="text-base font-bold text-slate-900">{option.value}</strong>
          <span className="text-sm leading-6 text-slate-500">{option.description}</span>
        </button>
      ))}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Cotización | Grupo Castro Fallas</title>
        <meta name="description" content="Cotiza tu carga de transporte aéreo, marítimo o terrestre en pocos pasos." />
        <link rel="icon" type="image/x-icon" href={logoIcon} />
        <meta property="og:title" content="Cotización | Grupo Castro Fallas" />
        <meta property="og:description" content="Cotiza tu carga de transporte aéreo, marítimo o terrestre en pocos pasos." />
      </Helmet>

      <main className="min-h-screen bg-white">
        <Link
          to="/"
          className="fixed left-4 top-[85px] z-[1000] inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-xl font-bold text-[#c8171d] shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#c8171d]/35 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:left-7 md:top-[95px]"
          aria-label="Volver al inicio"
          title="Volver al inicio"
        >
          ←
        </Link>

        <PageSection variant="light">
          <SectionHeader
            eyebrow="COTIZACIÓN"
            title="Cotiza tu carga"
            description="Nuestro asistente te ayudará a preparar la información necesaria para solicitar una cotización."
          />

          <div className="mx-auto my-12 w-full max-w-5xl">
            {!service && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 1</span>
                <h2 className={titleClass}>¿Qué servicio necesitas?</h2>
                <p className={introClass}>Selecciona el tipo de transporte que necesitas para tu carga.</p>
                <OptionGrid
                  options={serviceOptions}
                  onSelect={(value) => setService(value as ServiceType)}
                />
              </div>
            )}

            {service && !origin && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 2</span>
                <div className={selectedClass}>Servicio seleccionado: <strong>{service}</strong></div>
                <h2 className={titleClass}>¿Dónde se encuentra tu carga?</h2>
                <p className={introClass}>Selecciona la oficina o país de origen.</p>

                <div className="mt-7">
                  <label className={labelClass} htmlFor="quote-origin">Origen</label>
                  <select
                    id="quote-origin"
                    className={controlClass}
                    value={origin}
                    onChange={(event) => {
                      setOrigin(event.target.value)
                      setDestination('')
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    <option value="">Selecciona una oficina</option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.label}>{office.label}</option>
                    ))}
                    <option value="Otro">Otro origen</option>
                  </select>
                </div>

                <div className={actionRowClass}>
                  <button
                    type="button"
                    className={changeClass}
                    onClick={() => {
                      setService(null)
                      setOrigin('')
                      setDestination('')
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    ← Cambiar servicio
                  </button>
                </div>
              </div>
            )}

            {service && origin && !destination && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 3</span>
                <div className={selectedClass}><span>{service}</span><strong>{origin}</strong></div>
                <h2 className={titleClass}>¿Cuál es el destino de la carga?</h2>
                <p className={introClass}>Selecciona la oficina o país de destino.</p>

                <div className="mt-7">
                  <label className={labelClass} htmlFor="quote-destination">Destino</label>
                  <select
                    id="quote-destination"
                    className={controlClass}
                    value={destination}
                    onChange={(event) => {
                      setDestination(event.target.value)
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    <option value="">Selecciona un destino</option>
                    {availableDestinations.map((office) => (
                      <option key={office.id} value={office.label}>{office.label}</option>
                    ))}
                    {origin !== 'Otro' && <option value="Otro">Otro destino</option>}
                  </select>
                </div>

                <div className={actionRowClass}>
                  <button
                    type="button"
                    className={changeClass}
                    onClick={() => {
                      setOrigin('')
                      setDestination('')
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    ← Cambiar origen
                  </button>
                </div>
              </div>
            )}

            {service && origin && destination && !cargoType && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 4</span>
                <div className={selectedClass}><span>{service}</span><strong>{origin} → {destination}</strong></div>
                <h2 className={titleClass}>¿Qué tipo de carga deseas transportar?</h2>
                <p className={introClass}>Selecciona la categoría que mejor describe tu carga.</p>
                <OptionGrid options={cargoOptions} onSelect={setCargoType} cargo />

                <div className={actionRowClass}>
                  <button
                    type="button"
                    className={changeClass}
                    onClick={() => {
                      setDestination('')
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    ← Cambiar destino
                  </button>
                </div>
              </div>
            )}

            {service && origin && destination && cargoType && !dimensionsComplete && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 5</span>
                <div className={selectedClass}><span>{service}</span><strong>{origin} → {destination}</strong><span>{cargoType}</span></div>
                <h2 className={titleClass}>Cuéntanos las dimensiones de tu carga</h2>
                <p className={introClass}>Ingresa la información aproximada. Nuestro equipo de Pricing podrá confirmar los datos posteriormente.</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="quote-weight">Peso total</label>
                    <div className="relative">
                      <input id="quote-weight" className={`${controlClass} pr-14`} type="number" min="0" step="0.01" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="Ej. 250" />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">kg</span>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="quote-pieces">Cantidad de piezas</label>
                    <input id="quote-pieces" className={controlClass} type="number" min="1" step="1" value={pieces} onChange={(event) => setPieces(event.target.value)} placeholder="Ej. 4" />
                  </div>

                  {[
                    ['quote-length', 'Largo', length, setLength],
                    ['quote-width', 'Ancho', width, setWidth],
                    ['quote-height', 'Alto', height, setHeight],
                  ].map(([id, label, value, setter]) => (
                    <div key={String(id)}>
                      <label className={labelClass} htmlFor={String(id)}>{String(label)}</label>
                      <div className="relative">
                        <input
                          id={String(id)}
                          className={`${controlClass} pr-14`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={String(value)}
                          onChange={(event) => (setter as React.Dispatch<React.SetStateAction<string>>)(event.target.value)}
                          placeholder="Ej. 120"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">cm</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={actionRowClass}>
                  <button type="button" className={changeClass} onClick={() => { setCargoType(''); resetDimensions() }}>← Cambiar tipo de carga</button>
                  <button
                    type="button"
                    className={nextClass}
                    disabled={!weight || !length || !width || !height || !pieces}
                    onClick={() => setDimensionsComplete(true)}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {service && origin && destination && cargoType && dimensionsComplete && !reviewReady && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 6</span>
                <div className={selectedClass}><span>{cargoType}</span><strong>{weight} kg</strong><span>{length} × {width} × {height} cm</span><span>{pieces} piezas</span></div>
                <h2 className={titleClass}>¿Hay algo más que debamos saber?</h2>
                <p className={introClass}>Agrega cualquier detalle especial que pueda ayudar a nuestro equipo de Pricing a preparar tu cotización.</p>

                <div className="mt-7">
                  <label className={labelClass} htmlFor="quote-additional-info">Información adicional</label>
                  <textarea
                    id="quote-additional-info"
                    className={`${controlClass} min-h-[150px] resize-y leading-6`}
                    value={additionalInfo}
                    onChange={(event) => setAdditionalInfo(event.target.value)}
                    placeholder="Ej. La carga estará disponible el lunes, requiere manejo especial, contiene 4 cajas..."
                    rows={6}
                  />
                </div>

                <div className={actionRowClass}>
                  <button type="button" className={changeClass} onClick={() => setDimensionsComplete(false)}>← Cambiar dimensiones</button>
                  <button type="button" className={nextClass} onClick={() => setReviewReady(true)}>Revisar solicitud →</button>
                </div>
              </div>
            )}

            {service && origin && destination && cargoType && dimensionsComplete && reviewReady && (
              <div className={cardClass}>
                <span className={stepClass}>PASO 7</span>
                <h2 className={titleClass}>Revisa tu solicitud</h2>
                <p className={introClass}>Verifica la información antes de preparar el correo para nuestro equipo de Pricing.</p>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {[
                    ['Servicio', service],
                    ['Origen', origin],
                    ['Destino', destination],
                    ['Tipo de carga', cargoType],
                    ['Peso total', `${weight} kg`],
                    ['Dimensiones', `${length} × ${width} × ${height} cm`],
                    ['Cantidad', `${pieces} piezas`],
                    ['Información adicional', additionalInfo.trim() ? additionalInfo : 'Sin información adicional'],
                  ].map(([label, value]) => (
                    <div key={label} className="grid gap-1 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-5">
                      <span className="text-xs font-bold text-slate-400 sm:text-sm">{label}</span>
                      <strong className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-900">{value}</strong>
                    </div>
                  ))}
                </div>

                <div className={actionRowClass}>
                  <button type="button" className={changeClass} onClick={() => setReviewReady(false)}>← Editar información</button>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                    <a
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8171d] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(200,23,29,0.18)] transition hover:-translate-y-0.5 hover:bg-[#a91017]"
                      href={pricingGmail}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ✉ Abrir Gmail
                    </a>
                    <a
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#c8171d]/35 bg-white px-6 py-3 text-sm font-bold text-[#c8171d] transition hover:bg-red-50 hover:text-[#a91017]"
                      href={pricingMailto}
                    >
                      📧 Abrir aplicación de correo
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PageSection>
      </main>
    </>
  )
}

export default QuotePage
