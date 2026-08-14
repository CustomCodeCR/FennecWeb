import { useState } from "react";

function Apps() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarSistemasGCF, setMostrarSistemasGCF] = useState(false);

  const volver = () => {
    setMostrarSistemasGCF(false);
    setMenuAbierto(false);
  };

  const opcionSinDestino = (nombre: string) => {
    console.log(`Se presionó: ${nombre}`);
  };

  const acceder = (sistema: string) => {
    console.log(`Acceder: ${sistema}`);
  };

  /* =====================================================
     PANTALLA SISTEMAS DE GESTIÓN GCF
  ===================================================== */

  if (mostrarSistemasGCF) {
    return (
      <div className="fixed inset-0 h-screen w-screen overflow-hidden">
        <img
          src="/sistemas-gcf.png"
          alt="Sistemas de Gestión GCF"
          className="absolute inset-0 block h-full w-full select-none object-fill"
        />

        {/* BOTÓN VOLVER */}
        <button
          type="button"
          onClick={volver}
          className="
            absolute left-9 top-[27px] z-20
            flex cursor-pointer items-center gap-2.5
            border-none bg-transparent px-2 py-1
            text-xl text-black
            [font-family:Arial,Helvetica,sans-serif]
          "
        >
          <span className="text-[38px] font-light leading-5">←</span>

          <span>Volver</span>
        </button>

        {/* GCF CRM */}
        <button
          type="button"
          onClick={() => acceder("GCF CRM")}
          aria-label="Acceder a GCF CRM"
          className="
            absolute left-[13.8%] top-[40.2%] z-[15]
            h-[6.5%] w-[7%]
            cursor-pointer rounded-lg border-none bg-transparent
          "
        />

        {/* GCF COMERCIAL */}
        <button
          type="button"
          onClick={() => acceder("GCF Comercial")}
          aria-label="Acceder a GCF Comercial"
          className="
            absolute left-[46%] top-[40.2%] z-[15]
            h-[6.5%] w-[7%]
            cursor-pointer rounded-lg border-none bg-transparent
          "
        />

        {/* GCF ADUANAS */}
        <button
          type="button"
          onClick={() => acceder("GCF Aduanas")}
          aria-label="Acceder a GCF Aduanas"
          className="
            absolute left-[79.2%] top-[40.2%] z-[15]
            h-[6.5%] w-[7%]
            cursor-pointer rounded-lg border-none bg-transparent
          "
        />

        {/* GCF PANAMÁ */}
        <button
          type="button"
          onClick={() => acceder("GCF Panamá")}
          aria-label="Acceder a GCF Panamá"
          className="
            absolute left-[13.8%] top-[75.5%] z-[15]
            h-[6.5%] w-[7%]
            cursor-pointer rounded-lg border-none bg-transparent
          "
        />

        {/* GCF AJUSTES */}
        <button
          type="button"
          onClick={() => acceder("GCF Ajustes")}
          aria-label="Acceder a GCF Ajustes"
          className="
            absolute left-[46%] top-[75.5%] z-[15]
            h-[6.5%] w-[7%]
            cursor-pointer rounded-lg border-none bg-transparent
          "
        />
      </div>
    );
  }

  /* =====================================================
     NAVBAR
     
     IMPORTANTE:
     No existe ningún div con h-screen/100vh alrededor.
     El navbar queda flotando sobre HomePage.
  ===================================================== */

  return (
    <>
      {/* =================================================
          BOTÓN HAMBURGUESA
      ================================================= */}

      <button
        type="button"
        onClick={() => setMenuAbierto((actual) => !actual)}
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
        className="
          fixed left-5 top-5 z-[100]
          flex h-[55px] w-[55px]
          cursor-pointer flex-col
          items-center justify-center gap-1.5
          rounded-[15px]
          border border-[rgba(248,1,1,0.83)]
          bg-white/90
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]
          backdrop-blur-[15px]
          transition-all duration-300
          hover:bg-white
        "
      >
        <span
          className={`
            block h-0.5 w-[25px]
            bg-black
            transition-all duration-300
            ${
              menuAbierto ? "translate-y-2 rotate-45" : "translate-y-0 rotate-0"
            }
          `}
        />

        <span
          className={`
            block h-0.5 w-[25px]
            bg-black
            transition-all duration-300
            ${menuAbierto ? "opacity-0" : "opacity-100"}
          `}
        />

        <span
          className={`
            block h-0.5 w-[25px]
            bg-black
            transition-all duration-300
            ${
              menuAbierto
                ? "-translate-y-2 -rotate-45"
                : "translate-y-0 rotate-0"
            }
          `}
        />
      </button>

      {/* =================================================
          BARRA LATERAL
      ================================================= */}

      <aside
        className={`
          fixed left-5 top-5 z-[90]
          max-h-[calc(100vh-40px)]
          w-[330px]
          overflow-y-auto
          rounded-[25px]
          border border-[rgba(248,1,1,0.83)]
          bg-white/[0.88]
          px-5 pb-5 pt-[90px]
          text-black
          shadow-[0_25px_60px_rgba(0,0,0,0.18)]
          backdrop-blur-[25px]
          [font-family:Arial,Helvetica,sans-serif]
          transition-all duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            menuAbierto
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-[120%] opacity-0"
          }
        `}
      >
        {/* =================================================
            LOGO CASTRO FALLAS
        ================================================= */}

        <div
          className="
            mb-5 flex
            items-center justify-center
            border-b
            border-[rgba(248,1,1,0.83)]
            pb-5
          "
        >
          <img
            src="/Logo, Castro Fallas.png"
            alt="Castro Fallas"
            className="block h-[100px] w-40 object-contain"
          />
        </div>

        {/* =================================================
            SERVICIOS
        ================================================= */}

        <button
          type="button"
          onClick={() => opcionSinDestino("Servicios")}
          className="
            mb-1.5 flex w-full
            cursor-pointer items-center
            gap-[15px]
            rounded-[13px]
            border-none bg-transparent
            p-3.5
            text-left text-base text-black
            transition-colors duration-200
            hover:bg-black/5
          "
        >
          <span className="w-[25px] text-[19px]">⚙</span>

          <span>Servicios</span>
        </button>

        {/* =================================================
            NOSOTROS
        ================================================= */}

        <button
          type="button"
          onClick={() => opcionSinDestino("Nosotros")}
          className="
            mb-1.5 flex w-full
            cursor-pointer items-center
            gap-[15px]
            rounded-[13px]
            border-none bg-transparent
            p-3.5
            text-left text-base text-black
            transition-colors duration-200
            hover:bg-black/5
          "
        >
          <span className="w-[25px] text-[19px]">◉</span>

          <span>Nosotros</span>
        </button>

        {/* =================================================
            IMPACTO INDUSTRIAL
        ================================================= */}

        <button
          type="button"
          onClick={() => opcionSinDestino("Impacto industrial")}
          className="
            mb-1.5 flex w-full
            cursor-pointer items-center
            gap-[15px]
            rounded-[13px]
            border-none bg-transparent
            p-3.5
            text-left text-base text-black
            transition-colors duration-200
            hover:bg-black/5
          "
        >
          <span className="w-[25px] text-[19px]">▦</span>

          <span>Impacto industrial</span>
        </button>

        {/* =================================================
            CONTACTO
        ================================================= */}

        <button
          type="button"
          onClick={() => opcionSinDestino("Contacto")}
          className="
            mb-1.5 flex w-full
            cursor-pointer items-center
            gap-[15px]
            rounded-[13px]
            border-none bg-transparent
            p-3.5
            text-left text-base text-black
            transition-colors duration-200
            hover:bg-black/5
          "
        >
          <span className="w-[25px] text-[19px]">✉</span>

          <span>Contacto</span>
        </button>

        {/* =================================================
            BLOG
        ================================================= */}

        <button
          type="button"
          onClick={() => opcionSinDestino("Blog")}
          className="
            mb-1.5 flex w-full
            cursor-pointer items-center
            gap-[15px]
            rounded-[13px]
            border-none bg-transparent
            p-3.5
            text-left text-base text-black
            transition-colors duration-200
            hover:bg-black/5
          "
        >
          <span className="w-[25px] text-[19px]">▤</span>

          <span>Blog</span>
        </button>

        {/* =================================================
            SEPARADOR
        ================================================= */}

        <div className="my-3 h-px w-full bg-[rgba(248,1,1,0.83)]" />

        {/* =================================================
            INICIO DE SESIÓN ADMINISTRATIVOS
        ================================================= */}

        <button
          type="button"
          onClick={() => opcionSinDestino("Inicio de sesión administrativos")}
          className="
            mb-1.5 flex w-full
            cursor-pointer items-center
            gap-[15px]
            rounded-[13px]
            border-none bg-transparent
            p-3.5
            text-left text-base text-black
            transition-colors duration-200
            hover:bg-black/5
          "
        >
          <span className="w-[25px] text-xl">→</span>

          <span>Inicio de sesión administrativos</span>
        </button>
      </aside>
    </>
  );
}

export default Apps;
