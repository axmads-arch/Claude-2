const API = 'https://claude-production-0b03.up.railway.app';
let cart = [];
let products = [];
let activeCategory = 'hammasi';

async function loadBanner() {
  try {
    const r = await fetch(`${API}/api/banner`);
    const d = await r.json();
    document.getElementById('bannerTitle').textContent = d.title;
    document.getElementById('bannerSubtitle').textContent = d.subtitle;
    document.getElementById('bannerEmoji').textContent = d.emoji;
  } catch(e) {}
}

async function loadProducts() {
  try {
    const res = await fetch(`${API}/api/products`);
    products = await res.json();
    if (!Array.isArray(products)) throw new Error('Array emas');
    renderCategories();
    renderProducts(products);
  } catch(e) {
    document.getElementById('productsGrid').innerHTML = '<div style="grid-column:1/-1;padding:20px;text-align:center;color:red">❌ ' + e.message + '</div>';
  }
}

function renderCategories() {
  const cats = ['hammasi', ...new Set(products.map(p => p.category))];
  document.getElementById('categories').innerHTML = cats.map(cat => `
    <button class="cat-btn ${cat === activeCategory ? 'active' : ''}" onclick="filterCategory('${cat}')">${cat}</button>
  `).join('');
}

function filterCategory(cat) {
  activeCategory = cat;
  renderCategories();
  const filtered = cat === 'hammasi' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
}

function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!list.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;padding:40px;text-align:center;color:#888">Mahsulot topilmadi</div>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : '🍰'}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description || ''}</div>
        <div class="product-footer">
          <div class="product-price">${Number(p.price).toLocaleString()} so'm</div>
          <button class="add-btn" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({...product, qty: 1});
  }
  updateCartBtn();
}

function removeFromCart(id) {
  const existing = cart.find(c => c.id === id);
  if (!existing) return;
  if (existing.qty > 1) {
    existing.qty--;
  } else {
    cart = cart.filter(c => c.id !== id);
  }
  updateCartBtn();
  renderCartItems();
}

function updateCartBtn() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  const sum = cart.reduce((s, c) => s + c.qty * c.price, 0);
  document.getElementById('cartCount').textContent = total;
  document.getElementById('cartSum').textContent = total > 0 ? Number(sum).toLocaleString() + " so'm" : '';
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  document.getElementById('cartTotal').textContent = Number(total).toLocaleString() + " so'm";
  if (!cart.length) {
    container.innerHTML = '<div class="empty-cart">🛒 Savat bo\'sh</div>';
    return;
  }
  container.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-name">${c.name}</div>
      <div style="display:flex;align-items:center;gap:8px">
        <button class="qty-btn" onclick="removeFromCart(${c.id})">−</button>
        <span class="qty-num">${c.qty}</span>
        <button class="qty-btn" onclick="addToCart(${c.id})">+</button>
      </div>
      <div class="cart-item-price">${Number(c.qty * c.price).toLocaleString()} so'm</div>
    </div>
  `).join('');
}

function openCart() {
  renderCartItems();
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
}

function closeCartOutside(e) {
  if (e.target === document.getElementById('cartOverlay')) closeCart();
}

function openOrderForm() {
  closeCart();
  document.getElementById('orderOverlay').classList.add('open');
}

function closeOrderForm() {
  document.getElementById('orderOverlay').classList.remove('open');
}

function closeOrderOutside(e) {
  if (e.target === document.getElementById('orderOverlay')) closeOrderForm();
}

async function sendOrder() {
  if (!cart.length) return alert('Savat bo\'sh!');
  openOrderForm();
}

async function submitOrder() {
  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();
  if (!name || !phone || !address) return alert('Barcha maydonlarni to\'ldiring!');
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Yuborilmoqda...';
  btn.disabled = true;
  try {
    const res = await fetch(`${API}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: name, phone, address,
        items: cart.map(c => ({ productId: c.id, quantity: c.qty, price: c.price }))
      })
    });
    if (!res.ok) throw new Error('Server xatoligi');
    cart = [];
    updateCartBtn();
    closeOrderForm();
    showSuccess();
  } catch(e) {
    alert('Xatolik: ' + e.message);
  } finally {
    btn.textContent = '✅ Buyurtma berish';
    btn.disabled = false;
  }
}

function showSuccess() {
  document.getElementById('successOverlay').classList.add('open');
  setTimeout(() => {
    document.getElementById('successOverlay').classList.remove('open');
  }, 3000);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.description && p.description.toLowerCase().includes(q))
  );
  renderProducts(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  loadBanner();
  loadProducts();
});
