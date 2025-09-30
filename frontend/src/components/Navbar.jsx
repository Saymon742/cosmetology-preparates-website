import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <span>⚗️</span>
          </div>
          <div className="logo-text">
            <div>CosmeticLab</div>
            <div className="logo-subtitle">PROFESSIONAL SOLUTIONS</div>
          </div>
        </Link>
        
        <nav className="nav-menu">
          <Link 
            to="/products" 
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
          >
            🧪 {t('products')}
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            📞 {t('contact')}
          </Link>
          <Link 
            to="/cart" 
            className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
          >
            🛒 Кошик
          </Link>
          
          <div className="nav-divider"></div>
          
          <Link 
            to="/login" 
            className={`nav-link ${isActive('/login') ? 'active' : ''}`}
          >
            🔐 {t('login')}
          </Link>
          <Link 
            to="/register" 
            className={`nav-link ${isActive('/register') ? 'active' : ''}`}
          >
            📝 {t('register')}
          </Link>
          
          <button 
            onClick={() => changeLanguage(i18n.language === 'uk' ? 'ru' : 'uk')}
            className="language-switcher"
          >
            {i18n.language === 'uk' ? 'RU' : 'UA'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar