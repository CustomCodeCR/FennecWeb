import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * 500 — "La señal se cortó de nuestro lado"
 * A diferencia del 404 (ubicación inexistente, error del lado de la ruta),
 * el 500 comunica una falla del sistema: una línea de conexión que se rompe.
 * Usa un motivo distinto al pin del 404 para no repetir el mismo lenguaje visual.
 */
interface ServerErrorProps {
  onRetry?: () => void;
}

const ServerError: React.FC<ServerErrorProps> = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #500b0b 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Línea de conexión que se rompe, con un punto pulsante en la falla */}
        <div className="relative w-full h-24 mb-6">
          <svg viewBox="0 0 300 60" className="w-full h-full" fill="none">
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
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
            />
          </svg>

          <motion.div
            className="absolute rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: 14,
              height: 14,
              backgroundColor: "#a81212",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
        </div>

        <motion.h1
          className="text-[#94191d] text-7xl font-bold leading-none"
          style={{ fontFamily: "'fuente', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          500
        </motion.h1>

        <motion.p
          className="text-xl font-semibold text-gray-800 mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          La señal se cortó de nuestro lado
        </motion.p>

        <motion.p
          className="text-gray-600 mt-2 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          Algo falló en nuestro sistema. No es nada que hayas hecho tú —
          intenta de nuevo en un momento.
        </motion.p>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 bg-[#94191d] hover:bg-[#7a1418] text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
            Reintentar
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-[#94191d] text-[#94191d] hover:bg-[#94191d]/5 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <Home size={18} />
            Inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServerError;
