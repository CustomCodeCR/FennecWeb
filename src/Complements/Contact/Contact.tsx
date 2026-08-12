import React, { useState, ChangeEvent, FormEvent } from "react";
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
    errores.name = "El campo 'Nombre' es requerido";
  }
  if (!form.lastname.trim()) {
    errores.lastname = "El campo 'Apellido' es requerido";
  }
  if (!form.phone.trim()) {
    errores.phone = "El campo 'Teléfono' es requerido";
  }
  if (!form.email.trim()) {
    errores.email = "El campo 'Correo' es requerido";
  }
  if (!form.message.trim()) {
    errores.message = "El campo 'Mensaje' es requerido";
  }

  return errores;
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errores, setErrores] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e);
    setErrores(validateForm(form));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrores(validateForm(form));

    if (Object.keys(errores).length === 0) {
      setLoading(true);
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
          alert("Mensaje enviado.");
          setResponse(true);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error al enviar el mensaje:", error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades
        });
    } else {
      return;
    }
  };

  const getErrorForField = (fieldName: keyof ContactFormData) => {
    return errores[fieldName] ? (
      <p className="font-bold text-red-500">{errores[fieldName]}</p>
    ) : null;
  };

  return (
    <form className="shake" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="w-full md:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="w-full md:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Mensaje <span className="text-red-500">*</span>
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="w-full md:w-full px-2 mt-4">
          <button
            className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar mensaje
          </button>
        </div>
      </div>
    </form>
  );
};

export default Contact;
