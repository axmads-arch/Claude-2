const API = 'https://claude-production-8714.up.railway.app';
let cart = [];
let products = [];
let activeCategory = 'hammasi';

// MAHSULOTLARNI YUKLASH
async function loadProducts() {
  try {
    const res = await fetch(`${API}/api/products`);
    products = await res.json();
    renderCategories();
    renderProducts(products);
  } catch (err) {
    document.getElementById('productsGrid').innerHTML = '<div class="loading">Xatolik yuz berdi</div>';
  }
}

// KATEGORIYALAR
function renderCategories() {
  const cats = ['hammasi', ...new Set(products.map(p => p.category))];
  const html = cats.map(cat => `
    <button class="cat-btn ${cat === activeCategory ? 'active' : ''}" onclick="filterByCategory('${cat}')">
      ${cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  `).join('');
  document.getElementById('categories').innerHTML = html;
}

// KATEGORIYA FILTER
function filterByCategory(cat) {
  activeCategory = cat;
  renderCategories();
  const filtered = cat === 'hammasi' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
}

// QIDIRUV
function filterProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
  renderProducts(filtered);
}

// MAHSULOTLARNI RENDER
function renderProducts(list) {
  if (!list.length) {
    document.getElementById('productsGrid').innerHTML = '<div class="loading">Mahsulot topilmadi</div>';
    return;
  }
  document.getElementById('productsGrid').innerHTML = list.map(p => `
    <div class="product-card">
      ${p.image ? `<img class="product-img" src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">` : `<div class="product-img-placeholder">🍽️</div>`}
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        ${p.description ? `<div class="product-desc">${p.description}</div>` : ''}
        <div class="product-bottom">
          <div class="product-price">${Number(p.price).toLocaleString()} so'm</div>
          <button class="add-btn" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// SAVATCHAGA QO'SHISH
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
}

// SAVATCHA SONI
function updateCartCount() {
  const total = cart.reduce((sum, c) => sum + c.quantity, 0);
  document.getElementById('cartCount').textContent = total;
}

// SAVATCHANI OCHISH
function openCart() {
  document.getElementById('cartModal').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  renderCart();
}

// SAVATCHANI YOPISH
function closeCart() {
  document.getElementById('cartModal').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

// SAVATCHANI RENDER
function renderCart() {
  if (!cart.length) {
    document.getElementById('cartItems').innerHTML = '<div class="empty-cart">🛒 Savatcha bo\'sh</div>';
    document.getElementById('cartFooter').innerHTML = '';
    return;
  }
  document.getElementById('cartItems').innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${Number(item.price).toLocaleString()} so'm</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  document.getElementById('cartFooter').innerHTML = `
    <div class="cart-total"><span>Jami:</span><span>${total.toLocaleString()} so'm</span></div>
    <button class="checkout-btn" onclick="openOrder()">Buyurtma berish →</button>
  `;
}

// MIQDOR O'ZGARTIRISH
function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(c => c.id !== id);
  updateCartCount();
  renderCart();
}

// BUYURTMA​​​​​​​​​​​​​​​​
