import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface ContactFormData {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

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
  }
  if (!form.email.trim()) {
    errores.email = "Este campo es obligatorio.";
  }
  if (!form.message.trim()) {
    errores.message = "Este campo es obligatorio.";
  }

  return errores;
};

const inputBase =
  "appearance-none border border-gray-300 rounded-md w-full py-3 px-3.5 text-gray-700 leading-tight transition-all duration-150 focus:outline-none focus:border-[#94191d] focus:shadow-[0_0_0_3px_rgba(148,25,29,0.12)]";

const inputError = "border-red-500 focus:border-red-500";

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
        .post("https://api.logisticacastrofallas.com/api/Mail/Send", {
          para: "info@grupocastrofallas.com",
          asunto: "Contacto",
          contenido: `
              <p><strong>Nombre:</strong> ${form.name}</p>
              <p><strong>Apellido:</strong> ${form.lastname}</p>
              <p><strong>Teléfono:</strong> ${form.phone}</p>
              <p><strong>Correo Electrónico:</strong> ${form.email}</p>
              <p><strong>Mensaje:</strong> ${form.message}</p>
            `,
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

  const getErrorForField = (fieldName: keyof ContactFormData) => {
    return errores[fieldName] ? (
      <p className="text-red-500 text-[13px] mt-1">{errores[fieldName]}</p>
    ) : null;
  };

  const fieldClass = (fieldName: keyof ContactFormData) =>
    errores[fieldName] ? `${inputBase} ${inputError}` : inputBase;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre <span className="text-red-900">*</span>
          </label>
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
          {getErrorForField("name")}
        </div>
        <div>
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Apellido <span className="text-red-900">*</span>
          </label>
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
          {getErrorForField("lastname")}
        </div>
        <div>
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Teléfono <span className="text-red-900">*</span>
          </label>
          <input
            className={fieldClass("phone")}
            id="phone"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            name="phone"
            placeholder="Ingrese su teléfono"
            value={form.phone}
            required
          />
          {getErrorForField("phone")}
        </div>
        <div>
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electrónico <span className="text-red-900">*</span>
          </label>
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
          {getErrorForField("email")}
        </div>
        <div className="md:col-span-2">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Mensaje <span className="text-red-900">*</span>
          </label>
          <textarea
            className={fieldClass("message")}
            id="message"
            onBlur={handleBlur}
            onChange={handleChange}
            name="message"
            rows={5}
            placeholder="Ingrese su mensaje"
            value={form.message}
            required
          ></textarea>
          {getErrorForField("message")}
        </div>
        <div className="md:col-span-2 mt-2">
          <button
            className="bg-[#94191d] hover:bg-[#b52126] hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-3 px-8 rounded-lg transition-all duration-150 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:hover:translate-y-0"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "ENVIAR MENSAJE →"}
          </button>
          {response === true && (
            <p className="text-green-800 font-bold mt-2">
              Mensaje enviado correctamente.
            </p>
          )}
          {response === false && (
            <p className="text-red-800 font-bold mt-2">
              Ocurrió un error al enviar el mensaje. Intentá de nuevo.
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Contact;