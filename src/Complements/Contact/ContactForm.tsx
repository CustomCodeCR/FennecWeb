import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";

import Maps from "./Maps";
import Contact from "./Contact";

const infoCards = [
  {
    icon: Phone,
    title: "Número de teléfono",
    value: "+506 2272-6772",
  },
  {
    icon: Mail,
    title: "Correo electrónico",
    value: "comercial@castrofallas.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+506 7078-6860",
  },
  {
    icon: Clock,
    title: "Horario de atención",
    value: "Lunes a viernes: 7:30 am a 5:15 pm",
  },
];

const ContactForm: React.FC = () => {
  return (
    <div className="container mx-auto p-8" id="contacto">
      {/* Título */}
      <div id="titulo">
        <motion.div
          className="col-md-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1
            className="text-center text-[#94191d] text-4xl font-bold mt-4 mb-3"
            style={{ fontFamily: "'fuente', sans-serif" }}
          >
            CONTÁCTANOS
          </h1>

          <p className="text-center text-gray-600 text-lg mb-16">
            ¿Necesitas más información? Ponte en contacto con nosotros
          </p>
        </motion.div>
      </div>

      {/* Formulario */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Contact />
      </motion.div>

      {/* Tarjetas de información */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {infoCards.map(({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="bg-[#94191d] text-white rounded-2xl px-6 py-8 flex flex-col items-center text-center gap-3"
          >
            <div className="bg-white/15 rounded-full p-3">
              <Icon size={24} className="text-white" />
            </div>
            <b className="text-base font-semibold">{title}</b>
            <p className="text-sm text-white/80">{value}</p>
          </div>
        ))}
      </motion.div>

      {/* Mapa */}
      <div className="mt-10">
        <h2 className="text-center text-[#94191d] text-2xl font-bold mb-6">
          Nuestras Ubicaciones
        </h2>

        <motion.div
          className="w-full flex justify-center rounded-xl overflow-hidden shadow-sm border border-gray-200"
          style={{ maxHeight: "400px" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Maps />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;

