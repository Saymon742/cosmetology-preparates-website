import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '100px 0', 
        textAlign: 'center',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {t('welcome')} до CosmeticPreparations
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Професійні косметологічні препарати для спеціалістів
        </p>
        <Link to="/products" style={{
          padding: '12px 24px',
          backgroundColor: 'white',
          color: '#667eea',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          {t('products')}
        </Link>
      </section>
    </div>
  )
}

export default Home