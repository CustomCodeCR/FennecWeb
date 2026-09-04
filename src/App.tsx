import { Route, Routes } from 'react-router-dom'

import Apps from './Navbar'
import Seo from './components/Seo'
import Footer from './components/footer/Footer'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'
import ArticlePage from './pages/articles/ArticlePage'
import ArticlesIndexPage from './pages/articles/ArticlesIndexPage'
import HomePage from './pages/home/HomePage'
import QuotePage from './pages/quote/QuotePage'
import ReviewsPage from './pages/reviews/ReviewsPage'
import ServicesPage from './pages/services/ServicesPage'
import TrackingPage from './pages/tracking/TrackingPage'

function App() {
  return (
    <div className="min-h-screen min-w-[320px] overflow-x-hidden bg-white font-sans text-[#111111] antialiased">
      <Apps />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/web-tracking" element={<TrackingPage />} />
        <Route path="/cotizacion" element={<QuotePage />} />
        <Route path="/servicios-logisticos" element={<ServicesPage />} />
        <Route path="/articulos" element={<ArticlesIndexPage />} />
        <Route path="/articulos/:slug" element={<ArticlePage />} />
        <Route path="/opiniones" element={<ReviewsPage />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Seo />
      <Footer />
    </div>
  )
}

export default App
