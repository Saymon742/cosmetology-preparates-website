import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/i18n'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </I18nextProvider>
  )
}

export default App