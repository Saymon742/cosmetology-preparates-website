import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const Products = () => {
  const { t, i18n } = useTranslation()
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Mock данные
      setProducts([
        {
          id: 1,
          name_uk: "Ретінол Complex 1%",
          name_ru: "Ретинол Complex 1%",
          description_uk: "Потужна антивікова формула зі стабілізованим ретинолом для професійного використання",
          description_ru: "Мощная антивозрастная формула со стабилизированным ретинолом для профессионального использования",
          price: 1800,
          category: "anti-aging",
          image_url: "/api/placeholder/300/200",
          volume: "30 мл",
          concentration: "1%"
        },
        {
          id: 2,
          name_uk: "Гіалуронова Кислота Pro",
          name_ru: "Гиалуроновая Кислота Pro",
          description_uk: "Глибоке зволоження з різномолекулярною гіалуроновою кислотою для відновлення шкіри",
          description_ru: "Глубокое увлажнение с разномолекулярной гиалуроновой кислотой для восстановления кожи",
          price: 1500,
          category: "hydration",
          image_url: "/api/placeholder/300/200",
          volume: "50 мл",
          concentration: "Multi-Molecular"
        },
        {
          id: 3,
          name_uk: "Вітамін С 20% + Ферулова Кислота",
          name_ru: "Витамин С 20% + Феруловая Кислота",
          description_uk: "Потужний антиоксидант для освітлення та захисту від вільних радикалів",
          description_ru: "Мощный антиоксидант для осветления и защиты от свободных радикалов",
          price: 1600,
          category: "brightening",
          image_url: "/api/placeholder/300/200",
          volume: "30 мл",
          concentration: "20%"
        },
        {
          id: 4,
          name_uk: "Пептидний Комплекс",
          name_ru: "Пептидный Комплекс",
          description_uk: "Інноваційна формула з пептидами для підтягування та поліпшення тургору шкіри",
          description_ru: "Инновационная формула с пептидами для подтяжки и улучшения тургора кожи",
          price: 2000,
          category: "lifting",
          image_url: "/api/placeholder/300/200",
          volume: "30 мл",
          concentration: "Multi-Peptide"
        },
        {
          id: 5,
          name_uk: "Ніацинамід 10%",
          name_ru: "Ниацинамид 10%",
          description_uk: "Стабілізація роботи сальних залоз та зменшення видимості пор",
          description_ru: "Стабилизация работы сальных желез и уменьшение видимости пор",
          price: 1400,
          category: "problem-skin",
          image_url: "/api/placeholder/300/200",
          volume: "50 мл",
          concentration: "10%"
        },
        {
          id: 6,
          name_uk: "Церамідний Відновлювач",
          name_ru: "Церамидный Восстановитель",
          description_uk: "Інтенсивне відновлення ліпідного бар'єру шкіри з церамідами",
          description_ru: "Интенсивное восстановление липидного барьера кожи с церамидами",
          price: 1700,
          category: "repair",
          image_url: "/api/placeholder/300/200",
          volume: "50 мл",
          concentration: "5% Ceramides"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { key: 'all', label_uk: 'Всі препарати', label_ru: 'Все препараты', icon: '🧪' },
    { key: 'anti-aging', label_uk: 'Антивік', label_ru: 'Анти-эйдж', icon: '⚡' },
    { key: 'hydration', label_uk: 'Зволоження', label_ru: 'Увлажнение', icon: '💧' },
    { key: 'brightening', label_uk: 'Освітлення', label_ru: 'Осветление', icon: '✨' },
    { key: 'lifting', label_uk: 'Підтягування', label_ru: 'Лифтинг', icon: '🔼' },
    { key: 'problem-skin', label_uk: 'Проблемна шкіра', label_ru: 'Проблемная кожа', icon: '🎯' },
    { key: 'repair', label_uk: 'Відновлення', label_ru: 'Восстановление', icon: '🛡️' }
  ]

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter)

  const getName = (product) => i18n.language === 'uk' ? product.name_uk : product.name_ru
  const getDescription = (product) => i18n.language === 'uk' ? product.description_uk : product.description_ru
  const getCategoryLabel = (category) => i18n.language === 'uk' ? category.label_uk : category.label_ru

const addToCart = (product) => {
  const savedCart = localStorage.getItem('cosmeticlab_cart')
  let cart = savedCart ? JSON.parse(savedCart) : []
  
  const existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    cart = cart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  } else {
    cart.push({
      id: product.id,
      name_uk: product.name_uk,
      name_ru: product.name_ru,
      price: product.price,
      quantity: 1,
      volume: product.volume,
      image: '⚗️'
    })
  }
  
  localStorage.setItem('cosmeticlab_cart', JSON.stringify(cart))
  alert(`${getName(product)} додано до кошика!`)
}

<button 
  onClick={() => addToCart(product)}
  className="btn btn-primary"
  style={{
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '600'
  }}
>
  🛒 {t('add_to_cart')}
</button>
  if (loading) {
    return (
      <div className="main-content" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚗️</div>
          <h2>Завантаження препаратів...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
        color: 'white', 
        padding: '80px 0 60px'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem', 
              fontWeight: '700' 
            }}>
              {t('products')}
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: '0.9',
              lineHeight: '1.6'
            }}>
              Професійні косметологічні препарати для досконалих результатів
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section style={{ padding: '40px 0', background: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {categories.map((category) => (
              <button 
                key={category.key}
                onClick={() => setFilter(category.key)}
                style={{
                  padding: '16px 24px',
                  border: 'none',
                  borderRadius: '12px',
                  backgroundColor: filter === category.key ? 'var(--primary)' : 'white',
                  color: filter === category.key ? 'white' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow)',
                  // border: filter === category.key ? '2px solid var(--primary)' : '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  if (filter !== category.key) {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = 'var(--shadow-lg)'
                  }
                }}
                onMouseOut={(e) => {
                  if (filter !== category.key) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'var(--shadow)'
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '40px',
            marginBottom: '40px'
          }}>
            {filteredProducts.map(product => (
              <div key={product.id} className="card" style={{
                padding: '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '1px solid var(--border)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow)'
              }}>
                {/* Product Image */}
                <div style={{
                  width: '100%',
                  height: '220px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  color: 'white'
                }}>
                  ⚗️
                </div>

                {/* Product Info */}
                <div style={{ padding: '30px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '15px'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      color: 'var(--text)',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      {getName(product)}
                    </h3>
                    <div style={{
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {product.volume}
                    </div>
                  </div>

                  <p style={{ 
                    color: 'var(--text-light)', 
                    marginBottom: '20px', 
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {getDescription(product)}
                  </p>

                  {/* Product Specs */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    marginBottom: '25px',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{ 
                      background: 'var(--accent)', 
                      padding: '8px 12px', 
                      borderRadius: '6px',
                      color: 'var(--text-light)'
                    }}>
                      <strong>Концентрація:</strong> {product.concentration}
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid var(--border)',
                    paddingTop: '20px'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 'bold', 
                        color: 'var(--primary)',
                        display: 'block'
                      }}>
                        {product.price} ₴
                      </span>
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-light)',
                        display: 'block',
                        marginTop: '4px'
                      }}>
                        за {product.volume.toLowerCase()}
                      </span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn btn-primary"
                      style={{
                        padding: '12px 24px',
                        fontSize: '15px',
                        fontWeight: '600'
                      }}
                    >
                      🛒 {t('add_to_cart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              color: 'var(--text-light)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ marginBottom: '10px' }}>Препарати не знайдено</h3>
              <p>Спробуйте змінити фільтр або звернутися до нашого менеджера</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: 'var(--accent)', 
        padding: '60px 0',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem' 
            }}>
              Потрібна професійна консультація?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              marginBottom: '2rem',
              color: 'var(--text-light)'
            }}>
              Наші спеціалісти допоможуть підібрати оптимальні препарати для ваших потреб
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+380671234567" className="btn btn-primary">
                📞 Зателефонувати
              </a>
              <a href="mailto:info@cosmeticlab.ua" className="btn" style={{
                background: 'transparent',
                color: 'var(--primary)',
                border: '2px solid var(--primary)'
              }}>
                ✉️ Написати
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products