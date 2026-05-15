// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const CATS = [
{ id:‘all’,  label:‘Фильтры’, icon:‘⚙’, isFilter:true },
{ id:‘breakfast’, label:‘Завтраки’,    icon:‘З’  },
{ id:‘salads’,    label:‘Салаты’,      icon:‘С’  },
{ id:‘sandwich’,  label:‘Сэндвичи’,    icon:‘С’  },
{ id:‘mains’,     label:‘Вторые блюда’,icon:‘ВБ’ },
{ id:‘soups’,     label:‘Супы’,        icon:‘СП’ },
{ id:‘pastry’,    label:‘Выпечка’,     icon:‘В’  },
{ id:‘drinks’,    label:‘Напитки’,     icon:‘Н’  },
{ id:‘desserts’,  label:‘Десерты’,     icon:‘Д’  },
];

const PRODUCTS = [
// Завтраки
{ id:1,  name:‘Шакшука’,               price:49000, cat:‘breakfast’, img:‘https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&q=80’ },
{ id:2,  name:‘Французский завтрак’,   price:44000, cat:‘breakfast’, img:‘https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80’ },
{ id:3,  name:‘Сырники со сметаной’,   price:35000, cat:‘breakfast’, img:‘https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80’ },
{ id:4,  name:‘Омлет с овощами’,       price:28000, cat:‘breakfast’, img:‘https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&q=80’ },
// Салаты
{ id:5,  name:‘Салат Цезарь’,          price:42000, cat:‘salads’,    img:‘https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80’ },
{ id:6,  name:‘Салат Оливье’,          price:29000, cat:‘salads’,    img:‘https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80’ },
{ id:7,  name:‘Греческий салат’,       price:36000, cat:‘salads’,    img:‘https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=400&q=80’ },
// Сэндвичи
{ id:8,  name:‘Клаб сэндвич’,          price:38000, cat:‘sandwich’,  img:‘https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80’ },
{ id:9,  name:‘Бургер классик’,        price:52000, cat:‘sandwich’,  img:‘https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80’ },
// Вторые блюда
{ id:10, name:‘Плов по-узбекски’,      price:65000, cat:‘mains’,     img:‘https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80’ },
{ id:11, name:‘Манты с мясом’,         price:49000, cat:‘mains’,     img:‘https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80’ },
{ id:12, name:‘Шашлык из говядины’,    price:89000, cat:‘mains’,     img:‘https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80’ },
// Супы
{ id:13, name:‘Лагман’,                price:45000, cat:‘soups’,     img:‘https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80’ },
{ id:14, name:‘Шурпа’,                 price:52000, cat:‘soups’,     img:‘https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80’ },
// Выпечка
{ id:15, name:‘Самса слоёная’,         price:18000, cat:‘pastry’,    img:‘https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80’ },
{ id:16, name:‘Лепёшка тандирная’,     price:12000, cat:‘pastry’,    img:‘https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80’ },
// Напитки
{ id:17, name:‘Чай зелёный’,           price:8000,  cat:‘drinks’,    img:‘https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80’ },
{ id:18, name:‘Свежевыжатый сок’,      price:22000, cat:‘drinks’,    img:‘https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80’ },
// Десерты
{ id:19, name:‘Чак-чак медовый’,       price:25000, cat:‘desserts’,  img:‘https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80’ },
{ id:20, name:‘Пирожное Наполеон’,     price:32000, cat:‘desserts’,  img:‘https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80’ },
];

const SORT_OPTS = [
{ id:‘az’,       label:‘От А до Я’           },
{ id:‘rating’,   label:‘По оценкам клиентов’ },
{ id:‘cheap’,    label:‘Сначала дешевле’     },
{ id:‘expensive’,label:‘Сначала дороже’      },
];

