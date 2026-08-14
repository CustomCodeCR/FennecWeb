
import { Route, Routes } from 'react-router-dom'

import Footer from './components/footer/Footer'
import HomePage from './pages/home/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'
import Apps from './Navbar'
import ContactForm from './components/contact/ContactForm'

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
      </Routes>

      <HomePage />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;

