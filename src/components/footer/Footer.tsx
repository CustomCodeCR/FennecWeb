import logo from '../../assets/logo-castro-fallas.ico'

function Footer() {
  const year = new Date().getFullYear()
  const socialClass = 'flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#94191d] hover:shadow-sm'

  return (
    <footer className="mt-4 w-full max-w-full overflow-hidden border-t border-slate-200 bg-slate-100 text-black">
      <div className="flex w-full max-w-full flex-col items-center gap-1 p-3">
        <img
          src={logo}
          alt="Grupo Castro Fallas"
          className="block h-auto w-[60px] max-w-[60px] object-contain"
        />

        <p className="m-0 text-center text-[10px] text-slate-500">
          © {year} Grupo Castro Fallas
        </p>

        <a
          href="https://customcodecr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-[10px] text-blue-600 transition-colors hover:text-blue-700"
        >
          Desarrollado por CustomCodeCR
        </a>

        <div className="mt-1 flex items-center justify-center gap-2.5">
          <a href="https://es-la.facebook.com/grupocastrofallas1/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialClass}>
            <svg className="block h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1z" />
            </svg>
          </a>

          <a href="https://twitter.com/castrofagrupo" target="_blank" rel="noopener noreferrer" aria-label="X" className={socialClass}>
            <svg className="block h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.8 2h6.4l4.4 5.8L18.9 2zm-1.1 17.7h1.7L8.3 4.2H6.5l11.3 15.5z" />
            </svg>
          </a>

          <a href="https://www.instagram.com/grupocastrofallas1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialClass}>
            <svg className="block h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="20" x="2" y="2" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a href="https://www.linkedin.com/company/grupo-castro-fallas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
            <svg className="block h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.5 8H3V21H6.5V8ZM4.75 3C3.65 3 3 3.7 3 4.7S3.65 6.4 4.75 6.4 6.5 5.7 6.5 4.7 5.85 3 4.75 3ZM21 13.5C21 9.6 18.9 7.8 16 7.8C13.7 7.8 12.7 9.1 12.2 9.9V8H8.7V21H12.2V13.8C12.2 11.9 12.55 10.1 14.9 10.1C17.2 10.1 17.2 12.2 17.2 13.9V21H21V13.5Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
