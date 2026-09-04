import { Route, Routes } from 'react-router-dom'

import Footer from './components/footer/Footer'
import Seo from './components/Seo'
import HomePage from './pages/home/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'
import Apps from './Navbar'
import QuotePage from './pages/quote/QuotePage'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'

function App() {
  return (
    <div className="min-h-screen min-w-[320px] overflow-x-hidden bg-white font-sans text-[#111111] antialiased">
      <Apps />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/web-tracking" element={<TrackingPage />} />
        <Route path="/cotizacion" element={<QuotePage />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Seo />
      <Footer />
    </div>
  )
}

export default App
