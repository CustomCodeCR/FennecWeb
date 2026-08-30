import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import logoIcon from '../../assets/logo-castro-fallas.ico'
import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

import './TrackingPage.css'

type OfficeData = {
  id: string
  label: string
  active: boolean
}

type TrackingData = {
  idtra: string
  bl: string
  equipment_quantity: number
  containers: string[]
  status: string
  pol: string
  poe: string
  pod: string
  transit_days: number
  origin_office: OfficeData | null
  destination_office: OfficeData | null
}

type StepStatus =
  | 'completed'
  | 'current'
  | 'pending'

type StatusStyle =
  | 'pending'
  | 'transit'
  | 'arrived'
  | 'delivered'
  | 'default'

function TrackingPage() {
  const [trackingNumber, setTrackingNumber] =
    useState('')

  const [trackingData, setTrackingData] =
    useState<TrackingData | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const parseOffice = (
    value: unknown
  ): OfficeData | null => {
    if (
      typeof value !== 'object' ||
      value === null
    ) {
      return null
    }

    const office =
      value as Record<string, unknown>

    if (
      typeof office.id !== 'string' ||
      typeof office.label !== 'string'
    ) {
      return null
    }

    return {
      id: office.id,
      label: office.label,
      active:
        typeof office.active === 'boolean'
          ? office.active
          : true,
    }
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const cleanTrackingNumber =
      trackingNumber.trim()

    if (!cleanTrackingNumber) {
      setError(
        'Ingresa un IDTRA, BL o número de contenedor.'
      )

      setTrackingData(null)
      return
    }

    try {
      setLoading(true)
      setError('')
      setTrackingData(null)

      const response = await fetch(
        `http://127.0.0.1:8000/tracking/${encodeURIComponent(
          cleanTrackingNumber
        )}`
      )

      if (response.status === 404) {
        throw new Error(
          'No se encontró el embarque solicitado.'
        )
      }

      if (!response.ok) {
        throw new Error(
          'No fue posible consultar el tracking.'
        )
      }

      const rawData: Record<string, unknown> =
        await response.json()

      const normalizedData =
        Object.fromEntries(
          Object.entries(rawData).map(
            ([key, value]) => [
              key.trim(),
              value,
            ]
          )
        )

      const getString = (
        key: string,
        fallback: string
      ) => {
        const value =
          normalizedData[key]

        return typeof value === 'string'
          ? value.trim()
          : fallback
      }

      const getNumber = (
        key: string,
        fallback: number
      ) => {
        const value =
          normalizedData[key]

        return typeof value === 'number'
          ? value
          : fallback
      }

      const rawContainers =
        normalizedData.containers

      const containers =
        Array.isArray(rawContainers)
          ? rawContainers.map(
              (container) =>
                String(container).trim()
            )
          : []

      const originOffice =
        parseOffice(
          normalizedData.origin_office
        )

      const destinationOffice =
        parseOffice(
          normalizedData.destination_office
        )

      const data: TrackingData = {
        idtra: getString(
          'idtra',
          cleanTrackingNumber
        ),

        bl: getString(
          'bl',
          'No disponible'
        ),

        equipment_quantity:
          getNumber(
            'equipment_quantity',
            containers.length
          ),

        containers,

        status: getString(
          'status',
          'Sin información'
        ),

        pol: getString(
          'pol',
          'No disponible'
        ),

        poe: getString(
          'poe',
          'No disponible'
        ),

        pod: getString(
          'pod',
          'No disponible'
        ),

        transit_days:
          getNumber(
            'transit_days',
            0
          ),

        origin_office:
          originOffice,

        destination_office:
          destinationOffice,
      }

      setTrackingData(data)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          'No pudimos obtener información del envío.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const getCurrentStage = (
    status: string
  ) => {
    const normalizedStatus =
      status.toLowerCase()

    if (
      normalizedStatus.includes(
        'delivered'
      ) ||
      normalizedStatus.includes(
        'entregado'
      )
    ) {
      return 4
    }

    if (
      normalizedStatus.includes(
        'port of entry'
      ) ||
      normalizedStatus.includes(
        'arrival'
      ) ||
      normalizedStatus.includes(
        'arrived'
      )
    ) {
      return 3
    }

    if (
      normalizedStatus.includes(
        'transit'
      )
    ) {
      return 2
    }

    return 1
  }

  const getStepStatus = (
    step: number,
    currentStage: number
  ): StepStatus => {
    if (step < currentStage) {
      return 'completed'
    }

    if (step === currentStage) {
      return 'current'
    }

    return 'pending'
  }

  const getStatusStyle = (
    status: string
  ): StatusStyle => {
    const normalizedStatus =
      status.toLowerCase()

    if (
      normalizedStatus.includes(
        'delivered'
      ) ||
      normalizedStatus.includes(
        'entregado'
      )
    ) {
      return 'delivered'
    }

    if (
      normalizedStatus.includes(
        'arrived'
      ) ||
      normalizedStatus.includes(
        'arrival'
      ) ||
      normalizedStatus.includes(
        'port of entry'
      )
    ) {
      return 'arrived'
    }

    if (
      normalizedStatus.includes(
        'transit'
      )
    ) {
      return 'transit'
    }

    if (
      normalizedStatus.includes(
        'pending'
      ) ||
      normalizedStatus.includes(
        'departure'
      )
    ) {
      return 'pending'
    }

    return 'default'
  }

  return (
    <>
      <Helmet>
        <title>
          Web Tracking | Grupo Castro Fallas
        </title>

        <meta
          name="description"
          content="Consulta el estado y la información de tu carga mediante IDTRA, BL o número de contenedor."
        />

        <meta
          property="og:title"
          content="Web Tracking | Grupo Castro Fallas"
        />

        <meta
          property="og:description"
          content="Consulta el estado y la información de tu carga mediante IDTRA, BL o número de contenedor."
        />

        <link
          rel="icon"
          type="image/x-icon"
          href={logoIcon}
        />
      </Helmet>

      <main className="tracking-page">
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
            eyebrow="WEB TRACKING"
            title="Rastrea tu carga"
            description="Ingresa tu IDTRA, BL o número de contenedor para consultar la información actual de tu envío."
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
                placeholder="IDTRA, BL o número de contenedor"
                aria-label="IDTRA, BL o número de contenedor"
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
                  No encontramos el envío
                </strong>

                <p>{error}</p>
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
                    Ingresa un IDTRA, BL o número de contenedor.
                  </p>
                </div>
              )}

            {trackingData && (() => {
              const currentStage =
                getCurrentStage(
                  trackingData.status
                )

              const statusStyle =
                getStatusStyle(
                  trackingData.status
                )

              return (
                <div className="tracking-result">
                  <div className="tracking-result-top">
                    <div>
                      <span className="tracking-status-label">
                        Estado actual
                      </span>

                      <div
                        className={`tracking-status-badge tracking-status-${statusStyle}`}
                      >
                        <span className="tracking-status-dot" />

                        {trackingData.status}
                      </div>
                    </div>

                    <div className="tracking-transit-mini">
                      <span>
                        Días de tránsito
                      </span>

                      <strong>
                        {trackingData.transit_days}{' '}
                        días
                      </strong>
                    </div>
                  </div>

                  <div className="tracking-info-grid">
                    <div className="tracking-info-card">
                      <span className="tracking-info-icon">
                        ID
                      </span>

                      <div>
                        <small>
                          Tracking / IDTRA
                        </small>

                        <strong>
                          {trackingData.idtra}
                        </strong>
                      </div>
                    </div>

                    <div className="tracking-info-card">
                      <span className="tracking-info-icon">
                        BL
                      </span>

                      <div>
                        <small>
                          Bill of Lading
                        </small>

                        <strong>
                          {trackingData.bl}
                        </strong>
                      </div>
                    </div>

                    <div className="tracking-info-card">
                      <span className="tracking-info-icon">
                        EQ
                      </span>

                      <div>
                        <small>
                          Cantidad de equipo
                        </small>

                        <strong>
                          {trackingData.equipment_quantity}
                        </strong>
                      </div>
                    </div>

                    <div className="tracking-info-card">
                      <span className="tracking-info-icon">
                        CT
                      </span>

                      <div>
                        <small>
                          Contenedor
                        </small>

                        {trackingData.containers.length > 0 ? (
                          trackingData.containers.map(
                            (container) => (
                              <strong
                                key={container}
                                className="tracking-container-number"
                              >
                                {container}
                              </strong>
                            )
                          )
                        ) : (
                          <strong>
                            No disponible
                          </strong>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="tracking-route-section">
                    <div className="tracking-route-header">
                      <div>
                        <span>
                          Ruta del envío
                        </span>

                        <h3>
                          {trackingData.pol}
                          {' → '}
                          {trackingData.pod}
                        </h3>
                      </div>

                      <strong
                        className={`tracking-route-status tracking-route-status-${statusStyle}`}
                      >
                        {trackingData.status}
                      </strong>
                    </div>

                    <div className="tracking-progress">
                      <div
                        className={`tracking-step tracking-step-${getStepStatus(
                          1,
                          currentStage
                        )}`}
                      >
                        <div className="tracking-step-line">
                          <span className="tracking-step-dot">
                            {currentStage > 1
                              ? '✓'
                              : '1'}
                          </span>
                        </div>

                        <div className="tracking-step-info">
                          <strong>POL</strong>

                          <span>
                            {trackingData.pol}
                          </span>

                          <small>
                            Puerto de Origen
                          </small>
                        </div>
                      </div>

                      <div
                        className={`tracking-step tracking-step-${getStepStatus(
                          2,
                          currentStage
                        )}`}
                      >
                        <div className="tracking-step-line">
                          <span className="tracking-step-dot">
                            {currentStage > 2
                              ? '✓'
                              : '2'}
                          </span>
                        </div>

                        <div className="tracking-step-info">
                          <strong>
                            En tránsito
                          </strong>

                          <span>
                            Transporte
                          </span>

                          <small>
                            Movimiento de carga
                          </small>
                        </div>
                      </div>

                      <div
                        className={`tracking-step tracking-step-${getStepStatus(
                          3,
                          currentStage
                        )}`}
                      >
                        <div className="tracking-step-line">
                          <span className="tracking-step-dot">
                            {currentStage > 3
                              ? '✓'
                              : '3'}
                          </span>
                        </div>

                        <div className="tracking-step-info">
                          <strong>POE</strong>

                          <span>
                            {trackingData.poe}
                          </span>

                          <small>
                            Puerto de Entrada
                          </small>
                        </div>
                      </div>

                      <div
                        className={`tracking-step tracking-step-${getStepStatus(
                          4,
                          currentStage
                        )}`}
                      >
                        <div className="tracking-step-line">
                          <span className="tracking-step-dot">
                            4
                          </span>
                        </div>

                        <div className="tracking-step-info">
                          <strong>POD</strong>

                          <span>
                            {trackingData.pod}
                          </span>

                          <small>
                            Puerto de Destino
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tracking-details">
                    <h3>
                      Detalles del envío
                    </h3>

                    <div className="tracking-details-grid">
                      <div>
                        <span>IDTRA</span>

                        <strong>
                          {trackingData.idtra}
                        </strong>
                      </div>

                      <div>
                        <span>BL</span>

                        <strong>
                          {trackingData.bl}
                        </strong>
                      </div>

                      <div>
                        <span>Status</span>

                        <strong>
                          {trackingData.status}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Cantidad de equipo
                        </span>

                        <strong>
                          {trackingData.equipment_quantity}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Oficina de origen
                        </span>

                        <strong>
                          {trackingData.origin_office?.label ??
                            'No disponible'}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Oficina de destino
                        </span>

                        <strong>
                          {trackingData.destination_office?.label ??
                            'No disponible'}
                        </strong>
                      </div>

                      <div>
                        <span>POL</span>

                        <strong>
                          {trackingData.pol}
                        </strong>
                      </div>

                      <div>
                        <span>POE</span>

                        <strong>
                          {trackingData.poe}
                        </strong>
                      </div>

                      <div>
                        <span>POD</span>

                        <strong>
                          {trackingData.pod}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Días de tránsito
                        </span>

                        <strong>
                          {trackingData.transit_days}{' '}
                          días
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </PageSection>
      </main>
    </>
  )
}

export default TrackingPage