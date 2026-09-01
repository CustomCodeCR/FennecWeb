import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import logoIcon from '../../assets/logo-castro-fallas.ico'
import PageSection from '../../ui/PageSection'
import SectionHeader from '../../ui/SectionHeader'

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

type StepStatus = 'completed' | 'current' | 'pending'
type StatusStyle = 'pending' | 'transit' | 'arrived' | 'delivered' | 'default'

const statusClasses: Record<StatusStyle, string> = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  transit: 'border-blue-200 bg-blue-50 text-blue-700',
  arrived: 'border-violet-200 bg-violet-50 text-violet-700',
  delivered: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  default: 'border-slate-200 bg-slate-50 text-slate-700',
}

const statusDotClasses: Record<StatusStyle, string> = {
  pending: 'bg-amber-500',
  transit: 'bg-blue-500',
  arrived: 'bg-violet-500',
  delivered: 'bg-emerald-500',
  default: 'bg-slate-500',
}

const stepClasses: Record<StepStatus, string> = {
  completed: 'border-[#c8171d] bg-[#c8171d] text-white',
  current: 'border-[#c8171d] bg-white text-[#c8171d] ring-4 ring-[#c8171d]/10',
  pending: 'border-slate-200 bg-white text-slate-400',
}

function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parseOffice = (value: unknown): OfficeData | null => {
    if (typeof value !== 'object' || value === null) return null

    const office = value as Record<string, unknown>
    if (typeof office.id !== 'string' || typeof office.label !== 'string') return null

    return {
      id: office.id,
      label: office.label,
      active: typeof office.active === 'boolean' ? office.active : true,
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanTrackingNumber = trackingNumber.trim()
    if (!cleanTrackingNumber) {
      setError('Ingresa un IDTRA, BL o número de contenedor.')
      setTrackingData(null)
      return
    }

    try {
      setLoading(true)
      setError('')
      setTrackingData(null)

      const response = await fetch(
        `http://127.0.0.1:8000/tracking/${encodeURIComponent(cleanTrackingNumber)}`
      )

      if (response.status === 404) {
        throw new Error('No se encontró el embarque solicitado.')
      }

      if (!response.ok) {
        throw new Error('No fue posible consultar el tracking.')
      }

      const rawData: Record<string, unknown> = await response.json()
      const normalizedData = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key.trim(), value])
      )

      const getString = (key: string, fallback: string) => {
        const value = normalizedData[key]
        return typeof value === 'string' ? value.trim() : fallback
      }

      const getNumber = (key: string, fallback: number) => {
        const value = normalizedData[key]
        return typeof value === 'number' ? value : fallback
      }

      const rawContainers = normalizedData.containers
      const containers = Array.isArray(rawContainers)
        ? rawContainers.map((container) => String(container).trim())
        : []

      const data: TrackingData = {
        idtra: getString('idtra', cleanTrackingNumber),
        bl: getString('bl', 'No disponible'),
        equipment_quantity: getNumber('equipment_quantity', containers.length),
        containers,
        status: getString('status', 'Sin información'),
        pol: getString('pol', 'No disponible'),
        poe: getString('poe', 'No disponible'),
        pod: getString('pod', 'No disponible'),
        transit_days: getNumber('transit_days', 0),
        origin_office: parseOffice(normalizedData.origin_office),
        destination_office: parseOffice(normalizedData.destination_office),
      }

      setTrackingData(data)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'No pudimos obtener información del envío.'
      )
    } finally {
      setLoading(false)
    }
  }

  const getCurrentStage = (status: string) => {
    const normalizedStatus = status.toLowerCase()

    if (normalizedStatus.includes('delivered') || normalizedStatus.includes('entregado')) return 4
    if (
      normalizedStatus.includes('port of entry') ||
      normalizedStatus.includes('arrival') ||
      normalizedStatus.includes('arrived')
    ) return 3
    if (normalizedStatus.includes('transit')) return 2
    return 1
  }

  const getStepStatus = (step: number, currentStage: number): StepStatus => {
    if (step < currentStage) return 'completed'
    if (step === currentStage) return 'current'
    return 'pending'
  }

  const getStatusStyle = (status: string): StatusStyle => {
    const normalizedStatus = status.toLowerCase()

    if (normalizedStatus.includes('delivered') || normalizedStatus.includes('entregado')) return 'delivered'
    if (
      normalizedStatus.includes('arrived') ||
      normalizedStatus.includes('arrival') ||
      normalizedStatus.includes('port of entry')
    ) return 'arrived'
    if (normalizedStatus.includes('transit')) return 'transit'
    if (normalizedStatus.includes('pending') || normalizedStatus.includes('departure')) return 'pending'
    return 'default'
  }

  return (
    <>
      <Helmet>
        <title>Web Tracking | Grupo Castro Fallas</title>
        <meta name="description" content="Consulta el estado y la información de tu carga mediante IDTRA, BL o número de contenedor." />
        <meta property="og:title" content="Web Tracking | Grupo Castro Fallas" />
        <meta property="og:description" content="Consulta el estado y la información de tu carga mediante IDTRA, BL o número de contenedor." />
        <link rel="icon" type="image/x-icon" href={logoIcon} />
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
            eyebrow="WEB TRACKING"
            title="Rastrea tu carga"
            description="Ingresa tu IDTRA, BL o número de contenedor para consultar la información actual de tu envío."
          />

          <div className="mx-auto w-full max-w-5xl">
            <form className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
              <input
                type="text"
                value={trackingNumber}
                onChange={(event) => setTrackingNumber(event.target.value)}
                placeholder="IDTRA, BL o número de contenedor"
                aria-label="IDTRA, BL o número de contenedor"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#c8171d] focus:ring-4 focus:ring-[#c8171d]/10"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#c8171d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91017] disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? 'Buscando...' : 'Rastrear'}
              </button>
            </form>

            {error && (
              <div className="mt-6 rounded-2xl border border-[#c8171d]/20 bg-red-50 p-6 text-[#9f1118]">
                <strong className="mb-1.5 block">No encontramos el envío</strong>
                <p className="m-0 text-sm text-[#7a3c40]">{error}</p>
              </div>
            )}

            {!trackingData && !error && !loading && (
              <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-[#c8171d] shadow-sm">↗</div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">Consulta el estado de tu envío</h3>
                <p className="mt-2 text-sm text-slate-500">Ingresa un IDTRA, BL o número de contenedor.</p>
              </div>
            )}

            {trackingData && (() => {
              const currentStage = getCurrentStage(trackingData.status)
              const statusStyle = getStatusStyle(trackingData.status)
              const steps = [
                { number: 1, code: 'POL', value: trackingData.pol, label: 'Puerto de Origen' },
                { number: 2, code: 'En tránsito', value: 'Transporte', label: 'Movimiento de carga' },
                { number: 3, code: 'POE', value: trackingData.poe, label: 'Puerto de Entrada' },
                { number: 4, code: 'POD', value: trackingData.pod, label: 'Puerto de Destino' },
              ]

              const details = [
                ['IDTRA', trackingData.idtra],
                ['BL', trackingData.bl],
                ['Status', trackingData.status],
                ['Cantidad de equipo', String(trackingData.equipment_quantity)],
                ['Oficina de origen', trackingData.origin_office?.label ?? 'No disponible'],
                ['Oficina de destino', trackingData.destination_office?.label ?? 'No disponible'],
                ['POL', trackingData.pol],
                ['POE', trackingData.poe],
                ['POD', trackingData.pod],
                ['Días de tránsito', `${trackingData.transit_days} días`],
              ]

              return (
                <div className="mt-8 space-y-6">
                  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
                    <div className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Estado actual</span>
                        <div className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold ${statusClasses[statusStyle]}`}>
                          <span className={`h-2 w-2 rounded-full ${statusDotClasses[statusStyle]}`} />
                          {trackingData.status}
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Días de tránsito</span>
                        <strong className="mt-1 block text-2xl text-slate-900">{trackingData.transit_days} días</strong>
                      </div>
                    </div>

                    <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        ['ID', 'Tracking / IDTRA', trackingData.idtra],
                        ['BL', 'Bill of Lading', trackingData.bl],
                        ['EQ', 'Cantidad de equipo', String(trackingData.equipment_quantity)],
                      ].map(([icon, label, value]) => (
                        <div key={label} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-extrabold text-[#c8171d] shadow-sm">{icon}</span>
                          <div className="min-w-0">
                            <small className="block text-xs text-slate-400">{label}</small>
                            <strong className="mt-1 block break-words text-sm text-slate-900">{value}</strong>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-extrabold text-[#c8171d] shadow-sm">CT</span>
                        <div className="min-w-0">
                          <small className="block text-xs text-slate-400">Contenedor</small>
                          {trackingData.containers.length > 0 ? (
                            trackingData.containers.map((container) => (
                              <strong key={container} className="mt-1 block break-all text-sm text-slate-900">{container}</strong>
                            ))
                          ) : (
                            <strong className="mt-1 block text-sm text-slate-900">No disponible</strong>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Ruta del envío</span>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{trackingData.pol} → {trackingData.pod}</h3>
                      </div>
                      <strong className={`self-start rounded-full border px-3 py-1.5 text-xs ${statusClasses[statusStyle]} sm:self-auto`}>{trackingData.status}</strong>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-4">
                      {steps.map((step) => {
                        const stepStatus = getStepStatus(step.number, currentStage)
                        return (
                          <div key={step.number} className="relative rounded-2xl bg-slate-50 p-4 text-center">
                            <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-extrabold ${stepClasses[stepStatus]}`}>
                              {step.number < currentStage ? '✓' : step.number}
                            </span>
                            <strong className="mt-3 block text-sm text-slate-900">{step.code}</strong>
                            <span className="mt-1 block text-sm text-slate-600">{step.value}</span>
                            <small className="mt-1 block text-xs text-slate-400">{step.label}</small>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">Detalles del envío</h3>
                    <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                      {details.map(([label, value]) => (
                        <div key={label} className="bg-white p-4">
                          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-slate-400">{label}</span>
                          <strong className="mt-1.5 block break-words text-sm text-slate-900">{value}</strong>
                        </div>
                      ))}
                    </div>
                  </section>
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
