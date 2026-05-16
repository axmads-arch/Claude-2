import React, { useState } from 'react';

const LOGO = 'https://i.ibb.co/qFpHKpgP/IMG-4525.jpg';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img"></div>
      <div className="skeleton-line price"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  );
}

export default function Home({ products, banner, cart, cartTotal, cartSum, addToCart, setPage, openProduct, loading, deliveryType, setDeliveryType }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('hammasi');
  const [showSort, setShowSort] = useState(false);
  const [sortType, setSortType] = useState('');

  const categories = ['hammasi', ...new Set(products.map(p => p.category))];

  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === 'hammasi' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  if (sortType === 'cheap') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortType === 'expensive') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortType === 'az') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="header">
        <div className="header-top">
          <div className="logo">
            <img src={LOGO} alt="Rahmat Chef" className="logo-img" />
            <div className="logo-info">
              <div className="logo-name">Rahmat Chef</div>
              <div className="logo-sub">• sweet pastry •</div>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setPage('search')}>🔍</button>
            <button className="icon-btn">🔔</button>
          </div>
        </div>

        <div className="delivery-toggle">
          <button
            className={'delivery-btn' + (deliveryType === 'delivery' ? ' active' : '')}
            onClick={() => setDeliveryType('delivery')}
          >
            🚚 Yetkazib berish
          </button>
          <button
            className={'delivery-btn' + (deliveryType === 'pickup' ? ' active' : '')}
            onClick={() => setDeliveryType('pickup')}
          >
            🏪 Olib ketish
          </button>
        </div>

        <div className="search-wrap">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="categories-wrap">
          <button className="filter-btn" onClick={() => setShowSort(true)}>⚙️</button>
          {categories.map(cat => (
            <button
              key={cat}
              className={'cat-btn' + (cat === activeCategory ? ' active' : '')}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="main">
        <div className="banner">
          <div className="banner-text">
            <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p>
          </div>
          <div className="banner-emoji">{banner.emoji}</div>
        </div>

        <div className="section-title">
          {activeCategory === 'hammasi' ? 'Barcha mahsulotlar' : activeCategory}
        </div>

        {loading ? (
          <div className="products-grid">
            {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <p className="empty-text">Mahsulot topilmadi</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <div key={p.id} className="product-card" onClick={() => openProduct(p)}>
                <div className="product-img">
                  {p.image ? <img src={p.image} alt={p.name} /> : '🍰'}
                </div>
                <div className="product-info">
                  <div className="product-price">{Number(p.price).toLocaleString()} so'm</div>
                  <div className="product-name">{p.name}</div>
                  <button
                    className="product-add-btn"
                    onClick={e => { e.stopPropagation(); addToCart(p); }}
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartTotal > 0 && (
        <div style={{
          position:'fixed', bottom:'70px', left:'50%', transform:'translateX(-50%)',
          width:'calc(100% - 32px)', maxWidth:'448px', zIndex:45
        }}>
          <button className="btn-primary" onClick={() => setPage('cart')}>
            🛒 Savatni ko'rish — {Number(cartSum).toLocaleString()} so'm ({cartTotal} ta)
          </button>
        </div>
      )}

      {showSort && (
        <div className="modal-overlay" onClick={() => setShowSort(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle"></div>
            <div className="modal-header">
              <span className="modal-title">Saralash</span>
              <button className="modal-reset" onClick={() => { setSortType(''); setShowSort(false); }}>Bekor qilish</button>
              <button className="modal-close" onClick={() => setShowSort(false)}>✕</button>
            </div>
            {[
              { key: 'az', label: 'A dan Z gacha' },
              { key: 'cheap', label: 'Avval arzon' },
              { key: 'expensive', label: 'Avval qimmat' },
            ].map(opt => (
              <div key={opt.key} className="sort-option" onClick={() => { setSortType(opt.key); setShowSort(false); }}>
                <span>{opt.label}</span>
                <div className={'sort-radio' + (sortType === opt.key ? ' selected' : '')}></div>
              </div>
            ))}
            <button className="btn-primary" style={{marginTop:'16px'}} onClick={() => setShowSort(false)}>
              Qo'llash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
