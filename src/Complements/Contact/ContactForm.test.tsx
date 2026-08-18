import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm"; // ajusta la ruta según donde esté el archivo real

/**
 * framer-motion aplica animaciones que no aportan nada a un test unitario y pueden
 * generar warnings/errores en jsdom (por ejemplo con IntersectionObserver, que
 * whileInView usa internamente). Lo mockeamos para que motion.div se comporte como
 * un <div> normal, ignorando las props de animación.
 */
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, ...props }: any) => {
        // Filtramos props exclusivas de framer-motion que no son válidas en el DOM
        const {
          initial,
          whileInView,
          animate,
          exit,
          transition,
          viewport,
          ...domProps
        } = props;
        return <div {...domProps}>{children}</div>;
      },
    },
  };
});

/**
 * Maps y Contact son componentes hijos con su propia lógica y sus propios tests.
 * Aquí solo nos interesa verificar que ContactForm los renderiza en el lugar correcto,
 * así que los mockeamos por placeholders identificables.
 */
vi.mock("./Maps", () => {
  return {
    default: () => <div data-testid="maps-mock" />,
  };
});

vi.mock("./Contact", () => {
  return {
    default: () => <div data-testid="contact-mock" />,
  };
});

describe("ContactForm", () => {
  it("renderiza el título y subtítulo de la sección", () => {
    render(<ContactForm />);

    expect(screen.getByText("CONTÁCTANOS")).toBeInTheDocument();
    expect(
      screen.getByText(/necesitas más información/i)
    ).toBeInTheDocument();
  });

  it("tiene el id 'contacto' en el contenedor principal (para navegación por anclas)", () => {
    const { container } = render(<ContactForm />);

    const section = container.querySelector("#contacto");
    expect(section).not.toBeNull();
  });

  it("renderiza el componente Maps", () => {
    render(<ContactForm />);

    expect(screen.getByTestId("maps-mock")).toBeInTheDocument();
  });

  it("renderiza el componente Contact (formulario)", () => {
    render(<ContactForm />);

    expect(screen.getByTestId("contact-mock")).toBeInTheDocument();
  });

  it("muestra el correo electrónico de contacto", () => {
    render(<ContactForm />);

    expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
    expect(
      screen.getByText("info@grupocastrofallas.com")
    ).toBeInTheDocument();
  });

  it("muestra el número de teléfono", () => {
    render(<ContactForm />);

    expect(screen.getByText("Número de teléfono")).toBeInTheDocument();
    expect(screen.getByText("+506 2272-6772")).toBeInTheDocument();
  });

  it("muestra el número de WhatsApp", () => {
    render(<ContactForm />);

    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("+506 7005-1261")).toBeInTheDocument();
  });

  it("muestra el horario de atención", () => {
    render(<ContactForm />);

    expect(screen.getByText("Horario de atención")).toBeInTheDocument();
    expect(
      screen.getByText("Lunes a viernes: 7:30 am a 5:00 pm")
    ).toBeInTheDocument();
  });
});
