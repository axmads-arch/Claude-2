import React, { useState } from 'react';

export default function ProductDetail({ product, setPage, addToCart, cart }) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const cartItem = cart.find(c => c.id === product.id);
  const cartQty = cartItem ? cartItem.qty : 0;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(product);
    setPage('cart');
  }

  return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => setPage('home')}>←</button>
        <h2>Mahsulot</h2>
      </div>

      <div style={{background:'#fff',minHeight:'100vh'}}>
        <div style={{height:'280px',background:'#e8f5f1',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5rem',overflow:'hidden',position:'relative'}}>
          {product.image
            ? <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            : '🍰'
          }
          <div style={{position:'absolute',top:'12px',right:'12px',background:'#e8f5f1',color:'#1a6b5a',padding:'4px 12px',borderRadius:'20px',fontSize:'0.78rem',fontWeight:700}}>
            {product.category}
          </div>
        </div>

        <div style={{padding:'20px 16px 120px'}}>
          <h1 style={{fontSize:'1.4rem',fontWeight:900,marginBottom:'8px'}}>{product.name}</h1>

          {product.description && (
            <p style={{color:'#666',fontSize:'0.9rem',lineHeight:1.7,marginBottom:'20px'}}>
              {product.description}
            </p>
          )}

          <div style={{background:'#f5f5f5',borderRadius:'16px',padding:'16px',marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontSize:'0.75rem',color:'#888',marginBottom:'4px',fontWeight:600}}>NARX</div>
              <div style={{fontSize:'1.5rem',fontWeight:900,color:'#1a6b5a'}}>
                {Number(product.price * qty).toLocaleString()} so'm
              </div>
              {qty > 1 && (
                <div style={{fontSize:'0.78rem',color:'#888'}}>
                  {Number(product.price).toLocaleString()} so'm x {qty}
                </div>
              )}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'14px',background:'#fff',borderRadius:'24px',padding:'8px 14px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{width:'32px',height:'32px',borderRadius:'50%',border:'none',background:'#e8f5f1',fontSize:'1.2rem',fontWeight:900,color:'#1a6b5a',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
              >−</button>
              <span style={{fontWeight:900,fontSize:'1.1rem',minWidth:'24px',textAlign:'center'}}>{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                style={{width:'32px',height:'32px',borderRadius:'50%',border:'none',background:'#1a6b5a',fontSize:'1.2rem',fontWeight:900,color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
              >+</button>
            </div>
          </div>

          {cartQty > 0 && (
            <div style={{background:'#e8f5f1',borderRadius:'12px',padding:'10px 14px',marginBottom:'12px',fontSize:'0.85rem',color:'#1a6b5a',fontWeight:700,textAlign:'center'}}>
              Savatda: {cartQty} ta
            </div>
          )}
        </div>
      </div>

      <div style={{position:'fixed',bottom:'70px',left:'50%',transform:'translateX(-50%)',width:'calc(100% - 32px)',maxWidth:'448px',zIndex:45}}>
        <button className="btn-primary" onClick={handleAdd}>
          Savatga qo'shish — {Number(product.price * qty).toLocaleString()} so'm
        </button>
      </div>
    </div>
  );
}
