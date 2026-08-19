import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
 
interface ContactFormData {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  message: string;
}
 
type FormErrors = Partial<Record<keyof ContactFormData, string>>;
 
const MESSAGE_MAX_LENGTH = 500;
 
const initialForm: ContactFormData = {
  name: "",
  lastname: "",
  phone: "",
  email: "",
  message: "",
};
 
const validateForm = (form: ContactFormData): FormErrors => {
  let errores: FormErrors = {};
 
  if (!form.name.trim()) {
    errores.name = "Este campo es obligatorio.";
  }
  if (!form.lastname.trim()) {
    errores.lastname = "Este campo es obligatorio.";
  }
  if (!form.phone.trim()) {
    errores.phone = "Este campo es obligatorio.";
  } else if (!/^[\d\s+()-]{7,}$/.test(form.phone.trim())) {
    errores.phone = "Ingrese un teléfono válido.";
  }
  if (!form.email.trim()) {
    errores.email = "Este campo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errores.email = "Ingrese un correo válido.";
  }
  if (!form.message.trim()) {
    errores.message = "Este campo es obligatorio.";
  }
 
  return errores;
};
 
const inputBase =
  "appearance-none border border-gray-300 rounded-xl w-full py-3 pl-11 pr-3.5 text-gray-800 leading-tight transition-all duration-150 placeholder:text-gray-400 focus:outline-none focus:border-[#94191d] focus:shadow-[0_0_0_3px_rgba(148,25,29,0.12)]";
 
const inputError = "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]";
 
const iconBase = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400";
 
// URL del backend propio (FastAPI). En producción, cámbiala por la URL real del servidor
// donde despliegues el backend (ej. https://api.tudominio.com/contacto),
// idealmente vía una variable de entorno (import.meta.env.VITE_API_URL).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/contacto";
 
const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errores, setErrores] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
 
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
 
    if (submitted) {
      setErrores(validateForm(updatedForm));
    }
  };
 
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
 
    if (submitted) {
      setErrores(validateForm(updatedForm));
    }
  };
 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const erroresActuales = validateForm(form);
    setErrores(erroresActuales);
 
    if (Object.keys(erroresActuales).length === 0) {
      setLoading(true);
      setResponse(null);
      axios
        .post(API_URL, {
          nombre: form.name,
          apellido: form.lastname,
          email: form.email,
          celular: form.phone,
          mensaje: form.message,
        })
        .then(() => {
          setLoading(false);
          setResponse(true);
          setForm(initialForm);
          setSubmitted(false);
          setErrores({});
        })
        .catch((error) => {
          setLoading(false);
          setResponse(false);
          console.error("Error al enviar el mensaje:", error);
        });
    }
  };
 
  // Siempre reserva el espacio del mensaje de error (altura fija),
  // así el formulario no "salta" cuando aparece o desaparece el texto.
  const getErrorForField = (fieldName: keyof ContactFormData) => {
    const message = errores[fieldName];
    return (
      <p
        className={`flex items-center gap-1 text-red-600 text-[13px] mt-1.5 transition-opacity duration-150 ${
          message ? "opacity-100" : "opacity-0"
        }`}
      >
        {message && <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
        {message || "\u00A0"}
      </p>
    );
  };
 
  const fieldClass = (fieldName: keyof ContactFormData) =>
    errores[fieldName] ? `${inputBase} ${inputError}` : inputBase;
 
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 w-full">
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          <div>
            <label
              className="block text-gray-900 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Nombre <span className="text-[#94191d]">*</span>
            </label>
            <div className="relative">
              <User className={iconBase} />
              <input
                className={fieldClass("name")}
                id="name"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
                value={form.name}
                required
              />
            </div>
            {getErrorForField("name")}
          </div>
 
          <div>
            <label
              className="block text-gray-900 text-sm font-semibold mb-2"
              htmlFor="lastname"
            >
              Apellido <span className="text-[#94191d]">*</span>
            </label>
            <div className="relative">
              <User className={iconBase} />
              <input
                className={fieldClass("lastname")}
                id="lastname"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                name="lastname"
                placeholder="Ingrese su apellido"
                value={form.lastname}
                required
              />
            </div>
            {getErrorForField("lastname")}
          </div>
 
          <div>
            <label
              className="block text-gray-900 text-sm font-semibold mb-2"
              htmlFor="phone"
            >
              Teléfono <span className="text-[#94191d]">*</span>
            </label>
            <div className="relative">
              <Phone className={iconBase} />
              <input
                className={fieldClass("phone")}
                id="phone"
                type="tel"
                onBlur={handleBlur}
                onChange={handleChange}
                name="phone"
                placeholder="Ingrese su teléfono"
                value={form.phone}
                required
              />
            </div>
            {getErrorForField("phone")}
          </div>
 
          <div>
            <label
              className="block text-gray-900 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Correo electrónico <span className="text-[#94191d]">*</span>
            </label>
            <div className="relative">
              <Mail className={iconBase} />
              <input
                className={fieldClass("email")}
                id="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={form.email}
                required
              />
            </div>
            {getErrorForField("email")}
          </div>
 
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label
                className="block text-gray-900 text-sm font-semibold"
                htmlFor="message"
              >
                Mensaje <span className="text-[#94191d]">*</span>
              </label>
              <span
                className={`text-xs ${
                  form.message.length > MESSAGE_MAX_LENGTH
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {form.message.length}/{MESSAGE_MAX_LENGTH}
              </span>
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                className={`${fieldClass("message")} resize-y`}
                id="message"
                onBlur={handleBlur}
                onChange={handleChange}
                name="message"
                rows={5}
                maxLength={MESSAGE_MAX_LENGTH}
                placeholder="Ingrese su mensaje"
                value={form.message}
                required
              ></textarea>
            </div>
            {getErrorForField("message")}
          </div>
 
          <div className="md:col-span-2 mt-3">
            <button
              className="inline-flex items-center justify-center gap-2 bg-[#94191d] hover:bg-[#b52126] hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-3 px-8 rounded-lg transition-all duration-150 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Enviando..." : "ENVIAR MENSAJE →"}
            </button>
 
            {response === true && (
              <div className="flex items-center gap-2 bg-green-50 text-green-800 border border-green-200 rounded-lg px-4 py-3 mt-4">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="font-medium text-sm">
                  Mensaje enviado correctamente. Nos pondremos en contacto pronto.
                </p>
              </div>
            )}
            {response === false && (
              <div className="flex items-center gap-2 bg-red-50 text-red-800 border border-red-200 rounded-lg px-4 py-3 mt-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium text-sm">
                  Ocurrió un error al enviar el mensaje. Intentá de nuevo.
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
 
export default Contact;
