import React, { useState, useEffect } from 'react';

export default function Orders({ setPage, API }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const phone = localStorage.getItem('userPhone');

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    if (!phone) { setLoading(false); return; }
    try {
      const res = await fetch(API + '/api/orders/my/' + phone);
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch(e) {}
    setLoading(false);
  }

  if (!phone) {
    return (
      <div>
        <div className="page-header">
          <h2>Buyurtmalar</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <p className="empty-text">Buyurtmalarni ko'rish uchun profilga kiring</p>
          <button className="btn-primary" onClick={() => setPage('profile')}>
            Profilga o'tish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Buyurtmalar</h2>
      </div>
      <div className="page">
        {loading ? (
          <div className="empty-state"><p>Yuklanmoqda...</p></div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p className="empty-text">Buyurtmalar yo'q</p>
            <button className="btn-primary" onClick={() => setPage('home')}>
              Buyurtma berish
            </button>
          </div>
        ) : (
          orders.map(o => (
            <div key={o.id} className="order-card">
              <div className="order-card-header">
                <span className="order-card-id">Buyurtma #{o.id}</span>
                <span className={'order-status-badge status-' + o.status}>
                  {o.status}
                </span>
              </div>
              {o.address && (
                <div className="order-card-address">📍 {o.address}</div>
              )}
              {o.items && o.items.length > 0 && (
                <div style={{fontSize:'0.82rem',color:'#666',marginBottom:'6px'}}>
                  {o.items.map(i => (
                    <span key={i.id} style={{marginRight:'8px'}}>
                      {i.product ? i.product.name : 'Mahsulot'} x{i.quantity}
                    </span>
                  ))}
                </div>
              )}
              <div className="order-card-total">{Number(o.total).toLocaleString()} so'm</div>
              <div className="order-card-date">
                {new Date(o.createdAt).toLocaleDateString('uz-UZ', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
