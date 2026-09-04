import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import Contact from './Contact'
import Maps from './Maps'

const infoCards = [
  { icon: Phone, title: 'Número de teléfono', value: '+506 2272-6772', href: 'tel:+50622726772' },
  { icon: Mail, title: 'Correo electrónico', value: 'comercial@castrofallas.com', href: 'mailto:comercial@castrofallas.com' },
  { icon: MessageCircle, title: 'WhatsApp', value: '+506 7078-6860', href: 'https://wa.me/50670786860' },
  { icon: MapPin, title: 'Dirección', value: 'Curridabat, San José, Costa Rica', href: undefined },
  { icon: Clock, title: 'Horario de atención', value: 'Lunes a viernes: 7:30 am a 5:15 pm', href: undefined },
]

const ContactForm: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-8" id="contacto">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="mt-4 text-center text-4xl font-bold text-[#94191d] [font-family:'fuente',sans-serif]">
          CONTÁCTANOS
        </h2>
        <p className="mb-16 mt-3 text-center text-lg text-slate-500">
          ¿Necesitas más información? Ponte en contacto con nosotros
        </p>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Contact />
      </motion.div>

      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {infoCards.map(({ icon: Icon, title, value, href }) => (
          <div key={title} className="flex flex-col items-center gap-3 rounded-2xl bg-[#94191d] px-5 py-8 text-center text-white">
            <div className="rounded-full bg-white/15 p-3">
              <Icon size={24} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold">{title}</h3>
            {href ? (
              <a
                href={href}
                target={href.startsWith('https://') ? '_blank' : undefined}
                rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                className="break-words text-sm text-white/85 underline-offset-4 hover:underline"
              >
                {value}
              </a>
            ) : (
              <p className="text-sm text-white/80">{value}</p>
            )}
          </div>
        ))}
      </motion.div>

      <div className="mt-10">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#94191d]">Nuestras Ubicaciones</h2>

        <motion.div
          className="flex max-h-[400px] w-full justify-center overflow-hidden rounded-xl border border-slate-200 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Maps />
        </motion.div>
      </div>
    </div>
  )
}

export default ContactForm
