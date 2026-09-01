import React from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ServerErrorProps {
  onRetry?: () => void
}

const ServerError: React.FC<ServerErrorProps> = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_#500b0b_1px,_transparent_1px)] bg-[size:28px_28px] opacity-[0.04]" />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div className="relative mb-6 h-24 w-full">
          <svg viewBox="0 0 300 60" className="h-full w-full" fill="none">
            <motion.line
              x1="10"
              y1="30"
              x2="130"
              y2="30"
              stroke="#94191d"
              strokeOpacity="0.35"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.line
              x1="170"
              y1="30"
              x2="290"
              y2="30"
              stroke="#94191d"
              strokeOpacity="0.35"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.15 }}
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-3.5 w-3.5 rounded-full bg-[#a81212]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
          </div>
        </div>

        <motion.h1
          className="text-7xl font-bold leading-none text-[#94191d] [font-family:'fuente',sans-serif]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          500
        </motion.h1>

        <motion.p
          className="mt-4 text-xl font-semibold text-slate-800"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          La señal se cortó de nuestro lado
        </motion.p>

        <motion.p
          className="mb-8 mt-2 text-slate-500"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          Algo falló en nuestro sistema. Intenta de nuevo en un momento.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <button onClick={handleRetry} className="inline-flex items-center gap-2 rounded-xl bg-[#94191d] px-6 py-3 font-medium text-white transition-colors hover:bg-[#7a1418]">
            <RefreshCw size={18} />
            Reintentar
          </button>

          <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-[#94191d] px-6 py-3 font-medium text-[#94191d] transition-colors hover:bg-[#94191d]/5">
            <Home size={18} />
            Inicio
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ServerError
