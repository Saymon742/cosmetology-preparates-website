import React from 'react'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{t('contact')}</h1>
      <div style={{ textAlign: 'center' }}>
        <p>Страница контактов в разработке</p>
      </div>
    </div>
  )
}

export default Contact