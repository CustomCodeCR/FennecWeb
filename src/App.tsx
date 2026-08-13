// Importa la página principal
import HomePage from './pages/home/HomePage'
import Apps from './Navbar'

// Componente principal de la aplicación
function App () {
  return (    
    <>
      <Apps/>
      <HomePage />
    </>
  );
}

// Exporta App para usarlo desde main.tsx
export default App