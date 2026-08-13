function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-100 text-black">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

        <div className="text-center sm:text-left">
          <h2 className="font-bold text-xl">
            Castro Fallas
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            © {year} Grupo Castro Fallas
          </p>

          <a
            href="https://customcodecr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Desarrollado por CustomCodeCR
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://es-la.facebook.com/grupocastrofallas1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            Facebook
          </a>

          <a
            href="https://twitter.com/castrofagrupo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            X
          </a>

          <a
            href="https://www.instagram.com/grupocastrofallas1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/company/grupo-castro-fallas/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer