import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
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
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-stretch">
        <motion.div
          id="textoC"
          className="text-left lg:text-base bg-[#94191d] text-white rounded-2xl px-10 py-10 flex flex-col justify-center gap-6 h-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4 pb-6 border-b border-white/20">
            <Mail size={22} className="mt-1 shrink-0 text-white/90" />
            <div>
              <b className="lg:text-xl font-semibold block">Correo electrónico</b>
              <p className="lg:text-lg text-white/80">info@grupocastrofallas.com</p>
            </div>
          </div>
 
          <div className="flex items-start gap-4 pb-6 border-b border-white/20">
            <Phone size={22} className="mt-1 shrink-0 text-white/90" />
            <div>
              <b className="lg:text-xl font-semibold block">Número de teléfono</b>
              <p className="lg:text-lg text-white/80">+506 2272-6772</p>
            </div>
          </div>
 
          <div className="flex items-start gap-4 pb-6 border-b border-white/20">
            <MessageCircle size={22} className="mt-1 shrink-0 text-white/90" />
            <div>
              <b className="lg:text-xl font-semibold block">WhatsApp</b>
              <p className="lg:text-lg text-white/80">+506 7005-1261</p>
            </div>
          </div>
 
          <div className="flex items-start gap-4">
            <Clock size={22} className="mt-1 shrink-0 text-white/90" />
            <div>
              <b className="lg:text-xl font-semibold block">Horario de atención</b>
              <p className="lg:text-lg text-white/80">
                Lunes a viernes: 7:30 am a 5:00 pm
              </p>
            </div>
          </div>
        </motion.div>
 
        <motion.div
          className="w-full"
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
