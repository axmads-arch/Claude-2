import React, { useState } from 'react';

export default function Profile({ setPage, API }) {
  const [phone, setPhone] = useState(localStorage.getItem('userPhone') || '');
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [saved, setSaved] = useState(!!localStorage.getItem('userPhone'));

  function saveProfile() {
    if (!phone || !name) return alert('Ism va telefon kiriting!');
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userName', name);
    setSaved(true);
    alert('✅ Saqlandi!');
  }

  function logout() {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    setPhone('');
    setName('');
    setSaved(false);
  }

  return (
    <div>
      <div className="page-header">
        <h2>👤 Profil</h2>
        {saved && (
          <button
            onClick={logout}
            style={{marginLeft:'auto',background:'#fee2e2',color:'#ef4444',border:'none',padding:'8px 14px',borderRadius:'8px',fontWeight:700,cursor:'pointer'}}
          >
            Chiqish
          </button>
        )}
      </div>
      <div className="page">
        {saved ? (
          <div>
            <div style={{background:'#fff',borderRadius:'16px',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',textAlign:'center'}}>
              <div style={{fontSize:'3rem',marginBottom:'12px'}}>👤</div>
              <div style={{fontWeight:900,fontSize:'1.1rem',marginBottom:'4px'}}>{name}</div>
              <div style={{color:'#888',fontSize:'0.88rem'}}>{phone}</div>
            </div>
            <button className="order-btn" onClick={() => setPage('orders')}>
              📋 Buyurtmalarim
            </button>
          </div>
        ) : (
          <div>
            <div style={{textAlign:'center',padding:'20px 0 30px'}}>
              <div style={{fontSize:'3rem',marginBottom:'12px'}}>👤</div>
              <div style={{fontWeight:700,fontSize:'1rem',color:'#888'}}>Profilingizni to'ldiring</div>
            </div>
            <div className="form-group">
              <label>Ismingiz</label>
              <input
                type="text"
                placeholder="Ism Familiya"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Telefon raqam</label>
              <input
                type="tel"
                placeholder="+998 90 000 00 00"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <button className="order-btn" onClick={saveProfile}>
              💾 Saqlash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
