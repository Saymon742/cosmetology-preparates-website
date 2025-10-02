import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
    setLoading(true);
    const response = await axios.get('http://localhost:8000/products/');
    setProducts(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    setProducts([
      {
        id: 1,
        name_uk: "Ретінол Complex 1%",
        name_ru: "Ретинол Complex 1%",
        description_uk: "Потужна антивікова формула",
        description_ru: "Мощная антивозрастная формула",
        price: 1800,
        category: "anti-aging",
        volume: "30 мл",
        concentration: "1%",
        in_stock: true
      },
      {
        id: 2,
        name_uk: "Гіалуронова Кислота",
        name_ru: "Гиалуроновая Кислота", 
        description_uk: "Глибоке зволоження",
        description_ru: "Глубокое увлажнение",
        price: 1500,
        category: "hydration",
        volume: "50 мл",
        concentration: "Multi-Molecular",
        in_stock: true
      }
    ]);
  } finally {
    setLoading(false);
  }
};

  const categories = [
    { key: 'all', label_uk: 'Всі препарати', label_ru: 'Все препараты', icon: '🧪' },
    { key: 'anti-aging', label_uk: 'Антивік', label_ru: 'Анти-эйдж', icon: '⚡' },
    { key: 'hydration', label_uk: 'Зволоження', label_ru: 'Увлажнение', icon: '💧' },
    { key: 'brightening', label_uk: 'Освітлення', label_ru: 'Осветление', icon: '✨' },
    { key: 'lifting', label_uk: 'Підтягування', label_ru: 'Лифтинг', icon: '🔼' },
    { key: 'problem-skin', label_uk: 'Проблемна шкіра', label_ru: 'Проблемная кожа', icon: '🎯' },
    { key: 'repair', label_uk: 'Відновлення', label_ru: 'Восстановление', icon: '🛡️' }
  ];

  const addToCart = async (product) => {
  try {
    const response = await axios.post('http://localhost:8000/cart/add/', {
      product_id: product.id,
      quantity: 1
    });

    alert(`${getName(product)} добавлено в корзину!`);
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Ошибка при добавлении в корзину');
  }
};

  const getName = (product) => i18n.language === 'uk' ? product.name_uk : product.name_ru;
  const getDescription = (product) => i18n.language === 'uk' ? product.description_uk : product.description_ru;
  const getCategoryLabel = (category) => i18n.language === 'uk' ? category.label_uk : category.label_ru;

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-icon">⚗️</div>
        <h2>Завантаження препаратів...</h2>
      </div>
    );
  }

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t('products')}</h1>
            <p>Професійні косметологічні препарати для досконалих результатів</p>
          </div>
        </div>
      </section>

      <section className="products-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button 
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`filter-btn ${filter === category.key ? 'active' : ''}`}
              >
                <span className="filter-icon">{category.icon}</span>
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-grid-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  ⚗️
                </div>

                <div className="product-content">
                  <div className="product-header">
                    <h3 className="product-title">
                      {getName(product)}
                    </h3>
                    <div className="product-volume">
                      {product.volume}
                    </div>
                  </div>

                  <p className="product-description">
                    {getDescription(product)}
                  </p>

                  <div className="product-specs">
                    <div className="spec-item">
                      <strong>Концентрація:</strong> {product.concentration}
                    </div>
                  </div>

                  <div className="product-footer">
                    <div className="product-price">
                      <span className="price-amount">{product.price} ₴</span>
                      <span className="price-volume">за {product.volume.toLowerCase()}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="add-to-cart-btn"
                    >
                      🛒 {t('add_to_cart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="products-empty">
              <div className="empty-icon">🔍</div>
              <h3>Препарати не знайдено</h3>
              <p>Спробуйте змінити фільтр або звернутися до нашого менеджера</p>
            </div>
          )}
        </div>
      </section>

      <section className="products-consultation">
        <div className="container">
          <div className="consultation-content">
            <h2>Потрібна професійна консультація?</h2>
            <p>Наші спеціалісти допоможуть підібрати оптимальні препарати для ваших потреб</p>
            <div className="consultation-buttons">
              <a href="tel:+380671234567" className="btn btn-primary">
                📞 Зателефонувати
              </a>
              <a href="mailto:info@cosmeticlab.ua" className="btn btn-outline">
                ✉️ Написати
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;