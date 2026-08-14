import { useState } from 'react'
import { Link } from 'react-router-dom'

import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

type TrackingStep = {
  label: string
  date?: string | null
  status: 'completed' | 'current' | 'pending'
}

type TrackingHistoryItem = {
  date: string
  time: string
  title: string
  description: string
}

type TrackingData = {
  trackingNumber: string
  status: string
  lastUpdate: string
  origin: string
  destination: string
  steps: TrackingStep[]
  history: TrackingHistoryItem[]
}

function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingData, setTrackingData] =
    useState<TrackingData | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatDateTime = (value: string) => {
    const date = new Date(value)

    const datePart = new Intl.DateTimeFormat('es-CR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)

    const timePart = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)

    return `${datePart} · ${timePart}`
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const cleanTrackingNumber =
      trackingNumber.trim()

    if (!cleanTrackingNumber) {
      setError(
        'Ingresa un número de guía o referencia.'
      )

      setTrackingData(null)

      return
    }

    try {
      setLoading(true)
      setError('')
      setTrackingData(null)

      const response = await fetch(
        `http://localhost:9001/tracking/${encodeURIComponent(
          cleanTrackingNumber
        )}`
      )

      if (!response.ok) {
        throw new Error(
          'No se encontró la guía.'
        )
      }

      const data: TrackingData =
        await response.json()

      setTrackingData(data)
    } catch {
      setError(
        'No pudimos encontrar información para esta guía.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="tracking-page">
      <Link
        to="/"
        className="tracking-back-button"
      >
        <span>←</span>
        Volver al inicio
      </Link>

      <PageSection variant="light">
        <SectionHeader
          eyebrow="WEB TRACKING"
          title="Rastrea tu carga"
          description="Ingresa tu número de guía o referencia para consultar el estado actual de tu envío."
        />

        <div className="tracking-container">
          <form
            className="tracking-search"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={trackingNumber}
              onChange={(event) =>
                setTrackingNumber(
                  event.target.value
                )
              }
              placeholder="Número de guía o referencia"
              aria-label="Número de guía o referencia"
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Buscando...'
                : 'Rastrear'}
            </button>
          </form>

          {error && (
            <div className="tracking-error">
              <strong>
                No encontramos la guía
              </strong>

              <p>
                {error}
              </p>
            </div>
          )}

          {!trackingData &&
            !error &&
            !loading && (
              <div className="tracking-empty">
                <div className="tracking-empty-icon">
                  ↗
                </div>

                <h3>
                  Consulta el estado de tu envío
                </h3>

                <p>
                  Ingresa un número de guía
                  para visualizar el progreso
                  de la carga.
                </p>
              </div>
            )}

          {trackingData && (
            <div className="tracking-result">
              <div className="tracking-result-header">
                <div>
                  <span>
                    Estado actual
                  </span>

                  <h3>
                    {trackingData.status}
                  </h3>
                </div>

                <div className="tracking-summary">
                  <p>
                    <strong>
                      Guía:
                    </strong>{' '}
                    {
                      trackingData.trackingNumber
                    }
                  </p>

                  <p>
                    <strong>
                      Origen:
                    </strong>{' '}
                    {trackingData.origin}
                  </p>

                  <p>
                    <strong>
                      Destino:
                    </strong>{' '}
                    {trackingData.destination}
                  </p>
                </div>
              </div>

              <div className="tracking-progress">
                {trackingData.steps.map(
                  (step, index) => (
                    <div
                      key={step.label}
                      className={`tracking-step tracking-step-${step.status}`}
                    >
                      <div className="tracking-step-line">
                        <span className="tracking-step-dot">
                          {step.status ===
                          'completed'
                            ? '✓'
                            : index + 1}
                        </span>
                      </div>

                      <div className="tracking-step-info">
                        <strong>
                          {step.label}
                        </strong>

                        <span>
                          {step.date ??
                            'Pendiente'}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="tracking-message">
                <strong>
                  Tu envío está{' '}
                  {trackingData.status.toLowerCase()}.
                </strong>

                <span>
                  Última actualización:{' '}
                  {formatDateTime(
                    trackingData.lastUpdate
                  )}
                </span>
              </div>

              <div className="tracking-history">
                <h3>
                  Historial reciente
                </h3>

                {trackingData.history.map(
                  (item, index) => (
                    <div
                      key={`${item.date}-${item.time}-${index}`}
                      className="tracking-history-item"
                    >
                      <span>
                        {item.date}
                      </span>

                      <span>
                        {item.time}
                      </span>

                      <div>
                        <strong>
                          {item.title}
                        </strong>

                        <p>
                          {
                            item.description
                          }
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </PageSection>
    </main>
  )
}

export default TrackingPage