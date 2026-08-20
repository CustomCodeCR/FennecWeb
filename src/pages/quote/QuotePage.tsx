import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import logoIcon from '../../assets/logo-castro-fallas.ico'
import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

type ServiceType =
  | 'Transporte aéreo'
  | 'Transporte marítimo'
  | 'Transporte terrestre'

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

function QuotePage() {
  const [service, setService] =
    useState<ServiceType | null>(null)

  const [origin, setOrigin] =
    useState('')

  const [destination, setDestination] =
    useState('')

  const [cargoType, setCargoType] =
    useState('')

  const [weight, setWeight] =
    useState('')

  const [length, setLength] =
    useState('')

  const [width, setWidth] =
    useState('')

  const [height, setHeight] =
    useState('')

  const [pieces, setPieces] =
    useState('')

  const [
    dimensionsComplete,
    setDimensionsComplete,
  ] = useState(false)

  const [
    additionalInfo,
    setAdditionalInfo,
  ] = useState('')

  const [
    reviewReady,
    setReviewReady,
  ] = useState(false)

  const availableDestinations =
    offices.filter(
      (office) =>
        office.label !== origin
    )

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

  const emailSubject =
    service
      ? `Solicitud de cotización - ${service}`
      : 'Solicitud de cotización'

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
    `&to=${encodeURIComponent(
      'pricing@grupocastrofallas.com'
    )}` +
    `&su=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`

  return (
    <>
      <Helmet>
        <title>
          Cotización | Grupo Castro Fallas
        </title>

        <meta
          name="description"
          content="Cotiza tu carga de transporte aéreo, marítimo o terrestre en pocos pasos."
        />

        <link
          rel="icon"
          type="image/x-icon"
          href={logoIcon}
        />

        <meta
          property="og:title"
          content="Cotización | Grupo Castro Fallas"
        />

        <meta
          property="og:description"
          content="Cotiza tu carga de transporte aéreo, marítimo o terrestre en pocos pasos."
        />
      </Helmet>

      <main className="quote-page">
        <Link
          to="/"
          className="tracking-back-button"
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

          <div className="quote-assistant">
            {!service && (
              <div className="quote-welcome">
                <span className="quote-step">
                  PASO 1
                </span>

                <h2>
                  ¿Qué servicio necesitas?
                </h2>

                <p>
                  Selecciona el tipo de transporte que necesitas para tu carga.
                </p>

                <div className="quote-options">
                  <button
                    type="button"
                    onClick={() =>
                      setService(
                        'Transporte aéreo'
                      )
                    }
                  >
                    <span className="quote-option-icon">
                      ✈️
                    </span>

                    <strong>
                      Transporte aéreo
                    </strong>

                    <span>
                      Para envíos rápidos y cargas urgentes.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setService(
                        'Transporte marítimo'
                      )
                    }
                  >
                    <span className="quote-option-icon">
                      🚢
                    </span>

                    <strong>
                      Transporte marítimo
                    </strong>

                    <span>
                      Para cargas internacionales de mayor volumen.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setService(
                        'Transporte terrestre'
                      )
                    }
                  >
                    <span className="quote-option-icon">
                      🚚
                    </span>

                    <strong>
                      Transporte terrestre
                    </strong>

                    <span>
                      Para transporte regional por carretera.
                    </span>
                  </button>
                </div>
              </div>
            )}

            {service && !origin && (
              <div className="quote-welcome">
                <span className="quote-step">
                  PASO 2
                </span>

                <div className="quote-selected-service">
                  Servicio seleccionado:
                  <strong>
                    {service}
                  </strong>
                </div>

                <h2>
                  ¿Dónde se encuentra tu carga?
                </h2>

                <p>
                  Selecciona la oficina o país de origen.
                </p>

                <div className="quote-field">
                  <label htmlFor="quote-origin">
                    Origen
                  </label>

                  <select
                    id="quote-origin"
                    value={origin}
                    onChange={(event) => {
                      setOrigin(
                        event.target.value
                      )
                      setDestination('')
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    <option value="">
                      Selecciona una oficina
                    </option>

                    {offices.map(
                      (office) => (
                        <option
                          key={office.id}
                          value={
                            office.label
                          }
                        >
                          {
                            office.label
                          }
                        </option>
                      )
                    )}

                    <option value="Otro">
                      Otro origen
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  className="quote-change-button"
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
            )}

            {service &&
              origin &&
              !destination && (
                <div className="quote-welcome">
                  <span className="quote-step">
                    PASO 3
                  </span>

                  <div className="quote-selected-service">
                    <span>
                      {service}
                    </span>

                    <strong>
                      {origin}
                    </strong>
                  </div>

                  <h2>
                    ¿Cuál es el destino de la carga?
                  </h2>

                  <p>
                    Selecciona la oficina o país de destino.
                  </p>

                  <div className="quote-field">
                    <label htmlFor="quote-destination">
                      Destino
                    </label>

                    <select
                      id="quote-destination"
                      value={destination}
                      onChange={(event) => {
                        setDestination(
                          event.target.value
                        )
                        setCargoType('')
                        resetDimensions()
                      }}
                    >
                      <option value="">
                        Selecciona un destino
                      </option>

                      {availableDestinations.map(
                        (office) => (
                          <option
                            key={office.id}
                            value={
                              office.label
                            }
                          >
                            {
                              office.label
                            }
                          </option>
                        )
                      )}

                      {origin !==
                        'Otro' && (
                        <option value="Otro">
                          Otro destino
                        </option>
                      )}
                    </select>
                  </div>

                  <button
                    type="button"
                    className="quote-change-button"
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
              )}

            {service &&
              origin &&
              destination &&
              !cargoType && (
                <div className="quote-welcome">
                  <span className="quote-step">
                    PASO 4
                  </span>

                  <div className="quote-selected-service quote-selection-summary">
                    <span>
                      {service}
                    </span>

                    <strong>
                      {origin}
                      {' → '}
                      {destination}
                    </strong>
                  </div>

                  <h2>
                    ¿Qué tipo de carga deseas transportar?
                  </h2>

                  <p>
                    Selecciona la categoría que mejor describe tu carga.
                  </p>

                  <div className="quote-options quote-cargo-options">
                    <button
                      type="button"
                      onClick={() =>
                        setCargoType(
                          'Carga general'
                        )
                      }
                    >
                      <span className="quote-option-icon">
                        📦
                      </span>

                      <strong>
                        Carga general
                      </strong>

                      <span>
                        Mercancía, cajas, paquetes y productos generales.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCargoType(
                          'Vehículo'
                        )
                      }
                    >
                      <span className="quote-option-icon">
                        🚗
                      </span>

                      <strong>
                        Vehículo
                      </strong>

                      <span>
                        Automóviles, motocicletas y otros vehículos.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCargoType(
                          'Maquinaria'
                        )
                      }
                    >
                      <span className="quote-option-icon">
                        🏗️
                      </span>

                      <strong>
                        Maquinaria
                      </strong>

                      <span>
                        Equipos industriales y maquinaria pesada.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCargoType(
                          'Carga refrigerada'
                        )
                      }
                    >
                      <span className="quote-option-icon">
                        ❄️
                      </span>

                      <strong>
                        Carga refrigerada
                      </strong>

                      <span>
                        Productos que requieren control de temperatura.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCargoType(
                          'Carga peligrosa'
                        )
                      }
                    >
                      <span className="quote-option-icon">
                        ⚠️
                      </span>

                      <strong>
                        Carga peligrosa
                      </strong>

                      <span>
                        Materiales que requieren manejo especializado.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCargoType(
                          'Otra'
                        )
                      }
                    >
                      <span className="quote-option-icon">
                        +
                      </span>

                      <strong>
                        Otra
                      </strong>

                      <span>
                        Si tu carga no encaja en las categorías anteriores.
                      </span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="quote-change-button"
                    onClick={() => {
                      setDestination('')
                      setCargoType('')
                      resetDimensions()
                    }}
                  >
                    ← Cambiar destino
                  </button>
                </div>
              )}

            {service &&
              origin &&
              destination &&
              cargoType &&
              !dimensionsComplete && (
                <div className="quote-welcome">
                  <span className="quote-step">
                    PASO 5
                  </span>

                  <div className="quote-selected-service quote-selection-summary">
                    <span>
                      {service}
                    </span>

                    <strong>
                      {origin}
                      {' → '}
                      {destination}
                    </strong>

                    <span>
                      {cargoType}
                    </span>
                  </div>

                  <h2>
                    Cuéntanos las dimensiones de tu carga
                  </h2>

                  <p>
                    Ingresa la información aproximada. Nuestro equipo de Pricing podrá confirmar los datos posteriormente.
                  </p>

                  <div className="quote-dimensions-form">
                    <div className="quote-input-group">
                      <label htmlFor="quote-weight">
                        Peso total
                      </label>

                      <div className="quote-input-with-unit">
                        <input
                          id="quote-weight"
                          type="number"
                          min="0"
                          step="0.01"
                          value={weight}
                          onChange={(
                            event
                          ) =>
                            setWeight(
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Ej. 250"
                        />

                        <span>
                          kg
                        </span>
                      </div>
                    </div>

                    <div className="quote-input-group">
                      <label htmlFor="quote-pieces">
                        Cantidad de piezas
                      </label>

                      <input
                        id="quote-pieces"
                        type="number"
                        min="1"
                        step="1"
                        value={pieces}
                        onChange={(
                          event
                        ) =>
                          setPieces(
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="Ej. 4"
                      />
                    </div>

                    <div className="quote-input-group">
                      <label htmlFor="quote-length">
                        Largo
                      </label>

                      <div className="quote-input-with-unit">
                        <input
                          id="quote-length"
                          type="number"
                          min="0"
                          step="0.01"
                          value={length}
                          onChange={(
                            event
                          ) =>
                            setLength(
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Ej. 120"
                        />

                        <span>
                          cm
                        </span>
                      </div>
                    </div>

                    <div className="quote-input-group">
                      <label htmlFor="quote-width">
                        Ancho
                      </label>

                      <div className="quote-input-with-unit">
                        <input
                          id="quote-width"
                          type="number"
                          min="0"
                          step="0.01"
                          value={width}
                          onChange={(
                            event
                          ) =>
                            setWidth(
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Ej. 80"
                        />

                        <span>
                          cm
                        </span>
                      </div>
                    </div>

                    <div className="quote-input-group">
                      <label htmlFor="quote-height">
                        Alto
                      </label>

                      <div className="quote-input-with-unit">
                        <input
                          id="quote-height"
                          type="number"
                          min="0"
                          step="0.01"
                          value={height}
                          onChange={(
                            event
                          ) =>
                            setHeight(
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Ej. 90"
                        />

                        <span>
                          cm
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="quote-step-actions">
                    <button
                      type="button"
                      className="quote-change-button"
                      onClick={() => {
                        setCargoType('')
                        resetDimensions()
                      }}
                    >
                      ← Cambiar tipo de carga
                    </button>

                    <button
                      type="button"
                      className="quote-next-button"
                      disabled={
                        !weight ||
                        !length ||
                        !width ||
                        !height ||
                        !pieces
                      }
                      onClick={() =>
                        setDimensionsComplete(
                          true
                        )
                      }
                    >
                      Continuar →
                    </button>
                  </div>
                </div>
              )}

            {service &&
              origin &&
              destination &&
              cargoType &&
              dimensionsComplete &&
              !reviewReady && (
                <div className="quote-welcome">
                  <span className="quote-step">
                    PASO 6
                  </span>

                  <div className="quote-selected-service quote-selection-summary">
                    <span>
                      {cargoType}
                    </span>

                    <strong>
                      {weight} kg
                    </strong>

                    <span>
                      {length} ×{' '}
                      {width} ×{' '}
                      {height} cm
                    </span>

                    <span>
                      {pieces} piezas
                    </span>
                  </div>

                  <h2>
                    ¿Hay algo más que debamos saber?
                  </h2>

                  <p>
                    Agrega cualquier detalle especial que pueda ayudar a nuestro equipo de Pricing a preparar tu cotización.
                  </p>

                  <div className="quote-input-group quote-additional-info">
                    <label htmlFor="quote-additional-info">
                      Información adicional
                    </label>

                    <textarea
                      id="quote-additional-info"
                      value={
                        additionalInfo
                      }
                      onChange={(
                        event
                      ) =>
                        setAdditionalInfo(
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Ej. La carga estará disponible el lunes, requiere manejo especial, contiene 4 cajas..."
                      rows={6}
                    />
                  </div>

                  <div className="quote-step-actions">
                    <button
                      type="button"
                      className="quote-change-button"
                      onClick={() =>
                        setDimensionsComplete(
                          false
                        )
                      }
                    >
                      ← Cambiar dimensiones
                    </button>

                    <button
                      type="button"
                      className="quote-next-button"
                      onClick={() =>
                        setReviewReady(
                          true
                        )
                      }
                    >
                      Revisar solicitud →
                    </button>
                  </div>
                </div>
              )}

            {service &&
              origin &&
              destination &&
              cargoType &&
              dimensionsComplete &&
              reviewReady && (
                <div className="quote-welcome">
                  <span className="quote-step">
                    PASO 7
                  </span>

                  <h2>
                    Revisa tu solicitud
                  </h2>

                  <p>
                    Verifica la información antes de preparar el correo para nuestro equipo de Pricing.
                  </p>

                  <div className="quote-review">
                    <div className="quote-review-row">
                      <span>
                        Servicio
                      </span>

                      <strong>
                        {service}
                      </strong>
                    </div>

                    <div className="quote-review-row">
                      <span>
                        Origen
                      </span>

                      <strong>
                        {origin}
                      </strong>
                    </div>

                    <div className="quote-review-row">
                      <span>
                        Destino
                      </span>

                      <strong>
                        {
                          destination
                        }
                      </strong>
                    </div>

                    <div className="quote-review-row">
                      <span>
                        Tipo de carga
                      </span>

                      <strong>
                        {cargoType}
                      </strong>
                    </div>

                    <div className="quote-review-row">
                      <span>
                        Peso total
                      </span>

                      <strong>
                        {weight} kg
                      </strong>
                    </div>

                    <div className="quote-review-row">
                      <span>
                        Dimensiones
                      </span>

                      <strong>
                        {length} ×{' '}
                        {width} ×{' '}
                        {height} cm
                      </strong>
                    </div>

                    <div className="quote-review-row">
                      <span>
                        Cantidad
                      </span>

                      <strong>
                        {pieces} piezas
                      </strong>
                    </div>

                    <div className="quote-review-row quote-review-notes">
                      <span>
                        Información adicional
                      </span>

                      <strong>
                        {
                          additionalInfo.trim()
                            ? additionalInfo
                            : 'Sin información adicional'
                        }
                      </strong>
                    </div>
                  </div>

                  <div className="quote-step-actions">
                    <button
                      type="button"
                      className="quote-change-button"
                      onClick={() =>
                        setReviewReady(
                          false
                        )
                      }
                    >
                      ← Editar información
                    </button>

                    <div className="quote-email-options">
                      <a
                        className="quote-email-button"
                        href={
                          pricingGmail
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ✉ Abrir Gmail
                      </a>

                      <a
                        className="quote-email-button quote-email-secondary"
                        href={
                          pricingMailto
                        }
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