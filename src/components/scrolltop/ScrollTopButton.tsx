import { useEffect, useState } from 'react'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`scroll-top-button ${
        visible ? 'scroll-top-visible' : ''
      }`}
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      type="button"
    >
<span className="scroll-top-icon">↑</span>
    </button>
  )
}

export default ScrollTopButton