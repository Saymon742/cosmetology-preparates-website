import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const { t } = useTranslation()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cosmeticlab_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(Array.isArray(parsedCart) ? parsedCart : [])
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
        setCartItems([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cosmeticlab_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const getName = (item) => {
    const language = localStorage.getItem('i18nextLng') || 'uk'
    return language === 'uk' ? item.name_uk : item.name_ru
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }
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

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section className="cart-hero">
        <div className="container">
          <div>
            <h1>🛒 Кошик</h1>
            <p>
              {cartItems.length > 0 
                ? `У вашому кошику ${cartItems.length} товар(ів)` 
                : 'Ваш кошик порожній'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="cart-content">
        <div className="container">
          {cartItems.length === 0 ? (
            // Пустая корзина
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Кошик порожній</h2>
              <p>Додайте товари до кошика, щоб зробити замовлення</p>
              <Link to="/products" className="btn btn-primary">
                🧪 Перейти до препаратів
              </Link>
            </div>
          ) : (
            // Корзина с товарами
            <div className="cart-grid">
              {/* Список товаров */}
              <div>
                <div className="cart-items">
                  <h2>Товари в кошику ({cartItems.length})</h2>
                  
                  <div>
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item">
                        {/* Изображение товара */}
                        <div className="cart-item-image">
                          {item.image || '⚗️'}
                        </div>

                        {/* Информация о товаре */}
                        <div className="cart-item-info">
                          <h3 className="cart-item-name">
                            {getName(item)}
                          </h3>
                          <p className="cart-item-volume">
                            Об'єм: {item.volume}
                          </p>
                          <div className="cart-item-controls">
                            <div className="cart-item-price">
                              {item.price} ₴
                            </div>
                            
                            {/* Управление количеством */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="quantity-controls">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="quantity-btn"
                                >
                                  -
                                </button>
                                <span className="quantity-display">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="quantity-btn"
                                >
                                  +
                                </button>
                              </div>
                              
                              {/* Кнопка удаления */}
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="remove-btn"
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
                  className="btn continue-shopping-btn"
                >
                  ← Продовжити покупки
                </button>
              </div>

              {/* Боковая панель заказа */}
              <div className="order-summary">
                <h2>Оформлення замовлення</h2>

                <div>
                  <div className="summary-row">
                    <span>Проміжний підсумок:</span>
                    <span style={{ fontWeight: '600' }}>{getSubtotal()} ₴</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Доставка:</span>
                    <span style={{ fontWeight: '600' }}>{getSubtotal() > 0 ? '150 ₴' : '0 ₴'}</span>
                  </div>

                  <div style={{ 
                    height: '1px', 
                    background: 'var(--border)', 
                    margin: '20px 0' 
                  }}></div>

                  <div className="summary-total">
                    <span>Загалом:</span>
                    <span className="summary-total-amount">{getTotal()} ₴</span>
                  </div>
                </div>

                <button 
                  onClick={proceedToCheckout}
                  className="btn btn-primary checkout-btn"
                >
                  🚀 Перейти до оплати
                </button>

                <p className="order-features">
                  ⚡ Швидка доставка по всій Україні<br />
                  🔒 Безпечна оплата онлайн<br />
                  📞 Підтримка 24/7
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {cartItems.length > 0 && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Потрібна допомога з вибором?</h2>
              <p>
                Наші косметологи допоможуть підібрати оптимальні препарати 
                для ваших потреб та відповість на всі запитання
              </p>
              <div className="cta-buttons">
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
      )}
    </div>
  )
}

export default Cart