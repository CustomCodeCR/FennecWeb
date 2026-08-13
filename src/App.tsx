import ContactForm from './Complements/Contact/ContactForm'
import Footer from './components/footer/Footer'
import HomePage from './pages/home/HomePage'

// Componente principal de la aplicación
function App() {
  return (
    <>
      <HomePage />
      <ContactForm />
      <Footer />
    </>
  )
}

// Exporta App para usarlo desde main.tsx
export default App