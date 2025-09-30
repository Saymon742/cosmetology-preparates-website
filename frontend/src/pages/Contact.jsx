import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h1>{t('contact_us')}</h1>
            <p>
              Маєте запитання щодо наших препаратів або хочете розпочати співпрацю? 
              Наша команда фахівців готова допомогти вам.
            </p>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <div>Телефон</div>
                <div>+38 (067) 123-45-67</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <div>Email</div>
                <div>info@cosmeticlab.ua</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <div>Адреса</div>
                <div>м. Київ, вул. Примерна, 123</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div className="contact-details">
                <div>Графік роботи</div>
                <div>Пн-Пт: 9:00-18:00</div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>{t('write_to_us')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t('name')} *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('phone')} *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('email')} *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">{t('message')} *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="form-textarea"></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact