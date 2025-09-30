import React, { useState } from 'react'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Панель адміністратора</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            backgroundColor: activeTab === 'products' ? '#667eea' : '#e9ecef',
            color: activeTab === 'products' ? 'white' : '#333',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Товари
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            backgroundColor: activeTab === 'orders' ? '#667eea' : '#e9ecef',
            color: activeTab === 'orders' ? 'white' : '#333',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Замовлення
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: activeTab === 'users' ? '#667eea' : '#e9ecef',
            color: activeTab === 'users' ? 'white' : '#333',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Користувачі
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <h2>Управління товарами</h2>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
            Додати товар
          </button>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <p>Список товарів буде тут...</p>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2>Управління замовленнями</h2>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <p>Список замовлень буде тут...</p>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2>Управління користувачами</h2>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <p>Список користувачів буде тут...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin