import logo from "../../assets/logo-castro-fallas.ico";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        backgroundColor: "#f3f4f6",
        color: "#000",
        marginTop: "0",
        marginBottom: "0",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          padding: "20px 16px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO PRINCIPAL */}
        <img
          src={logo}
          alt="Grupo Castro Fallas"
          style={{
            width: "75px",
            maxWidth: "75px",
            height: "auto",
            display: "block",
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />

        {/* COPYRIGHT */}
        <p
          style={{
            fontSize: "12px",
            margin: "0 0 5px 0",
            color: "#4b5563",
            textAlign: "center",
          }}
        >
          © {year} Grupo Castro Fallas
        </p>

        {/* DESARROLLADO POR */}
        <a
          href="https://customcodecr.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            color: "#2563eb",
            textAlign: "center",
            textDecoration: "none",
            marginBottom: "14px",
          }}
        >
          Desarrollado por CustomCodeCR
        </a>

        {/* LÍNEA SEPARADORA */}
        <div
          style={{
            width: "min(280px, 80%)",
            height: "1px",
            backgroundColor: "#d1d5db",
            marginBottom: "14px",
          }}
        />

        {/* REDES SOCIALES */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          {/* FACEBOOK */}
          <a
            href="https://es-la.facebook.com/grupocastrofallas1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1877F2",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1z" />
            </svg>
          </a>

          {/* X */}
          <a
            href="https://twitter.com/castrofagrupo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.8 2h6.4l4.4 5.8L18.9 2zm-1.1 17.7h1.7L8.3 4.2H6.5l11.3 15.5z" />
            </svg>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/grupocastrofallas1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/company/grupo-castro-fallas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0A66C2",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6.5 8H3V21H6.5V8ZM4.75 3C3.65 3 3 3.7 3 4.7S3.65 6.4 4.75 6.4 6.5 5.7 6.5 4.7 5.85 3 4.75 3ZM21 13.5C21 9.6 18.9 7.8 16 7.8C13.7 7.8 12.7 9.1 12.2 9.9V8H8.7V21H12.2V13.8C12.2 11.9 12.55 10.1 14.9 10.1C17.2 10.1 17.2 12.2 17.2 13.9V21H21V13.5Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;