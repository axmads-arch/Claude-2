import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // Backenddan keladigan ma'lumotlar

  // Savatchaga qo'shish logikasi (Professional usulda)
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSum = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="app">
      {page === 'home' && (
        <Home 
          products={products} 
          addToCart={addToCart} 
          cartTotal={cartTotal} 
          cartSum={cartSum}
          setPage={setPage}
          openProduct={(p) => { setSelectedProduct(p); setPage('detail'); }}
        />
      )}
      
      {page === 'detail' && (
        <ProductDetail 
          product={selectedProduct} 
          addToCart={addToCart} 
          onBack={() => setPage('home')} 
        />
      )}

      {page === 'cart' && (
        <Cart 
          cart={cart} 
          setCart={setCart}
          onBack={() => setPage('home')} 
        />
      )}
    </div>
  );
}

export default App;
