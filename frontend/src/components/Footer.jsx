import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '2rem' }}>⚗️</span>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>CosmeticLab</h3>
            </div>
            <p>
              Професійні косметологічні препарати нового покоління. 
              Інноваційні рішення для сучасної косметології.
            </p>
            <div className="social-links">
              {['📘', '📷', '💼', '📹'].map((icon, index) => (
                <div key={index} className="social-link">{icon}</div>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h3>{t('products')}</h3>
            <div className="footer-links">
              <Link to="/products?category=anti-aging">{t('anti_aging_preparations')}</Link>
              <Link to="/products?category=hydration">{t('moisturizing_agents')}</Link>
              <Link to="/products?category=brightening">{t('brightening_serums')}</Link>
              <Link to="/products?category=repair">{t('recovery_complexes')}</Link>
              <Link to="/products">{t('all_preparations')}</Link>
            </div>
          </div>

          <div className="footer-section">
            <h3>{t('for_clients')}</h3>
            <div className="footer-links">
              <Link to="/about">{t('about_company')}</Link>
              <Link to="/contact">{t('contact')}</Link>
              <Link to="/delivery">{t('delivery_payment')}</Link>
              <Link to="/guarantee">{t('quality_guarantee')}</Link>
              <Link to="/cooperation">{t('cooperation_terms')}</Link>
            </div>
          </div>

          <div className="footer-section">
            <h3>{t('contact')}</h3>
            <div className="footer-contact">
              <div>📞 +38 (067) 123-45-67</div>
              <div>✉️ info@cosmeticlab.ua</div>
              <div>📍 м. Київ, вул. Примерна, 123</div>
              <div>🕒 Пн-Пт: 9:00-18:00</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 CosmeticLab. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer