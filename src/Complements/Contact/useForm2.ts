import { useState, ChangeEvent, FormEvent } from "react";
import { helpHttp } from "../helpers/helpHttp";

export function useForm<T extends Record<string, string>>(
  initialForm: T,
  validateForm: (form: T) => Partial<Record<keyof T, string>>
) {
  const [form, setForm] = useState<T>(initialForm);
  const [errores, setErrores] = useState<Partial<Record<keyof T, string>>>({});
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
      helpHttp()
        .post("https://api.logisticacastrofallas.com/api/Mail/Send", {
          body: {
            para: "maulangbonilla.18@gmaail.com",
            asunto: "Contacto",
            contenido: `
              <p><strong>Nombre:</strong> ${(form as any).name}</p>
              <p><strong>Apellido:</strong> ${(form as any).lastname}</p>
              <p><strong>Teléfono:</strong> ${(form as any).phone}</p>
              <p><strong>Correo Electrónico:</strong> ${(form as any).email}</p>
              <p><strong>Mensaje:</strong> ${(form as any).message}</p>
            `,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(() => {
          setLoading(false);
          alert("Mensaje enviado.");
          setResponse(true);
        });
    } else {
      return;
    }
  };

  return {
    form,
    errores,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
