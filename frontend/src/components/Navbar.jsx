import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 0',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
            CosmeticPreparations
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>{t('welcome')}</Link>
            <Link to="/products" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>{t('products')}</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>{t('contact')}</Link>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>{t('login')}</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>{t('register')}</Link>
            <button 
              onClick={() => changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')}
              style={{
                background: 'none',
                border: '1px solid white',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {i18n.language === 'uk' ? 'EN' : 'UK'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar