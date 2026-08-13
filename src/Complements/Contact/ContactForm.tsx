import React from "react";
import { motion } from "framer-motion";
import Maps from "./Maps";
import Contact from "./Contact";

const ContactForm: React.FC = () => {
  return (
    <div className="container mx-auto p-8" id="contacto">
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
            <b>CONTÁCTANOS</b>
          </h1>
          <p className="text-center text-gray-600 text-lg mb-16">
            ¿Necesitas más información? Ponte en contacto con nosotros 
          </p>
        </motion.div>
      </div>

      <motion.div
        className="w-full flex justify-center rounded-xl overflow-hidden shadow-sm border border-gray-200"
        style={{ maxHeight: "320px" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Maps />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3 items-start">
        <div
          id="textoC"
          className="mt-10 text-left lg:text-base justify-self-start bg-[#94191d] text-white rounded-2xl px-10 py-8 max-w-md self-start"
        >
          <ul className="flex flex-col gap-6">
            <li>
              <b className="lg:text-xl font-semibold">Correo electrónico</b>
              <p className="lg:text-lg text-white/80">info@grupocastrofallas.com</p>
            </li>
            <li>
              <b className="lg:text-xl font-semibold">Número de teléfono</b>
              <p className="lg:text-lg text-white/80">+506 2272-6772</p>
            </li>
            <li>
              <b className="lg:text-xl">WhatsApp</b>
              <p className="lg:text-lg">+506 7005-1261</p>
            </li>
            <li>
              <b className="lg:text-xl font-semibold">Horario de atención</b>
              <p className="lg:text-lg text-white/80">Lunes a viernes: 7:30 am a 5:00 pm</p>
            </li>
          </ul>
        </div>
        <motion.div
          className="w-full justify-self-end"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Contact />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;