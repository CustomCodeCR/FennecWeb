import { useEffect, useState } from 'react'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450)
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
      type="button"
      onClick={scrollToTop}
      className={`scroll-top-button ${
        visible ? 'scroll-top-visible' : ''
      }`}
      aria-label="Volver al inicio"
      title="Volver al inicio"
    >
      ↑
    </button>
  )
}

export default ScrollTopButton