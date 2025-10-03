import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name_uk: '',
    name_ru: '',
    description_uk: '',
    description_ru: '',
    price: '',
    category: '',
    volume: '',
    concentration: '',
    in_stock: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/admin/products/', newProduct, {
        headers: {
          'Authorization': 'Bearer admin-token'
        }
      });
      alert('Product added successfully!');
      setNewProduct({
        name_uk: '',
        name_ru: '',
        description_uk: '',
        description_ru: '',
        price: '',
        category: '',
        volume: '',
        concentration: '',
        in_stock: true
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/admin/products/${editingProduct.id}`, editingProduct, {
        headers: {
          'Authorization': 'Bearer admin-token'
        }
      });
      alert('Product updated successfully!');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8000/admin/products/${productId}`, {
          headers: {
            'Authorization': 'Bearer admin-token'
          }
        });
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const startEdit = (product) => {
    setEditingProduct({...product});
    setActiveTab('edit-product');
  };

  const calculateStats = () => {
    return {
      totalProducts: products.length,
      totalValue: products.reduce((sum, product) => sum + product.price, 0),
      inStock: products.filter(p => p.in_stock).length
    };
  };

  const stats = calculateStats();

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>⚗️ CosmeticLab</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🧪 Products
          </button>
          <button 
            className={`nav-item ${activeTab === 'add-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-product')}
          >
            ➕ Add Product
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h1>Admin Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🧪</div>
                <div className="stat-info">
                  <h3>Total Products</h3>
                  <span className="stat-number">{stats.totalProducts}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Total Value</h3>
                  <span className="stat-number">{stats.totalValue} ₴</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>In Stock</h3>
                  <span className="stat-number">{stats.inStock}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Active Users</h3>
                  <span className="stat-number">89</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-tab">
            <h1>Product Management</h1>
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name_uk}</td>
                      <td>{product.category}</td>
                      <td>{product.price} ₴</td>
                      <td>
                        <span className={`stock-status ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => startEdit(product)} className="btn-edit">✏️ Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="btn-delete">🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'add-product' && (
          <div className="add-product-tab">
            <h1>Add New Product</h1>
            <form onSubmit={handleAddProduct} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name (Ukrainian)</label>
                  <input
                    type="text"
                    value={newProduct.name_uk}
                    onChange={(e) => setNewProduct({...newProduct, name_uk: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Name (Russian)</label>
                  <input
                    type="text"
                    value={newProduct.name_ru}
                    onChange={(e) => setNewProduct({...newProduct, name_ru: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Description (Ukrainian)</label>
                  <textarea
                    value={newProduct.description_uk}
                    onChange={(e) => setNewProduct({...newProduct, description_uk: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description (Russian)</label>
                  <textarea
                    value={newProduct.description_ru}
                    onChange={(e) => setNewProduct({...newProduct, description_ru: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₴)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="anti-aging">Anti-Aging</option>
                    <option value="hydration">Hydration</option>
                    <option value="brightening">Brightening</option>
                    <option value="lifting">Lifting</option>
                    <option value="problem-skin">Problem Skin</option>
                    <option value="repair">Repair</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Volume</label>
                  <input
                    type="text"
                    value={newProduct.volume}
                    onChange={(e) => setNewProduct({...newProduct, volume: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Concentration</label>
                  <input
                    type="text"
                    value={newProduct.concentration}
                    onChange={(e) => setNewProduct({...newProduct, concentration: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newProduct.in_stock}
                    onChange={(e) => setNewProduct({...newProduct, in_stock: e.target.checked})}
                  />
                  In Stock
                </label>
              </div>

              <button type="submit" className="btn-submit">Add Product</button>
            </form>
          </div>
        )}

        {activeTab === 'edit-product' && editingProduct && (
          <div className="add-product-tab">
            <h1>Edit Product</h1>
            <form onSubmit={handleEditProduct} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name (Ukrainian)</label>
                  <input
                    type="text"
                    value={editingProduct.name_uk}
                    onChange={(e) => setEditingProduct({...editingProduct, name_uk: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Name (Russian)</label>
                  <input
                    type="text"
                    value={editingProduct.name_ru}
                    onChange={(e) => setEditingProduct({...editingProduct, name_ru: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Description (Ukrainian)</label>
                  <textarea
                    value={editingProduct.description_uk}
                    onChange={(e) => setEditingProduct({...editingProduct, description_uk: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description (Russian)</label>
                  <textarea
                    value={editingProduct.description_ru}
                    onChange={(e) => setEditingProduct({...editingProduct, description_ru: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₴)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    required
                  >
                    <option value="anti-aging">Anti-Aging</option>
                    <option value="hydration">Hydration</option>
                    <option value="brightening">Brightening</option>
                    <option value="lifting">Lifting</option>
                    <option value="problem-skin">Problem Skin</option>
                    <option value="repair">Repair</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Volume</label>
                  <input
                    type="text"
                    value={editingProduct.volume}
                    onChange={(e) => setEditingProduct({...editingProduct, volume: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Concentration</label>
                  <input
                    type="text"
                    value={editingProduct.concentration}
                    onChange={(e) => setEditingProduct({...editingProduct, concentration: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProduct.in_stock}
                    onChange={(e) => setEditingProduct({...editingProduct, in_stock: e.target.checked})}
                  />
                  In Stock
                </label>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-submit">Update Product</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-tab">
            <h1>Order Management</h1>
            <div className="orders-list">
              <p>Orders management coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;