import React, { useState } from 'react'
import { User, Mail, Phone, MessageSquare } from 'lucide-react'

interface FormData {
  nombre: string
  apellido: string
  email: string
  celular: string
  mensaje: string
}

const initialForm: FormData = {
  nombre: '',
  apellido: '',
  email: '',
  celular: '',
  mensaje: '',
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('http://localhost:8000/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el formulario')
      }

      setStatus('success')
      setFormData(initialForm)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#f4e9df] rounded-2xl shadow-sm p-8 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-sm">
          <User size={18} className="text-[#94191d] shrink-0" />
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-sm">
          <User size={18} className="text-[#94191d] shrink-0" />
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-sm">
          <Phone size={18} className="text-[#94191d] shrink-0" />
          <input
            type="tel"
            id="celular"
            name="celular"
            placeholder="Número de celular"
            value={formData.celular}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-sm">
          <Mail size={18} className="text-[#94191d] shrink-0" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm">
        <MessageSquare size={18} className="text-[#94191d] shrink-0 mt-1" />
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Escribe tu mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={4}
          maxLength={500}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 resize-none"
        />
      </div>

      <p className="text-xs text-gray-500">
        Al enviar este formulario, tus datos se usarán únicamente para responder tu consulta.
      </p>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start bg-[#94191d] text-white font-semibold rounded-full px-8 py-3 hover:bg-[#7a1418] transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-sm">
          ¡Mensaje enviado correctamente! Te contactaremos pronto.
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Hubo un error al enviar el mensaje. Inténtalo de nuevo.
        </p>
      )}
    </form>
  )
}

export default Contact