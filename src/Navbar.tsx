import { useState } from "react";
import { Link } from "react-router-dom";

const routeItems = [
  { label: "Preguntas frecuentes", to: "/preguntas-frecuentes", icon: "?" },
];

function Apps() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarSistemasGCF, setMostrarSistemasGCF] = useState(false);

  const volver = () => {
    setMostrarSistemasGCF(false);
    setMenuAbierto(false);
  };

  const opcionSinDestino = (nombre: string) => {
    console.log(`Se presionó: ${nombre}`);

    if (nombre === "Servicios") {
      const elemento = document.getElementById("servicios");
      elemento?.scrollIntoView({ behavior: "smooth" });
    } else if (nombre === "Nosotros") {
      const elemento = document.getElementById("Nosotros");
      elemento?.scrollIntoView({ behavior: "smooth" });
    } else if (nombre === "Contacto" || nombre === "Contáctanos") {
      const elemento = document.getElementById("CONTÁCTANOS");

      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("No se encontró la sección #CONTÁCTANOS en el DOM");
      }
    }
  };

  const acceder = (sistema: string) => {
    console.log(`Acceder: ${sistema}`);
  };

  if (mostrarSistemasGCF) {
    return (
      <div className="fixed inset-0 h-screen w-screen overflow-hidden">
        <img
          src="/sistemas-gcf.png"
          alt="Sistemas de Gestión GCF"
          className="absolute inset-0 block h-full w-full select-none object-fill"
        />

        <button
          type="button"
          onClick={volver}
          className="absolute left-9 top-[27px] z-20 flex cursor-pointer items-center gap-2.5 border-none bg-transparent px-2 py-1 text-xl text-black [font-family:Arial,Helvetica,sans-serif] transition-all duration-150 active:scale-95"
        >
          <span className="text-[38px] font-light leading-5">←</span>
          <span>Volver</span>
        </button>

        <button
          type="button"
          onClick={() => acceder("GCF CRM")}
          aria-label="Acceder a GCF CRM"
          className="absolute left-[13.8%] top-[40.2%] z-[15] h-[6.5%] w-[7%] cursor-pointer rounded-lg border-none bg-transparent transition-all duration-150 active:scale-95"
        />

        <button
          type="button"
          onClick={() => acceder("GCF Comercial")}
          aria-label="Acceder a GCF Comercial"
          className="absolute left-[46%] top-[40.2%] z-[15] h-[6.5%] w-[7%] cursor-pointer rounded-lg border-none bg-transparent transition-all duration-150 active:scale-95"
        />

        <button
          type="button"
          onClick={() => acceder("GCF Aduanas")}
          aria-label="Acceder a GCF Aduanas"
          className="absolute left-[79.2%] top-[40.2%] z-[15] h-[6.5%] w-[7%] cursor-pointer rounded-lg border-none bg-transparent transition-all duration-150 active:scale-95"
        />

        <button
          type="button"
          onClick={() => acceder("GCF Panamá")}
          aria-label="Acceder a GCF Panamá"
          className="absolute left-[13.8%] top-[75.5%] z-[15] h-[6.5%] w-[7%] cursor-pointer rounded-lg border-none bg-transparent transition-all duration-150 active:scale-95"
        />

        <button
          type="button"
          onClick={() => acceder("GCF Ajustes")}
          aria-label="Acceder a GCF Ajustes"
          className="absolute left-[46%] top-[75.5%] z-[15] h-[6.5%] w-[7%] cursor-pointer rounded-lg border-none bg-transparent transition-all duration-150 active:scale-95"
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuAbierto((actual) => !actual)}
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
        className="fixed left-5 top-5 z-[100] flex h-[55px] w-[55px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[15px] border border-[rgba(248,1,1,0.83)] bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[15px] transition-all duration-200 hover:bg-white hover:shadow-[0_15px_35px_rgba(0,0,0,0.22)] active:scale-[0.94] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.25)]"
      >
        <span
          className={`block h-0.5 w-[25px] bg-black transition-all duration-300 ${
            menuAbierto ? "translate-y-2 rotate-45" : "translate-y-0 rotate-0"
          }`}
        />
        <span
          className={`block h-0.5 w-[25px] bg-black transition-all duration-300 ${
            menuAbierto ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-[25px] bg-black transition-all duration-300 ${
            menuAbierto
              ? "-translate-y-2 -rotate-45"
              : "translate-y-0 rotate-0"
          }`}
        />
      </button>

      <aside
        className={`fixed left-5 top-5 z-[90] max-h-[calc(100vh-40px)] w-[330px] overflow-y-auto rounded-[25px] border border-[rgba(248,1,1,0.83)] bg-white/[0.88] px-5 pb-5 pt-[90px] text-black shadow-[0_25px_60px_rgba(0,0,0,0.18)] backdrop-blur-[25px] [font-family:Arial,Helvetica,sans-serif] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuAbierto
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[120%] opacity-0"
        }`}
      >
        <div className="mb-5 flex items-center justify-center border-b border-[rgba(248,1,1,0.83)] pb-5">
          <img
            src="/Logo, Castro Fallas.png"
            alt="Castro Fallas"
            className="block h-[100px] w-40 object-contain"
          />
        </div>

        {["Servicios", "Nosotros", "Contacto"].map((item, index) => {
          const icons = ["⚙", "◉", "✉"];
          return (
            <button
              key={item}
              type="button"
              onClick={() => opcionSinDestino(item)}
              className="mb-1.5 flex w-full cursor-pointer items-center gap-[15px] rounded-[13px] border border-transparent bg-transparent p-3.5 text-left text-base text-black transition-all duration-150 ease-out hover:border-[rgba(248,1,1,0.15)] hover:bg-black/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-[0.98] active:bg-black/[0.07] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.18)]"
            >
              <span className="w-[25px] text-[19px]">{icons[index]}</span>
              <span>{item}</span>
            </button>
          );
        })}

        <div className="my-3 h-px w-full bg-[rgba(248,1,1,0.83)]" />

        <span className="mb-2 block px-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
          Enlaces
        </span>

        {routeItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMenuAbierto(false)}
            className="mb-1.5 flex w-full cursor-pointer items-center gap-[15px] rounded-[13px] border border-transparent bg-transparent p-3.5 text-left text-base text-black transition-all duration-150 ease-out hover:border-[rgba(248,1,1,0.15)] hover:bg-black/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-[0.98] active:bg-black/[0.07] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.18)]"
          >
            <span className="w-[25px] text-[19px]">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </aside>
    </>
  );
}

export default Apps;
