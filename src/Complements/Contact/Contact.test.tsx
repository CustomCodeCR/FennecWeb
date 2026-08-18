import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Contact from "./Contact";

// Mockeamos axios completo: así controlamos qué responde el "backend"
// sin hacer llamadas de red reales durante los tests.
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

// Helper para llenar el formulario con datos válidos.
async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nombre/i), "Ana");
  await user.type(screen.getByLabelText(/apellido/i), "Pérez");
  await user.type(screen.getByLabelText(/teléfono/i), "8888-8888");
  await user.type(screen.getByLabelText(/correo electrónico/i), "ana@example.com");
  await user.type(screen.getByLabelText(/mensaje/i), "Hola, quiero más información.");
}

describe("<Contact />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza todos los campos y el botón de envío", () => {
    render(<Contact />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enviar mensaje/i })
    ).toBeInTheDocument();
  });

  it("muestra errores de campos obligatorios al enviar el formulario vacío", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    const errores = await screen.findAllByText("Este campo es obligatorio.");
    // name, lastname, phone, email, message => 5 errores
    expect(errores).toHaveLength(5);
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("muestra error cuando el teléfono tiene formato inválido", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/nombre/i), "Ana");
    await user.type(screen.getByLabelText(/apellido/i), "Pérez");
    await user.type(screen.getByLabelText(/teléfono/i), "abc");
    await user.type(screen.getByLabelText(/correo electrónico/i), "ana@example.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Mensaje de prueba");

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(
      await screen.findByText("Ingrese un teléfono válido.")
    ).toBeInTheDocument();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("muestra error cuando el correo tiene formato inválido", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/nombre/i), "Ana");
    await user.type(screen.getByLabelText(/apellido/i), "Pérez");
    await user.type(screen.getByLabelText(/teléfono/i), "8888-8888");
    await user.type(screen.getByLabelText(/correo electrónico/i), "correo-invalido");
    await user.type(screen.getByLabelText(/mensaje/i), "Mensaje de prueba");

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(
      await screen.findByText("Ingrese un correo válido.")
    ).toBeInTheDocument();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("revalida en vivo (onChange) después del primer intento fallido de envío", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Primer intento: formulario vacío -> dispara validación y marca "submitted".
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(await screen.findAllByText("Este campo es obligatorio.")).toHaveLength(5);

    // Al escribir en "nombre", el error de ese campo debe desaparecer sin volver a enviar.
    await user.type(screen.getByLabelText(/nombre/i), "Ana");

    await waitFor(() => {
      expect(screen.getAllByText("Este campo es obligatorio.")).toHaveLength(4);
    });
  });

  it("envía el formulario correctamente y muestra mensaje de éxito", async () => {
    // Usamos una promesa controlada manualmente en vez de mockResolvedValueOnce:
    // así garantizamos que la petición siga "pendiente" mientras verificamos
    // el estado de carga, sin depender de qué tan rápido resuelva el mock.
    let resolvePost: (value: { data: unknown }) => void;
    const pendingPost = new Promise<{ data: unknown }>((resolve) => {
      resolvePost = resolve;
    });
    mockedAxios.post.mockReturnValueOnce(pendingPost as ReturnType<typeof axios.post>);

    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    // Estado de carga (la petición todavía no se resuelve)
    expect(await screen.findByText(/enviando/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();

    // Se llamó a axios.post con el endpoint y payload correctos
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.logisticacastrofallas.com/api/Mail/Send",
      expect.objectContaining({
        para: "info@grupocastrofallas.com",
        asunto: "Contacto",
        contenido: expect.stringContaining("Ana"),
      })
    );

    // Ahora sí resolvemos la petición y esperamos el resultado
    resolvePost!({ data: {} });

    // Mensaje de éxito visible y formulario reseteado
    expect(
      await screen.findByText(/mensaje enviado correctamente/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toHaveValue("");
    expect(screen.getByLabelText(/mensaje/i)).toHaveValue("");
  });

  it("muestra mensaje de error si la petición falla", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(
      await screen.findByText(/ocurrió un error al enviar el mensaje/i)
    ).toBeInTheDocument();

    // El botón vuelve a estar habilitado y ya no dice "Enviando..."
    expect(
      screen.getByRole("button", { name: /enviar mensaje/i })
    ).not.toBeDisabled();

    // Los datos no se pierden cuando falla, para que el usuario pueda reintentar
    expect(screen.getByLabelText(/nombre/i)).toHaveValue("Ana");
  });

  it("actualiza el contador de caracteres del mensaje", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/mensaje/i), "Hola");

    expect(screen.getByText("4/500")).toBeInTheDocument();
  });
});