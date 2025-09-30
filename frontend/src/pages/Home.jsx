import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="main-content">
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
        color: 'white', 
        padding: '120px 0 80px',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
              {t('welcome')} до CosmeticLab
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: '0.9' }}>
              Професійні косметологічні препарати нового покоління
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)' }}>
                {t('view_products')}
                <span>→</span>
              </Link>
              <Link to="/contact" className="btn" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)' }}>
                {t('get_consultation')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              {t('why_choose_us')}
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Ми поєднуємо передові технології з доведеною ефективністю
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { icon: '🔬', title: t('scientific_approach'), text: 'Формули, розроблені на основі клінічних досліджень' },
              { icon: '🏭', title: t('own_production'), text: 'Контроль якості на всіх етапах виробництва' },
              { icon: '📊', title: t('proven_effectiveness'), text: 'Результати, підтверджені клінічними випробуваннями' },
              { icon: '🎓', title: t('professional_support'), text: 'Навчання та консультації для косметологів' },
              { icon: '🚚', title: t('fast_delivery'), text: 'Доставка по всій Україні протягом 1-2 днів' },
              { icon: '💎', title: t('premium_quality'), text: 'Використання сертифікованих сировинних компонентів' }
            ].map((item, index) => (
              <div key={index} className="card" style={{ textAlign: 'center', padding: '40px 30px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-light)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--accent)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
              {t('ready_to_cooperate')}
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
              Зв'яжіться з нами для отримання професійної консультації
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">
                {t('contact_with_us')}
              </Link>
              <Link to="/products" className="btn" style={{ background: 'transparent', color: 'var(--primary)', border: '2px solid var(--primary)' }}>
                {t('view_catalog')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home