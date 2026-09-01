import { useEffect, useState } from 'react'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`group fixed bottom-4 right-4 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e21c21] to-[#b5090d] p-0 text-white shadow-[0_8px_24px_rgba(0,0,0,0.20),0_3px_10px_rgba(226,28,33,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_12px_28px_rgba(0,0,0,0.25),0_5px_14px_rgba(226,28,33,0.35)] active:-translate-y-px active:scale-[0.94] sm:bottom-6 sm:right-6 sm:h-[52px] sm:w-[52px] ${visible ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible translate-y-5 scale-[0.85] opacity-0'}`}
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      type="button"
    >
      <span className="flex h-full w-full -translate-y-px items-center justify-center text-[27px] font-light leading-none transition-transform duration-300 group-hover:-translate-y-1">↑</span>
    </button>
  )
}

export default ScrollTopButton
