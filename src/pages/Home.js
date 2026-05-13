import React, { useState } from 'react';

const Home = ({ products, addToCart, cartTotal, cartSum, setPage, openProduct }) => {
  const [activeCat, setActiveCat] = useState('Hammasi');
  const categories = ['Hammasi', ...new Set(products.map(p => p.category))];

  return (
    <div className="home-wrapper">
      {/* HEADER SECTION */}
      <header className="main-header">
        <div className="header-content">
          <div className="brand">
            <img src="https://i.ibb.co/qFpHKpgP/IMG-4525.jpg" alt="logo" className="brand-logo" />
            <div className="brand-info">
              <h1>Rahmat Chef</h1>
              <span>• SWEET PASTRY •</span>
            </div>
          </div>
          <button className="user-profile-btn" onClick={() => setPage('profile')}>👤</button>
        </div>
        
        {/* STICKY TABS */}
        <nav className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={activeCat === cat ? 'tab active' : 'tab'}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* PRODUCTS SECTION */}
      <main className="content-area">
        <div className="promo-banner">
          <div className="promo-text">
            <h2>Mazali lahzalar</h2>
            <p>Eng shirin pishiriqlar faqat siz uchun</p>
          </div>
          <span className="promo-icon">🥐</span>
        </div>

        <div className="product-listing">
          {products
            .filter(p => activeCat === 'Hammasi' || p.category === activeCat)
            .map(product => (
              <div key={product.id} className="modern-card" onClick={() => openProduct(product)}>
                <div className="card-media">
                  <img src={product.image} alt={product.name} />
                  <button 
                    className="quick-add" 
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  >+</button>
                </div>
                <div className="card-body">
                  <span className="price">{product.price.toLocaleString()} so'm</span>
                  <h3>{product.name}</h3>
                </div>
              </div>
          ))}
        </div>
      </main>

      {/* FLOATING ACTION BAR */}
      {cartTotal > 0 && (
        <div className="floating-cart-anchor">
          <button className="cart-bar-btn" onClick={() => setPage('cart')}>
            <div className="cart-left">
              <span className="count-badge">{cartTotal}</span>
              <span className="label">Savatchani ko'rish</span>
            </div>
            <span className="total-sum">{cartSum.toLocaleString()} so'm</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
