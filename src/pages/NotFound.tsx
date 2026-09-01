import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_#500b0b_1px,_transparent_1px)] bg-[size:28px_28px] opacity-[0.04]" />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div className="relative mb-6 h-32 w-full">
          <svg viewBox="0 0 300 100" className="h-full w-full" fill="none">
            <motion.path
              d="M 10 70 C 90 70, 120 30, 200 40"
              stroke="#94191d"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          </svg>

          <motion.div
            className="absolute left-[62%] top-[6%]"
            initial={{ y: -14, opacity: 0, rotate: -8 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.9, type: 'spring', stiffness: 200 }}
          >
            <MapPin size={44} color="#500b0b" fill="#a81212" strokeWidth={2} />
          </motion.div>
        </div>

        <motion.h1
          className="text-7xl font-bold leading-none text-[#94191d] [font-family:'fuente',sans-serif]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.p
          className="mt-4 text-xl font-semibold text-slate-800"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Página no encontrada
        </motion.p>

        <motion.p
          className="mb-8 mt-2 text-slate-500"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          La página que buscas no existe, cambió de dirección o fue movida. Revisa el enlace o vuelve al inicio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-[#94191d] px-6 py-3 font-medium text-white transition-colors hover:bg-[#7a1418]">
            <Home size={18} />
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
