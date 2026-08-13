import { useState } from "react";

function Apps() {

  /* =====================================================
     ESTADOS
  ===================================================== */

  const [menuAbierto, setMenuAbierto] = useState(false);

  const [mostrarSistemasGCF, setMostrarSistemasGCF] = useState(false);


  /* =====================================================
     COLORES
     
     BLANCO = FONDO
     NEGRO = TEXTO
  ===================================================== */

  const colores = {
    
    negro: "#000000",
    gris: "#f5f5f5",
    borde: "rgba(248, 1, 1, 0.83)",
    sombra: "rgba(0, 0, 0, 0.18)",
  };

  /* =====================================================
     VOLVER
  ===================================================== */

  const volver = () => {

    setMostrarSistemasGCF(false);

    setMenuAbierto(false);

  };


  /* =====================================================
     OPCIONES QUE TODAVÍA NO LLEVAN A NINGÚN LUGAR
  ===================================================== */

  const opcionSinDestino = (nombre: string) => {

    console.log("Se presionó: " + nombre);

  };


  /* =====================================================
     
     apartado de funcionamiento de botones
     PERO TODAVIA NO LLEVAN A NINGUN LUGAR
  ===================================================== */

  const acceder = (sistema: string) => {

    console.log("Acceder: " + sistema);

  };


  /* =====================================================
     PANTALLA SISTEMAS DE GESTIÓN GCF
  ===================================================== */

  if (mostrarSistemasGCF) {

    return (

      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          
        }}
      >

        {/* =================================================
            IMAGEN EXACTA DE SISTEMAS GCF
        ================================================= */}

        <img
          src="/sistemas-gcf.png"
          alt="Sistemas de Gestión GCF"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
            userSelect: "none",
          }}
        />


        {/* =================================================
            BOTÓN VOLVER
        ================================================= */}

        <button
          onClick={volver}
          style={{
            position: "absolute",
            top: "27px",
            left: "36px",

            zIndex: 20,

            display: "flex",
            alignItems: "center",
            gap: "10px",

            padding: "5px 8px",

            border: "none",
            background: "transparent",

            color: colores.negro,

            fontSize: "20px",
            fontFamily: "Arial, Helvetica, sans-serif",

            cursor: "pointer",
          }}
        >

          <span
            style={{
              fontSize: "38px",
              lineHeight: "20px",
              fontWeight: "300",
            }}
          >
            ←
          </span>

          <span>
            Volver
          </span>

        </button>


        {/* =================================================
            GCF CRM
        ================================================= */}

        <button
          onClick={() => acceder("GCF CRM")}
          aria-label="Acceder a GCF CRM"
          style={{
            position: "absolute",

            left: "13.8%",
            top: "40.2%",

            width: "7%",
            height: "6.5%",

            zIndex: 15,

            border: "none",
            borderRadius: "8px",

            backgroundColor: "transparent",

            cursor: "pointer",
          }}
        />


        {/* =================================================
            GCF COMERCIAL
        ================================================= */}

        <button
          onClick={() => acceder("GCF Comercial")}
          aria-label="Acceder a GCF Comercial"
          style={{
            position: "absolute",

            left: "46%",
            top: "40.2%",

            width: "7%",
            height: "6.5%",

            zIndex: 15,

            border: "none",
            borderRadius: "8px",

            backgroundColor: "transparent",

            cursor: "pointer",
          }}
        />


        {/* =================================================
            GCF ADUANAS
        ================================================= */}

        <button
          onClick={() => acceder("GCF Aduanas")}
          aria-label="Acceder a GCF Aduanas"
          style={{
            position: "absolute",

            left: "79.2%",
            top: "40.2%",

            width: "7%",
            height: "6.5%",

            zIndex: 15,

            border: "none",
            borderRadius: "8px",

            backgroundColor: "transparent",

            cursor: "pointer",
          }}
        />


        {/* =================================================
            GCF PANAMÁ
        ================================================= */}

        <button
          onClick={() => acceder("GCF Panamá")}
          aria-label="Acceder a GCF Panamá"
          style={{
            position: "absolute",

            left: "13.8%",
            top: "75.5%",

            width: "7%",
            height: "6.5%",

            zIndex: 15,

            border: "none",
            borderRadius: "8px",

            backgroundColor: "transparent",

            cursor: "pointer",
          }}
        />


        {/* =================================================
            GCF AJUSTES
        ================================================= */}

        <button
          onClick={() => acceder("GCF Ajustes")}
          aria-label="Acceder a GCF Ajustes"
          style={{
            position: "absolute",

            left: "46%",
            top: "75.5%",

            width: "7%",
            height: "6.5%",

            zIndex: 15,

            border: "none",
            borderRadius: "8px",

            backgroundColor: "transparent",

            cursor: "pointer",
          }}
        />

      </div>

    );

  }


  /* =====================================================
     PÁGINA PRINCIPAL
  ===================================================== */

  return (

    <div
      style={{
        position: "relative",

        width: "100vw",
        height: "100vh",

        overflow: "hidden",

       

        color: colores.negro,

        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >


      {/* =================================================
          BOTÓN DE LA BARRA LATERAL
          
          SIEMPRE EN LA ESQUINA SUPERIOR IZQUIERDA
      ================================================= */}

      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
        style={{
          position: "fixed",

          top: "20px",
          left: "20px",

          width: "55px",
          height: "55px",

          zIndex: 100,

          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",

          gap: "6px",

          border: `1px solid ${colores.borde}`,

          borderRadius: "15px",

          backgroundColor: "rgba(255,255,255,0.90)",

          backdropFilter: "blur(15px)",

          WebkitBackdropFilter: "blur(15px)",

          boxShadow: `0 10px 30px ${colores.sombra}`,

          cursor: "pointer",

          transition: "all 0.3s ease",
        }}
      >

        <span
          style={{
            width: "25px",
            height: "2px",
            backgroundColor: colores.negro,
            transition: "all 0.3s ease",

            transform: menuAbierto
              ? "translateY(8px) rotate(45deg)"
              : "none",
          }}
        />

        <span
          style={{
            width: "25px",
            height: "2px",
            backgroundColor: colores.negro,
            transition: "all 0.3s ease",

            opacity: menuAbierto ? 0 : 1,
          }}
        />

        <span
          style={{
            width: "25px",
            height: "2px",
            backgroundColor: colores.negro,
            transition: "all 0.3s ease",

            transform: menuAbierto
              ? "translateY(-8px) rotate(-45deg)"
              : "none",
          }}
        />

      </button>



      {/* =================================================
          BARRA LATERAL
          
          SALE DESDE LA ESQUINA SUPERIOR IZQUIERDA
          Y BAJA AL ABRIRSE.
      ================================================= */}

      <aside
        style={{
          position: "fixed",

          top: "20px",
          left: "20px",

          width: "330px",

          maxHeight: "calc(100vh - 40px)",

          zIndex: 90,

          paddingTop: "90px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",

          border: `1px solid ${colores.borde}`,

          borderRadius: "25px",

          backgroundColor:
            "rgba(255, 255, 255, 0.88)",

          backdropFilter:
            "blur(25px)",

          WebkitBackdropFilter:
            "blur(25px)",

          boxShadow:
            `0 25px 60px ${colores.sombra}`,

          transform: menuAbierto
            ? "translateY(0)"
            : "translateY(-120%)",

          opacity: menuAbierto ? 1 : 0,

          pointerEvents:
            menuAbierto ? "auto" : "none",

          transition:
            "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",

          overflowY: "auto",
        }}
      >


        {/* =================================================
            LOGO CASTRO FALLAS
        ================================================= */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",

            paddingBottom: "20px",

            marginBottom: "20px",

            borderBottom:
              `1px solid ${colores.borde}`,
          }}
        >

          <img
            src="/Logo, Castro Fallas.png"
            alt="Castro Fallas"
            style={{
              width: "160px",
              height: "100px",
              display: "block",
            }}
          />

        </div>



        {/* =================================================
            SERVICIOS
        ================================================= */}

        <button
          onClick={() => opcionSinDestino("Servicios")}
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",

            gap: "15px",

            padding: "14px",

            marginBottom: "6px",

            border: "none",

            borderRadius: "13px",

            backgroundColor: "transparent",

            color: colores.negro,

            fontSize: "16px",

            textAlign: "left",

            cursor: "pointer",

            transition: "background 0.25s ease",
          }}
        >

          <span
            style={{
              width: "25px",
              fontSize: "19px",
            }}
          >
            ⚙
          </span>

          <span>
            Servicios
          </span>

        </button>



        {/* =================================================
            NOSOTROS
        ================================================= */}

        <button
          onClick={() => opcionSinDestino("Nosotros")}
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",

            gap: "15px",

            padding: "14px",

            marginBottom: "6px",

            border: "none",

            borderRadius: "13px",

            backgroundColor: "transparent",

            color: colores.negro,

            fontSize: "16px",

            textAlign: "left",

            cursor: "pointer",

            transition: "background 0.25s ease",
          }}
        >

          <span
            style={{
              width: "25px",
              fontSize: "19px",
            }}
          >
            ◉
          </span>

          <span>
            Nosotros
          </span>

        </button>



        {/* =================================================
            IMPACTO INDUSTRIAL
        ================================================= */}

        <button
          onClick={() =>
            opcionSinDestino("Impacto industrial")
          }
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",

            gap: "15px",

            padding: "14px",

            marginBottom: "6px",

            border: "none",

            borderRadius: "13px",

            backgroundColor: "transparent",

            color: colores.negro,

            fontSize: "16px",

            textAlign: "left",

            cursor: "pointer",

            transition: "background 0.25s ease",
          }}
        >

          <span
            style={{
              width: "25px",
              fontSize: "19px",
            }}
          >
            ▦
          </span>

          <span>
            Impacto industrial
          </span>

        </button>



        {/* =================================================
            CONTACTO
        ================================================= */}

        <button
          onClick={() => opcionSinDestino("Contacto")}
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",

            gap: "15px",

            padding: "14px",

            marginBottom: "6px",

            border: "none",

            borderRadius: "13px",

            backgroundColor: "transparent",

            color: colores.negro,

            fontSize: "16px",

            textAlign: "left",

            cursor: "pointer",

            transition: "background 0.25s ease",
          }}
        >

          <span
            style={{
              width: "25px",
              fontSize: "19px",
            }}
          >
            ✉
          </span>

          <span>
            Contacto
          </span>

        </button>



        {/* =================================================
            BLOG
        ================================================= */}

        <button
          onClick={() => opcionSinDestino("Blog")}
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",

            gap: "15px",

            padding: "14px",

            marginBottom: "6px",

            border: "none",

            borderRadius: "13px",

            backgroundColor: "transparent",

            color: colores.negro,

            fontSize: "16px",

            textAlign: "left",

            cursor: "pointer",

            transition: "background 0.25s ease",
          }}
        >

          <span
            style={{
              width: "25px",
              fontSize: "19px",
            }}
          >
            ▤
          </span>

          <span>
            Blog
          </span>

        </button>



        {/* =================================================
            SEPARADOR
        ================================================= */}

        <div
          style={{
            width: "100%",
            height: "1px",

            marginTop: "12px",
            marginBottom: "12px",

            backgroundColor:
              colores.borde,
          }}
        />

        {/* =================================================
            INICIO DE SESIÓN ADMINISTRATIVOS
        ================================================= */}

        <button
          onClick={() =>
            opcionSinDestino(
              "Inicio de sesión administrativos"
            )
          }
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",

            gap: "15px",

            padding: "14px",

            marginBottom: "6px",

            border: "none",

            borderRadius: "13px",

            backgroundColor: "transparent",

            color: colores.negro,

            fontSize: "16px",

            textAlign: "left",

            cursor: "pointer",

            transition: "background 0.25s ease",
          }}
        >

          <span
            style={{
              width: "25px",
              fontSize: "20px",
            }}
          >
            →
          </span>

          <span>
            Inicio de sesión administrativos
          </span>

        </button>


      </aside>

      <div
        style={{
          position: "absolute",

          inset: 0,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          
        }}
      >

        <h1
          style={{
            margin: 0,

            color: colores.negro,

            fontSize:
              "clamp(45px, 6vw, 80px)",

            fontWeight: 700,

            letterSpacing: "-3px",

            fontFamily:
              "Arial, Helvetica, sans-serif",
          }}
        >
        </h1>

      </div>


    </div>

  );
}

export default Apps;