import React from "react";
import { motion } from "framer-motion";
import { MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";
 
/**
 * 404 — "Este pin no existe en el mapa"
 * Motivo visual coherente con Maps.tsx: un pin que se sale de una ruta punteada
 * y cae fuera del "mapa", reforzando que la dirección/ubicación solicitada no existe.
 */
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6 overflow-hidden relative">
      {/* Fondo tipo cuadrícula de mapa, muy sutil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #500b0b 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
 
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Ruta punteada + pin que se desvía */}
        <div className="relative w-full h-32 mb-6">
          <svg
            viewBox="0 0 300 100"
            className="w-full h-full"
            fill="none"
          >
            <motion.path
              d="M 10 70 C 90 70, 120 30, 200 40"
              stroke="#94191d"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </svg>
 
          <motion.div
            className="absolute"
            style={{ left: "62%", top: "6%" }}
            initial={{ y: -14, opacity: 0, rotate: -8 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.9,
              type: "spring",
              stiffness: 200,
            }}
          >
            <MapPin
              size={44}
              color="#500b0b"
              fill="#a81212"
              strokeWidth={2}
            />
          </motion.div>
        </div>
 
        <motion.h1
          className="text-[#94191d] text-7xl font-bold leading-none"
          style={{ fontFamily: "'fuente', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
 
        <motion.p
          className="text-xl font-semibold text-gray-800 mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Página no encontrada
        </motion.p>
 
        <motion.p
          className="text-gray-600 mt-2 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          La página que buscas no existe, cambió de dirección o fue movida.
          Revisa el enlace o vuelve al inicio.
        </motion.p>
 
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#94191d] hover:bg-[#7a1418] text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <Home size={18} />
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
 
export default NotFound;
