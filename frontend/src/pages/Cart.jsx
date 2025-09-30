import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { t } = useTranslation()
  const [cartItems, setCartItems] = useState([])

  // Mock данные корзины
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name_uk: "Ретінол Complex 1%",
        name_ru: "Ретинол Complex 1%",
        price: 1800,
        quantity: 1,
        volume: "30 мл",
        image: "⚗️"
      },
      {
        id: 2,
        name_uk: "Гіалуронова Кислота Pro",
        name_ru: "Гиалуроновая Кислота Pro",
        price: 1500,
        quantity: 2,
        volume: "50 мл",
        image: "💧"
      },
      {
        id: 3,
        name_uk: "Вітамін С 20% + Ферулова Кислота",
        name_ru: "Витамин С 20% + Феруловая Кислота",
        price: 1600,
        quantity: 1,
        volume: "30 мл",
        image: "✨"
      }
    ]
    setCartItems(mockCartItems)
  }, [])

  const getName = (item) => {
    const language = localStorage.getItem('i18nextLng') || 'uk'
    return language === 'uk' ? item.name_uk : item.name_ru
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotal = () => {
    const subtotal = getSubtotal()
    const delivery = subtotal > 0 ? 150 : 0
    return subtotal + delivery
  }

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Кошик порожній!')
      return
    }
    alert('Переходимо до оформлення замовлення...')
  }

  const continueShopping = () => {
    window.history.back()
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
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem', 
              fontWeight: '700' 
            }}>
              🛒 Кошик
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: '0.9'
            }}>
              {cartItems.length > 0 
                ? `У вашому кошику ${cartItems.length} товар(ів)` 
                : 'Ваш кошик порожній'
              }
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'var(--accent)' }}>
        <div className="container">
          {cartItems.length === 0 ? (
            // Пустая корзина
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: 'var(--shadow)'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '30px' }}>🛒</div>
              <h2 style={{ 
                fontSize: '2rem', 
                marginBottom: '1rem',
                color: 'var(--text)'
              }}>
                Кошик порожній
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                marginBottom: '2.5rem',
                color: 'var(--text-light)',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                Додайте товари до кошика, щоб зробити замовлення
              </p>
              <Link to="/products" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
                🧪 Перейти до препаратів
              </Link>
            </div>
          ) : (
            // Корзина с товарами
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr', 
              gap: '40px',
              alignItems: 'start'
            }}>
              {/* Список товаров */}
              <div>
                <div style={{ 
                  background: 'white', 
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: 'var(--shadow)',
                  marginBottom: '30px'
                }}>
                  <h2 style={{ 
                    marginBottom: '25px',
                    fontSize: '1.5rem',
                    color: 'var(--text)'
                  }}>
                    Товари в кошику ({cartItems.length})
                  </h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {cartItems.map(item => (
                      <div key={item.id} style={{
                        display: 'flex',
                        gap: '20px',
                        padding: '25px',
                        background: 'var(--accent)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = 'var(--shadow)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}>
                        {/* Изображение товара */}
                        <div style={{
                          width: '80px',
                          height: '80px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          color: 'white',
                          flexShrink: 0
                        }}>
                          {item.image}
                        </div>

                        {/* Информация о товаре */}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ 
                            marginBottom: '8px',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: 'var(--text)'
                          }}>
                            {getName(item)}
                          </h3>
                          <p style={{ 
                            color: 'var(--text-light)',
                            marginBottom: '12px',
                            fontSize: '0.9rem'
                          }}>
                            Об'єм: {item.volume}
                          </p>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center'
                          }}>
                            <div style={{ 
                              fontSize: '1.3rem', 
                              fontWeight: 'bold', 
                              color: 'var(--primary)'
                            }}>
                              {item.price} ₴
                            </div>
                            
                            {/* Управление количеством */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                background: 'white',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)'
                              }}>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    border: 'none',
                                    background: 'var(--accent)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseOver={(e) => e.target.style.background = 'var(--primary)'}
                                  onMouseOut={(e) => e.target.style.background = 'var(--accent)'}
                                >
                                  -
                                </button>
                                <span style={{ 
                                  fontSize: '1.1rem', 
                                  fontWeight: '600',
                                  minWidth: '30px',
                                  textAlign: 'center'
                                }}>
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    border: 'none',
                                    background: 'var(--accent)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseOver={(e) => e.target.style.background = 'var(--primary)'}
                                  onMouseOut={(e) => e.target.style.background = 'var(--accent)'}
                                >
                                  +
                                </button>
                              </div>
                              
                              {/* Кнопка удаления */}
                              <button 
                                onClick={() => removeItem(item.id)}
                                style={{
                                  padding: '10px 16px',
                                  background: 'transparent',
                                  color: '#e53e3e',
                                  border: '2px solid #e53e3e',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                  fontSize: '14px',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.background = '#e53e3e'
                                  e.target.style.color = 'white'
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.background = 'transparent'
                                  e.target.style.color = '#e53e3e'
                                }}
                              >
                                Видалити
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопка продолжить покупки */}
                <button 
                  onClick={continueShopping}
                  className="btn"
                  style={{
                    background: 'transparent',
                    color: 'var(--primary)',
                    border: '2px solid var(--primary)',
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '15px'
                  }}
                >
                  ← Продовжити покупки
                </button>
              </div>

              {/* Боковая панель заказа */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: 'var(--shadow)',
                position: 'sticky',
                top: '100px'
              }}>
                <h2 style={{ 
                  marginBottom: '25px',
                  fontSize: '1.5rem',
                  color: 'var(--text)'
                }}>
                  Оформлення замовлення
                </h2>

                <div style={{ marginBottom: '25px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '15px',
                    fontSize: '1.1rem'
                  }}>
                    <span>Проміжний підсумок:</span>
                    <span style={{ fontWeight: '600' }}>{getSubtotal()} ₴</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '15px',
                    fontSize: '1.1rem'
                  }}>
                    <span>Доставка:</span>
                    <span style={{ fontWeight: '600' }}>{getSubtotal() > 0 ? '150 ₴' : '0 ₴'}</span>
                  </div>

                  <div style={{ 
                    height: '1px', 
                    background: 'var(--border)', 
                    margin: '20px 0' 
                  }}></div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--text)'
                  }}>
                    <span>Загалом:</span>
                    <span style={{ color: 'var(--primary)' }}>{getTotal()} ₴</span>
                  </div>
                </div>

                <button 
                  onClick={proceedToCheckout}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '18px',
                    marginBottom: '15px',
                    fontWeight: '600'
                  }}
                >
                  🚀 Перейти до оплати
                </button>

                <p style={{ 
                  textAlign: 'center',
                  color: 'var(--text-light)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  ⚡ Швидка доставка по всій Україні<br />
                  🔒 Безпечна оплата онлайн<br />
                  📞 Підтримка 24/7
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Cart