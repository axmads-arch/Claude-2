import React, { useState, useEffect, useRef } from 'react';

export default function Cart({ cart, addToCart, removeFromCart, setPage, API }) {
  const [step, setStep] = useState('cart');
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [phone, setPhone] = useState(localStorage.getItem('userPhone') || '');
  const [address, setAddress] = useState(localStorage.getItem('userAddress') || '');
  const [paymentType, setPaymentType] = useState('naqd');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);

  useEffect(() => {
    if (showMap) loadMap();
  }, [showMap]);

  function loadMap() {
    if (mapInstanceRef.current) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => initMap();
    document.head.appendChild(script);
  }

  function initMap() {
    if (!mapRef.current || mapInstanceRef.current) return;
    const L = window.L;
    const map = L.map(mapRef.current).setView([41.2995, 69.2401], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    const marker = L.marker([41.2995, 69.2401], { draggable: true }).addTo(map);
    markerRef.current = marker;
    mapInstanceRef.current = map;
    map.on('click', async (e) => {
      marker.setLatLng(e.latlng);
      await getAddress(e.latlng.lat, e.latlng.lng);
    });
    marker.on('dragend', async () => {
      const pos = marker.getLatLng();
      await getAddress(pos.lat, pos.lng);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 15);
        marker.setLatLng([latitude, longitude]);
        getAddress(latitude, longitude);
      });
    }
  }

  async function getAddress(lat, lng) {
    try {
      const res = await fetch('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json');
      const data = await res.json();
      setAddress(data.display_name || (lat + ', ' + lng));
    } catch(e) {
      setAddress(lat.toFixed(5) + ', ' + lng.toFixed(5));
    }
  }

  async function submitOrder() {
    if (!name || !phone || !address) return alert('Barcha maydonlarni toldiring!');
    setLoading(true);
    try {
      const res = await fetch(API + '/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name, phone, address,
          paymentType,
          items: cart.map(c => ({ productId: c.id, quantity: c.qty, price: c.price }))
        })
      });
      if (!res.ok) throw new Error('Xatolik');
      localStorage.setItem('userAddress', address);
      setStep('success');
      setTimeout(() => { setStep('cart'); setPage('home'); }, 3000);
    } catch(e) {
      alert('Xatolik: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  if (step === 'success') {
    return (
      <div className="success-overlay">
        <div className="success-box">
          <div className="icon">🎉</div>
          <h3>Buyurtma qabul qilindi!</h3>
          <p>Tez orada siz bilan boglanamiz</p>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div>
        <div className="page-header">
          <button className="back-btn" onClick={() => setStep('cart')}>←</button>
          <h2>Buyurtma</h2>
        </div>
        <div className="page">
          {!localStorage.getItem('userName') && (
            <div className="form-group">
              <label>Ismingiz</label>
              <input type="text" placeholder="Ism Familiya" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          {!localStorage.getItem('userPhone') && (
            <div className="form-group">
              <label>Telefon</label>
              <input type="tel" placeholder="+998 90 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          )}
          {(localStorage.getItem('userName') || localStorage.getItem('userPhone')) && (
            <div style={{background:'#e8f5f1',borderRadius:'12px',padding:'12px',marginBottom:'14px',fontSize:'0.85rem',color:'#1a6b5a'}}>
              👤 {name} • 📞 {phone}
            </div>
          )}

          <div className="form-group">
            <label>Manzil</label>
            <div style={{display:'flex',gap:'8px',marginBottom:'10px'}}>
              <button
                onClick={() => setShowMap(!showMap)}
                style={{background:'#1a6b5a',color:'#fff',border:'none',padding:'10px 14px',borderRadius:'10px',fontWeight:700,cursor:'pointer',fontSize:'0.85rem'}}
              >
                🗺️ {showMap ? 'Yopish' : 'Xaritadan tanlash'}
              </button>
            </div>
            {showMap && (
              <div style={{marginBottom:'12px'}}>
                <div ref={mapRef} style={{height:'250px',borderRadius:'12px',overflow:'hidden',border:'1.5px solid #eee'}}></div>
                <p style={{fontSize:'0.75rem',color:'#888',marginTop:'6px'}}>📍 Xaritada bosing yoki markerni suring</p>
              </div>
            )}
            <textarea
              placeholder="Manzil..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{width:'100%',padding:'12px 14px',border:'1.5px solid #eee',borderRadius:'12px',fontFamily:'Nunito,sans-serif',fontSize:'0.9rem',outline:'none',resize:'none',height:'80px'}}
            />
          </div>

          <div className="form-group">
            <label>Tolov turi</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'6px'}}>
              <button
                onClick={() => setPaymentType('naqd')}
                style={{
                  padding:'14px',borderRadius:'12px',border:'2px solid',
                  borderColor: paymentType === 'naqd' ? '#1a6b5a' : '#eee',
                  background: paymentType === 'naqd' ? '#e8f5f1' : '#fff',
                  color: paymentType === 'naqd' ? '#1a6b5a' : '#888',
                  fontWeight:800,fontSize:'0.88rem',cursor:'pointer'
                }}
              >
                💵 Naqd
              </button>
              <button
                onClick={() => setPaymentType('karta')}
                style={{
                  padding:'14px',borderRadius:'12px',border:'2px solid',
                  borderColor: paymentType === 'karta' ? '#1a6b5a' : '#eee',
                  background: paymentType === 'karta' ? '#e8f5f1' : '#fff',
                  color: paymentType === 'karta' ? '#1a6b5a' : '#888',
                  fontWeight:800,fontSize:'0.88rem',cursor:'pointer'
                }}
              >
                💳 Karta
              </button>
            </div>
          </div>

          <div style={{background:'#f8f8f8',borderRadius:'12px',padding:'14px',marginBottom:'16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',fontSize:'0.85rem',color:'#888'}}>
              <span>Mahsulotlar</span>
              <span>{Number(total).toLocaleString()} som</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontWeight:900,fontSize:'1rem',color:'#1a6b5a'}}>
              <span>Jami</span>
              <span>{Number(total).toLocaleString()} som</span>
            </div>
          </div>

          <button className="order-btn" onClick={submitOrder} disabled={loading}>
            {loading ? 'Yuborilmoqda...' : 'Buyurtma berish — ' + Number(total).toLocaleString() + ' som'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => setPage('home')}>←</button>
        <h2>🛒 Savat</h2>
      </div>
      <div className="page">
        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🛒</div>
            <p>Savat bosh</p>
          </div>
        ) : (
          <>
            {cart.map(c => (
              <div key={c.id} className="cart-item">
                <div className="cart-item-name">{c.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <button className="qty-btn" onClick={() => removeFromCart(c.id)}>−</button>
                  <span className="qty-num">{c.qty}</span>
                  <button className="qty-btn" onClick={() => addToCart(c)}>+</button>
                </div>
                <div className="cart-item-price">{Number(c.qty * c.price).toLocaleString()} som</div>
              </div>
            ))}
            <div className="cart-total-row">
              <span>Jami:</span>
              <span>{Number(total).toLocaleString()} som</span>
            </div>
            <button className="order-btn" onClick={() => setStep('form')}>
              📦 Buyurtma berish
            </button>
          </>
        )}
      </div>
    </div>
  );
}
