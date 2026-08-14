import { Route, Routes } from 'react-router-dom'

import Footer from './components/footer/Footer'
import HomePage from './pages/home/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'
import Apps from './Navbar'
import QuotePage from './pages/quote/QuotePage'
function App() {
  return (
    <>
      <Apps />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/web-tracking"
          element={<TrackingPage />}
        />
        <Route
           path="/cotizacion"
           element={<QuotePage />}
/>
      </Routes>
      

      <Footer />
    </>
  )
}

export default App