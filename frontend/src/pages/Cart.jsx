import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      // Получаем корзину
      const cartResponse = await axios.get('http://localhost:8000/cart/');
      const cartData = cartResponse.data;
      
      // Получаем все продукты для отображения информации
      const productsResponse = await axios.get('http://localhost:8000/products/');
      setProducts(productsResponse.data);
      
      // Сопоставляем товары в корзине с информацией о продуктах
      const itemsWithDetails = cartData.map(cartItem => {
        const product = productsResponse.data.find(p => p.id === cartItem.product_id);
        return {
          ...cartItem,
          product: product
        };
      });
      
      setCartItems(itemsWithDetails);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Для теста - демо данные
      setCartItems([
        {
          product_id: 1,
          quantity: 2,
          product: {
            id: 1,
            name_uk: "Ретінол Complex 1%",
            name_ru: "Ретинол Complex 1%",
            price: 1800,
            volume: "30 мл"
          }
        },
        {
          product_id: 2,
          quantity: 1,
          product: {
            id: 2,
            name_uk: "Гіалуронова Кислота",
            name_ru: "Гиалуроновая Кислота",
            price: 1500,
            volume: "50 мл"
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      // Временное решение - переотправляем товар с новым количеством
      await axios.post('http://localhost:8000/cart/add/', {
        product_id: productId,
        quantity: newQuantity
      });
      
      // Обновляем локальное состояние
      setCartItems(prev => prev.map(item => 
        item.product_id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Временное решение - устанавливаем количество 0
      await axios.post('http://localhost:8000/cart/add/', {
        product_id: productId,
        quantity: 0
      });
      
      // Удаляем из локального состояния
      setCartItems(prev => prev.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const getProductName = (product) => {
    return i18n.language === 'uk' ? product.name_uk : product.name_ru;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loading-icon">🛒</div>
        <h2>Завантаження корзини...</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="cart-hero">
        <div className="container">
          <div className="hero-content">
            <p>Ваші обрані препарати</p>
          </div>
        </div>
      </section>

      <section className="cart-content">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <h3>Корзина порожня</h3>
              <p>Додайте препарати з каталогу, щоб зробити замовлення</p>
              <a href="/products" className="btn btn-primary">
                Перейти до каталогу
              </a>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                <div className="cart-header">
                  <h2>Товари в корзині ({getTotalItems()})</h2>
                </div>
                
                {cartItems.map(item => (
                  <div key={item.product_id} className="cart-item">
                    <div className="item-image">
                      ⚗️
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-title">
                        {item.product ? getProductName(item.product) : `Товар #${item.product_id}`}
                      </h3>
                      <div className="item-volume">
                        {item.product?.volume}
                      </div>
                      <div className="item-price">
                        {item.product?.price} ₴
                      </div>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        {(item.product?.price || 0) * item.quantity} ₴
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.product_id)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-card">
                  <h3>Разом</h3>
                  
                  <div className="summary-row">
                    <span>Товари ({getTotalItems()})</span>
                    <span>{calculateTotal()} ₴</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Доставка</span>
                    <span className="free-shipping">Безкоштовно</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-total">
                    <span>До сплати:</span>
                    <span className="total-amount">{calculateTotal()} ₴</span>
                  </div>
                  
                  <button className="checkout-btn btn-primary">
                    Оформити замовлення
                  </button>
                  
                  <div className="shipping-info">
                    <p> Безкоштовна доставка по Україні</p>
                    <p> Термін виготовлення: 1-3 дні</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;