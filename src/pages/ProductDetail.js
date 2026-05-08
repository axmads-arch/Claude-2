import React from 'react';

export default function ProductDetail({ product, setPage, addToCart, cart }) {
  if (!product) return null;

  const cartItem = cart.find(c => c.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => setPage('home')}>←</button>
        <h2>Mahsulot</h2>
      </div>

      <div style={{background:'#fff'}}>
        <div style={{height:'280px',background:'#e8f5f1',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5rem',overflow:'hidden'}}>
          {product.image ? <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : '🍰'}
        </div>

        <div style={{padding:'20px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,flex:1}}>{product.name}</h1>
            <span style={{background:'#e8f5f1',color:'#1a6b5a',padding:'4px 12px',borderRadius:'20px',fontSize:'0.8rem',fontWeight:700,marginLeft:'10px'}}>{product.category}</span>
          </div>

          <p style={{color:'#888',fontSize:'0.9rem',lineHeight:1.6,marginBottom:'20px'}}>{product.description || 'Tavsif yo\'q'}</p>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',background:'#f8f8f8',borderRadius:'16px',marginBottom:'20px'}}>
            <div>
              <div style={{fontSize:'0.78rem',color:'#888',marginBottom:'4px'}}>Narx</div>
              <div style={{fontSize:'1.4rem',fontWeight:900,color:'#1a6b5a'}}>{Number(product.price).toLocaleString()} so'm</div>
            </div>
            {qty > 0 && (
              <div style={{background:'#e8f5f1',borderRadius:'12px',padding:'8px 16px',fontWeight:800,color:'#1a6b5a'}}>
                Savatda: {qty} ta
              </div>
            )}
          </div>

          <button
            className="order-btn"
            onClick={() => { addToCart(product); setPage('cart'); }}
          >
            🛒 Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
