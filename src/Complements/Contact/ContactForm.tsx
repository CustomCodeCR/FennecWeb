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
            className="text-center text-black text-3xl font-bold mt-4 mb-20"
            style={{ fontFamily: "'fuente', sans-serif" }}
          >
            <b>Contáctenos</b>
          </h1>
        </motion.div>
      </div>
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Maps />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
        <div
          id="textoC"
          className="mt-5 text-left lg:text-base justify-self-start bg-red-900 text-white rounded-2xl p-8 max-w-xl"
        >
          <ul>
            <li className="mb-1">
              <b className="lg:text-xl">Correo electrónico</b>
              <p className="lg:text-lg">info@grupocastrofallas.com</p>
            </li>
            <li className="mb-2">
              <b className="lg:text-xl">Número de teléfono</b>
              <p className="lg:text-lg">+506 2272-6772</p>
            </li>
            <li>
              <b className="lg:text-xl">WhatsApp</b>
              <p className="lg:text-lg">+506 7005-1261</p>
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