const ORDERS = [
{ id:’#1042’, items:‘Плов, Шашлык, Чай’,      total:162000, status:‘done’, date:‘14.05.2026, 12:30’ },
{ id:’#1038’, items:‘Шакшука x2, Сок’,         total:120000, status:‘way’,  date:‘13.05.2026, 19:15’ },
{ id:’#1031’, items:‘Манты, Самса x2’,          total:85000,  status:‘done’, date:‘11.05.2026, 13:00’ },
];

// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
const S = {
cat: ‘breakfast’,
cart: {},        // { id: qty }
sortSel: null,
sortApplied: null,
user: null,
delivery: ‘Доставка’,
ddOpen: false,
};

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════
const fmt = n => n.toLocaleString(‘ru’) + ’ UZS’;
const $ = id => document.getElementById(id);

function totalItems() { return Object.values(S.cart).reduce((a,b)=>a+b,0); }
function totalPrice() {
return Object.entries(S.cart).reduce((s,[id,qty])=>{
const p = PRODUCTS.find(p=>p.id==id);
return s + (p ? p.price*qty : 0);
},0);
}

// ═══════════════════════════════════════
// RENDER CATEGORIES
// ═══════════════════════════════════════
function renderCats() {
$(‘catsScroll’).innerHTML = CATS.map(c => `<button class="cat-btn ${S.cat===c.id && !c.isFilter?'active':''}" onclick="App.setCat('${c.id}')"> <div class="cat-icon">${c.isFilter ?`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`: c.icon }</div> <span class="cat-lbl">${c.label}</span> </button>`).join(’’);
}

// ═══════════════════════════════════════
// RENDER PRODUCTS
// ═══════════════════════════════════════
function getProducts(query=’’) {
let list = S.cat===‘all’ ? […PRODUCTS] : PRODUCTS.filter(p=>p.cat===S.cat);
if (query) list = list.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()));
if (S.sortApplied===‘az’)        list.sort((a,b)=>a.name.localeCompare(b.name));
if (S.sortApplied===‘cheap’)     list.sort((a,b)=>a.price-b.price);
if (S.sortApplied===‘expensive’) list.sort((a,b)=>b.price-a.price);
return list;
}

function cardHTML(p) {
const qty = S.cart[p.id]||0;
const imgEl = p.img
? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'no-img\\'><svg width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#ccc\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><polyline points=\\'21 15 16 10 5 21\\'/></svg></div>'">`
: `<div class="no-img"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
const ctrl = qty===0
? `<button class="card-add" onclick="App.add(${p.id})">+</button>`
: `<div class="card-ctrl"> <button class="cc-btn" onclick="App.rem(${p.id})">−</button> <span class="cc-n">${qty}</span> <button class="cc-btn" onclick="App.add(${p.id})">+</button> </div>`;
return ` <div class="card"> <div class="card-img">${imgEl}</div> <div class="card-body"> <div class="card-price">${fmt(p.price)}</div> <div class="card-name">${p.name}</div> </div> ${ctrl} </div>`;
}

function renderProducts(query=’’) {
const list = getProducts(query);
const catLabel = CATS.find(c=>c.id===S.cat)?.label || ‘Все блюда’;
$(‘secTitle’).textContent = catLabel===‘Фильтры’ ? ‘Все блюда’ : catLabel;
$(‘prodGrid’).innerHTML = list.length
? list.map(cardHTML).join(’’)
: `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#aaa;font-size:14px">Ничего не найдено</div>`;
}

// ═══════════════════════════════════════
// RENDER CART
// ═══════════════════════════════════════
function renderCart() {
const items = Object.entries(S.cart);
if (!items.length) {
$(‘cartContent’).innerHTML = ` <div class="empty" style="padding-top:60px"> <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.5" style="margin-bottom:16px"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> <h3>Корзина пуста</h3> <p>Добавьте блюда из меню</p> <button class="empty-btn" onclick="App.nav('home', $('nbHome'))">В меню</button> </div>`;
$(‘cartFt’).style.display=‘none’;
return;
}
$(‘cartFt’).style.display=‘flex’;
$(‘cartSum’).textContent = fmt(totalPrice());
$(‘cartContent’).innerHTML = `<div style="padding-bottom:140px">` +
items.map(([id,qty])=>{
const p = PRODUCTS.find(p=>p.id==id); if(!p) return ‘’;
const imgEl = p.img
? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">`
: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
return ` <div class="ci"> <div class="ci-img">${imgEl}</div> <div class="ci-info"> <div class="ci-name">${p.name}</div> <div class="ci-price">${fmt(p.price)}</div> <div class="ci-comment">Оставить комментарий</div> </div> <div class="ci-ctrl"> <button class="ci-btn" onclick="App.rem(${p.id});renderCart()">−</button> <span class="ci-num">${qty}</span> <button class="ci-btn" onclick="App.add(${p.id});renderCart()">+</button> </div> </div>`;
}).join(’’) + `</div>`;
}

// ═══════════════════════════════════════
// RENDER ORDERS
// ═══════════════════════════════════════
function renderOrders() {
if (!ORDERS.length) {
$(‘ordersContent’).innerHTML=`<div class="empty"><h3>Нет заказов</h3><p>Здесь будет история ваших заказов</p></div>`;
return;
}
const badgeMap = { done:{cls:‘b-done’,lbl:‘Доставлен’}, way:{cls:‘b-way’,lbl:‘В пути’}, new:{cls:‘b-new’,lbl:‘Новый’} };
$(‘ordersContent’).innerHTML = ORDERS.map(o=>{
const b = badgeMap[o.status]||badgeMap.done;
return `<div class="oc"> <div class="oc-head"><span class="oc-id">${o.id}</span><span class="badge ${b.cls}">${b.lbl}</span></div> <div class="oc-items">${o.items}</div> <div class="oc-total">${fmt(o.total)}</div> <div class="oc-date">${o.date}</div> </div>`;
}).join(’’);
}

// ═══════════════════════════════════════
// RENDER PROFILE
// ═══════════════════════════════════════
function renderProfile() {
if (!S.user) {
$(‘profileContent’).innerHTML=` <div class="empty" style="padding-top:80px"> <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.5" style="margin-bottom:16px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> <h3>Вы не вошли</h3> <p>Войдите, чтобы видеть профиль и историю заказов</p> <button class="empty-btn" onclick="App.openAuth()">Войти</button> </div>`;
return;
}
$(‘profileContent’).innerHTML=` <div class="prof-top"> <div style="display:flex;justify-content:space-between;align-items:flex-start"> <div> <div class="prof-name">${S.user.name}</div> <div class="prof-phone">${S.user.phone}</div> </div> <div style="display:flex;gap:8px"> <button class="prof-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button> <button class="prof-icon-btn" onclick="App.logout()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button> </div> </div> </div> <div class="menu-sep"></div> ${[ ['💳','Мои карты'],['ℹ️','О нас'],['📍','Филиалы'],['%','Акции'],['📞','Контакты'],['🌐','Язык'], ].map(([ic,lbl])=>`
<div class="menu-row">
<span class="mr-icon">${ic}</span>
<span class="mr-lbl">${lbl}</span>
<svg class="mr-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
</div>`).join('')} <div class="powered">Powered by <b>Delever</b></div>`;
}

// ═══════════════════════════════════════
// BADGE
// ═══════════════════════════════════════
function updateBadge() {
const n = totalItems();
const nb = $(‘nbCart’);
const old = nb.querySelector(’.nb-badge’);
if(old) old.remove();
if(n>0){
const el=document.createElement(‘span’);
el.className=‘nb-badge’; el.textContent=n;
nb.appendChild(el);
}
}

// ═══════════════════════════════════════
// SORT
// ═══════════════════════════════════════
function renderSortOpts() {
$(‘sortOpts’).innerHTML = SORT_OPTS.map(o=>` <div class="sort-row" onclick="App.selSort('${o.id}')"> <span class="sort-lbl">${o.label}</span> <div class="radio ${S.sortSel===o.id?'on':''}" id="r_${o.id}"></div> </div>`).join(’’);
}

// ═══════════════════════════════════════
// AUTH CONTENT
// ═══════════════════════════════════════
function authLoginHTML() {
return ` <div style="display:flex;justify-content:flex-end;margin-bottom:14px"> <button class="sh-x" onclick="App.closeAuth()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg></button> </div> <div class="auth-ttl">Войти</div> <div class="auth-lbl">Номер телефона</div> <div class="phone-wrap"> <span class="phone-pre">+998</span> <input class="phone-inp" type="tel" placeholder="__ ___ __ __" id="phInp" maxlength="12"> </div> <div class="auth-terms">Авторизуясь на сайте, вы соглашаетесь с <a href="#">Условиями использования</a></div> <button class="auth-main-btn" onclick="App.sendOTP()">Продолжить</button> <div class="auth-div">или</div> <button class="google-btn"> <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Google orqali kirish </button>`;
}

function authOTPHTML(phone) {
return ` <div style="display:flex;justify-content:flex-end;margin-bottom:14px"> <button class="sh-x" onclick="App.backToLogin()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button> </div> <div class="auth-ttl">Код подтверждения</div> <p style="font-size:14px;color:#888;margin-bottom:20px">Введите код из SMS на номер +998 ${phone}</p> <div class="otp-row"> ${[0,1,2,3].map(i=>`<input class="otp-box" maxlength="1" id="otp${i}" oninput="App.otpNext(${i})" type="tel">`).join('')} </div> <button class="auth-main-btn" onclick="App.verifyOTP()">Подтвердить</button> <button class="google-btn" style="margin-top:10px" onclick="App.backToLogin()">Назад</button>`;
}

// ═══════════════════════════════════════
// APP CONTROLLER
// ═══════════════════════════════════════
const App = {

// ── CART ──
add(id) {
S.cart[id] = (S.cart[id]||0)+1;
renderProducts();
updateBadge();
},
rem(id) {
if (!S.cart[id]) return;
S.cart[id]–;
if (!S.cart[id]) delete S.cart[id];
renderProducts();
updateBadge();
},
clearCart() {
if (!totalItems()) return;
if (confirm(‘Очистить корзину?’)) { S.cart={}; renderCart(); updateBadge(); renderProducts(); }
},
checkout() {
if (!totalItems()) return;
S.cart={};
closePage(‘cartPage’);
renderProducts();
updateBadge();
$(‘sucOv’).classList.add(‘show’);
},
closeSuccess() {
$(‘sucOv’).classList.remove(‘show’);
ORDERS.unshift({ id:’#’+(1043+ORDERS.length), items:‘Новый заказ’, total:totalPrice()||50000, status:‘new’, date:new Date().toLocaleString(‘ru’) });
this.nav(‘orders’, $(‘nbOrders’));
},

// ── NAV ──
nav(tab, btn) {
// close all pages
[‘cartPage’,‘ordersPage’,‘profilePage’].forEach(id=>{ $(id).classList.remove(‘show’); });
document.querySelectorAll(’.nb’).forEach(b=>b.classList.remove(‘active’));
if(btn) btn.classList.add(‘active’);

```
if(tab==='cart')    { $('cartPage').classList.add('show'); renderCart(); }
if(tab==='orders')  { $('ordersPage').classList.add('show'); renderOrders(); }
if(tab==='profile') { $('profilePage').classList.add('show'); renderProfile(); }
// home: just close pages
```

},
closePage(id) {
$(id).classList.remove(‘show’);
document.querySelectorAll(’.nb’).forEach(b=>b.classList.remove(‘active’));
$(‘nbHome’).classList.add(‘active’);
},

// ── CATEGORY ──
setCat(id) {
if (id===‘all’) { this.openSort(); return; }
S.cat=id; renderCats(); renderProducts();
},

// ── DELIVERY DD ──
toggleDD() {
S.ddOpen=!S.ddOpen;
$(‘delivDD’).classList.toggle(‘dn’, !S.ddOpen);
},
setDelivery(val) {
S.delivery=val;
$(‘ddBtnTxt’).textContent=val;
$(‘chkD’).classList.toggle(‘dn’, val!==‘Доставка’);
$(‘chkS’).classList.toggle(‘dn’, val!==‘Самовывоз’);
S.ddOpen=false;
$(‘delivDD’).classList.add(‘dn’);
},

// ── SEARCH ──
openSearch() { $(‘srchPage’).classList.add(‘show’); setTimeout(()=>$(‘srchInp’).focus(),100); },
closeSearch() { $(‘srchPage’).classList.remove(‘show’); $(‘srchInp’).value=’’; $(‘srchResults’).innerHTML=’’; },
search(q) {
const list = getProducts(q);
$(‘srchResults’).innerHTML = list.length
? list.map(cardHTML).join(’’)
: `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#aaa;font-size:14px">Ничего не найдено</div>`;
},

// ── SORT ──
openSort() { renderSortOpts(); $(‘sortOv’).classList.add(‘show’); },
closeSort() { $(‘sortOv’).classList.remove(‘show’); },
closeSortOut(e) { if(e.target===$(‘sortOv’)) this.closeSort(); },
selSort(id) {
S.sortSel=id;
document.querySelectorAll(’.radio’).forEach(r=>r.classList.remove(‘on’));
$(‘r_’+id)?.classList.add(‘on’);
},
resetSort() { S.sortSel=null; document.querySelectorAll(’.radio’).forEach(r=>r.classList.remove(‘on’)); },
applySort() { S.sortApplied=S.sortSel; this.closeSort(); renderProducts(); },

// ── AUTH ──
openAuth() { $(‘authContent’).innerHTML=authLoginHTML(); $(‘authOv’).classList.add(‘show’); },
closeAuth() { $(‘authOv’).classList.remove(‘show’); },
closeAuthOut(e) { if(e.target===$(‘authOv’)) this.closeAuth(); },
backToLogin() { $(‘authContent’).innerHTML=authLoginHTML(); },
sendOTP() {
const ph = $(‘phInp’)?.value||’’;
if(ph.length<9){ alert(‘Введите корректный номер’); return; }
$(‘authContent’).innerHTML=authOTPHTML(ph);
setTimeout(()=>$(‘otp0’)?.focus(),100);
},
otpNext(i) {
const v = $(‘otp’+i)?.value;
if(v && i<3) $(‘otp’+(i+1))?.focus();
},
verifyOTP() {
const code=[0,1,2,3].map(i=>$(‘otp’+i)?.value||’’).join(’’);
if(code.length<4){ alert(‘Введите 4-значный код’); return; }
S.user={ name:‘Ahmad’, phone:’+998 77 080 82 00’ };
this.closeAuth();
renderProfile();
this.nav(‘profile’, $(‘nbProfile’));
},
logout() { S.user=null; renderProfile(); },
};

// close dd on outside click
document.addEventListener(‘click’, e=>{
if(S.ddOpen && !e.target.closest(’.delivery-row’)) {
S.ddOpen=false; $(‘delivDD’).classList.add(‘dn’);
}
});

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
renderCats();
renderProducts();
renderOrders();
renderProfile();
