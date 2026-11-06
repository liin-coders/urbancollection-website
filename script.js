/* ==========================================================
   urbancollection – shared behaviour (all pages)
   Each feature runs only if its element exists on the page.
   ========================================================== */

const waLink = (text = '') =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const fmt = (n) => '₹' + n.toLocaleString('en-IN');
const discount = (p) => Math.round((1 - p.price / p.mrp) * 100);
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const qs = new URLSearchParams(location.search);

const PLACEHOLDER = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="600" height="600" fill="#F1EDE3"/></svg>');

/* ---------- Templates ---------- */
function productCard(p) {
  const link = `product-detail.html?id=${p.id}`;
  const msg = `Hi urbancollection, I'm interested in ${p.name} (${fmt(p.price)}). Please share availability and sizes.`;
  return `
  <article class="p-card reveal">
    <a class="p-media" href="${link}">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <span class="p-badge">${discount(p)}% OFF</span>
    </a>
    <div class="p-body">
      <h3 class="p-name"><a href="${link}">${p.name}</a></h3>
      <div class="p-price"><span class="now">${fmt(p.price)}</span><span class="mrp">${fmt(p.mrp)}</span></div>
      <p class="p-desc">${p.desc}</p>
      <div class="p-meta">
        <div class="sizes" aria-label="Available sizes">${p.sizes.map((s) => `<span>${s}</span>`).join('')}</div>
      </div>
      <a class="btn btn-wa" href="${waLink(msg)}" target="_blank" rel="noopener">
        <svg class="ic"><use href="#i-wa"/></svg> Order on WhatsApp
      </a>
    </div>
  </article>`;
  // <div class="colors" aria-label="Colours">${p.colors.map((c) => `<i style="background:${c}"></i>`).join('')}</div>
}

/* ---------- Image fallbacks ---------- */
document.addEventListener('error', (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || img.dataset.fb) return;
  img.dataset.fb = '1';
  if (img.hasAttribute('data-hide')) img.classList.add('broken');
  else img.src = PLACEHOLDER;
}, true);
function checkBrokenImages() {
  $$('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src') && !img.dataset.fb) {
      img.dispatchEvent(new Event('error'));
    }
  });
}

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: 0.12 });
function observeReveal(root = document) { $$('.reveal:not(.in)', root).forEach((el) => io.observe(el)); }

/* ---------- Header: scroll glass + hero zoom ---------- */
const header = $('#siteHeader');
const hero = $('#hero');
function onScroll() {
  if (header) header.classList.toggle('scrolled', header.hasAttribute('data-solid') || window.scrollY > 30);
  if (hero) {
    const p = Math.min(window.scrollY / hero.offsetHeight, 1);
    hero.style.setProperty('--zoom', (1 + p * 0.18).toFixed(3));
  }
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mega menu (desktop) ---------- */
function buildMega() {
  if (!header) return;
  Object.entries(MEGA).forEach(([key, group]) => {
    const panel = document.createElement('div');
    panel.className = 'mega';
    panel.id = `mega-${key}`;
    const featured = PRODUCTS.find((p) => p.id === group.featured);
    const first = group.cats[0].items[0];
    panel.innerHTML = `
      <div class="mega-cols">
        ${group.cats.map((c) => `
          <div class="mega-col">
            <h5>${c.title}</h5>
            <p>${c.desc}</p>
            <ul>
              ${c.items.map((it) => `<li><a href="products.html?cat=${key}" data-img="images/${it.img}" data-name="${it.name}">${it.name}<span aria-hidden="true">→</span></a></li>`).join('')}
            </ul>
          </div>`).join('')}
        <a class="mega-all" href="products.html?cat=${key}">View all ${group.label}'s shoes →</a>
      </div>
      <div class="mega-preview">
        <img src="images/${first.img}" alt="">
        <div class="mega-caption">
          <span class="mega-tag">${group.label} · <b class="mega-name">${first.name}</b></span>
          ${featured ? `<a class="mega-feat" href="product-detail.html?id=${featured.id}">
            <span>New in: ${featured.name}</span><strong>${fmt(featured.price)}</strong></a>` : ''}
        </div>
      </div>`;
    header.appendChild(panel);

    const img = panel.querySelector('.mega-preview img');
    const tag = panel.querySelector('.mega-name');
    $$('a[data-img]', panel).forEach((a) => {
      const show = () => {
        img.src = a.dataset.img;
        tag.textContent = a.dataset.name;
        $$('a[data-img]', panel).forEach((x) => x.classList.toggle('on', x === a));
      };
      a.addEventListener('mouseenter', show);
      a.addEventListener('focus', show);
    });
  });
}
const megaTriggers = $$('.has-mega');
function openMega(key) {
  header.dataset.open = key;
  megaTriggers.forEach((li) => {
    const on = li.dataset.mega === key;
    li.classList.toggle('active', on);
    li.querySelector('button').setAttribute('aria-expanded', on);
  });
}
function closeMega() {
  if (!header) return;
  delete header.dataset.open;
  megaTriggers.forEach((li) => { li.classList.remove('active'); li.querySelector('button').setAttribute('aria-expanded', 'false'); });
}
megaTriggers.forEach((li) => {
  const key = li.dataset.mega;
  li.addEventListener('mouseenter', () => openMega(key));
  li.addEventListener('focusin', () => openMega(key));
  li.querySelector('button').addEventListener('click', () =>
    header.dataset.open === key ? closeMega() : openMega(key));
});
if (header) header.addEventListener('mouseleave', closeMega);

/* ---------- Full-screen menu ---------- */
const fullMenu = $('#fullMenu');
const menuToggle = $('#menuToggle');
function setMenu(open) {
  if (!fullMenu) return;
  fullMenu.classList.toggle('open', open);
  fullMenu.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.classList.toggle('is-open', open);
  document.body.classList.toggle('no-scroll', open);
}
if (menuToggle) menuToggle.addEventListener('click', () => setMenu(true));
if ($('#fmClose')) $('#fmClose').addEventListener('click', () => setMenu(false));
$$('#fullMenu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMega(); setMenu(false); } });

/* ---------- Latest arrivals ---------- */
if ($('#latestTrack')) {
  $('#latestTrack').innerHTML = PRODUCTS.slice(0, 10).map(productCard).join('');
  const scrollLatest = (dir) => {
    const t = $('#latestTrack');
    t.scrollBy({ left: dir * (t.firstElementChild.offsetWidth + 24), behavior: 'smooth' });
  };
  $('#latestPrev').addEventListener('click', () => scrollLatest(-1));
  $('#latestNext').addEventListener('click', () => scrollLatest(1));
}

/* ---------- Shop grid, sort, filter, search (home + products page) ---------- */
const filters = { q: '', sort: 'default', cat: 'all', sizes: new Set(), max: 999999 };
function applyFilters() {
  if (!$('#productGrid')) return;
  let list = PRODUCTS.filter((p) =>
    (filters.cat === 'all' || p.cat === filters.cat) &&
    p.price <= filters.max &&
    (!filters.q || p.name.toLowerCase().includes(filters.q)) &&
    (filters.sizes.size === 0 || p.sizes.some((s) => filters.sizes.has(String(s)))));
  switch (filters.sort) {
    case 'low': list.sort((a, b) => a.price - b.price); break;
    case 'high': list.sort((a, b) => b.price - a.price); break;
    case 'disc': list.sort((a, b) => discount(b) - discount(a)); break;
    case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  const grid = $('#productGrid');
  grid.innerHTML = list.length ? list.map(productCard).join('')
    : '<p class="empty-msg">No products match these filters. Try resetting them.</p>';
  $('#resultCount').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
  observeReveal(grid);
}
if ($('#productGrid')) {
  const sizes = [...new Set(PRODUCTS.flatMap((p) => p.sizes))].sort((a, b) => a - b);
  $('#fSizes').innerHTML = sizes.map((s) => `<button type="button" data-size="${s}">${s}</button>`).join('');
  $$('#fSizes button').forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.size;
    filters.sizes.has(v) ? filters.sizes.delete(v) : filters.sizes.add(v);
    b.classList.toggle('on'); applyFilters();
  }));
  const priceEl = $('#fPrice');
  const maxP = Math.max(...PRODUCTS.map((p) => p.price));
  priceEl.min = Math.min(...PRODUCTS.map((p) => p.price)); priceEl.max = maxP; priceEl.value = maxP;
  const showPrice = () => { $('#fPriceVal').textContent = fmt(Number(priceEl.value)); };
  filters.max = maxP; showPrice();
  priceEl.addEventListener('input', () => { filters.max = Number(priceEl.value); showPrice(); applyFilters(); });
  $('#fSearch').addEventListener('input', (e) => { filters.q = e.target.value.trim().toLowerCase(); applyFilters(); });
  $('#fSort').addEventListener('change', (e) => { filters.sort = e.target.value; applyFilters(); });
  $('#fCat').addEventListener('change', (e) => { filters.cat = e.target.value; applyFilters(); });
  // URL params: products.html?cat=men&q=runner
  if (qs.get('cat') && ['men', 'women'].includes(qs.get('cat'))) { filters.cat = qs.get('cat'); $('#fCat').value = filters.cat; }
  if (qs.get('q')) { filters.q = qs.get('q').toLowerCase(); $('#fSearch').value = qs.get('q'); }
  $('#fReset').addEventListener('click', () => {
    Object.assign(filters, { q: '', sort: 'default', cat: 'all', max: maxP });
    filters.sizes.clear();
    $('#fSearch').value = ''; $('#fSort').value = 'default'; $('#fCat').value = 'all';
    priceEl.value = maxP; showPrice();
    $$('#fSizes button').forEach((b) => b.classList.remove('on'));
    applyFilters();
  });
  applyFilters();
}

/* ---------- Product detail page ---------- */
function renderProductDetail() {
  const root = $('#pdRoot');
  const id = Number(qs.get('id')) || 1;
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  document.title = `${p.name} | urbancollection`;
  const catName = p.cat === 'men' ? "Men's shoes" : "Women's shoes";
  const colorNames = p.colorNames || p.colors.map(() => '');
  let color = 0, size = null;

  root.innerHTML = `
    <div class="pd-layout">
      <div class="pd-gallery">
        <div class="pd-main"><img id="pdMain" src="${p.gallery[0]}" alt="${p.name}"></div>
        <div class="pd-thumbs">
          ${p.gallery.map((g, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" aria-label="View ${i + 1}"><img src="${g}" alt=""></button>`).join('')}
        </div>
      </div>
      <div class="pd-info">
        <nav class="crumbs"><a href="index.html">Home</a> / <a href="products.html?cat=${p.cat}">${catName}</a> / <span>${p.name}</span></nav>
        <p class="eyebrow">${catName}</p>
        <h1>${p.name}</h1>
        <div class="pd-price">
          <span class="now">${fmt(p.price)}</span>
          <span class="mrp">${fmt(p.mrp)}</span>
          <span class="pd-off">${discount(p)}% OFF</span>
        </div>

        <div class="pd-opt">
          <h4>Colour: <span id="pdColor">${colorNames[0]}</span></h4>
          <div class="swatches">
            ${p.colors.map((c, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" style="background:${c}" aria-label="${colorNames[i]}" data-i="${i}"></button>`).join('')}
          </div>
        </div>

        <div class="pd-opt">
          <h4>Select size <a href="services.html#size-guide" class="sg">Size guide</a></h4>
          <div class="size-chips" id="pdSizes">
            ${p.sizes.map((s) => `<button type="button" data-s="${s}">${s}</button>`).join('')}
          </div>
          <p class="pd-hint" id="pdHint">Please choose a size to continue.</p>
        </div>

        <div class="pd-actions">
          <a class="btn btn-wa" id="pdWa" href="#" target="_blank" rel="noopener">
            <svg class="ic"><use href="#i-wa"/></svg> Order on WhatsApp
          </a>
          <a class="btn btn-ghost" href="products.html?cat=${p.cat}">Back to catalog</a>
        </div>

        <div class="pd-desc">
          <h3>About this shoe</h3>
          <p>${p.desc}</p>
          <p>Sold by <b>${BUSINESS}</b>, Bamiyal, Punjab. Visit the store or order on WhatsApp for fast delivery and friendly help with sizing.</p>
          <ul class="pd-specs">
            <li><span>Material</span><span>${p.material}</span></li>
            <li><span>Care</span><span>${p.care}</span></li>
            <li><span>Category</span><span>${catName}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <section class="pd-related">
      <div class="section-head"><h2>You may also <span class="accent">like</span></h2></div>
      <div class="product-grid related-grid">
        ${PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3).map(productCard).join('')}
      </div>
    </section>`;

  const main = $('#pdMain');
  $$('.pd-thumbs button', root).forEach((b, i) => b.addEventListener('click', () => {
    main.src = p.gallery[i];
    $$('.pd-thumbs button', root).forEach((x) => x.classList.toggle('on', x === b));
  }));
  const updateWa = () => {
    const sel = size ? ` in size ${size}` : '';
    const text = `Hi urbancollection, I want ${p.name}${sel} (${colorNames[color]} ${fmt(p.price)}). Is it available?`;
    $('#pdWa').href = waLink(text);
  };
  $$('.swatches button', root).forEach((b) => b.addEventListener('click', () => {
    color = Number(b.dataset.i);
    $$('.swatches button', root).forEach((x) => x.classList.toggle('on', x === b));
    $('#pdColor').textContent = colorNames[color];
    updateWa();
  }));
  $$('#pdSizes button', root).forEach((b) => b.addEventListener('click', () => {
    size = b.dataset.s;
    $$('#pdSizes button', root).forEach((x) => x.classList.toggle('on', x === b));
    $('#pdHint').textContent = `Selected size: ${size}`;
    updateWa();
  }));
  updateWa();
}
if ($('#pdRoot')) renderProductDetail();

/* ---------- Hero slider ---------- */
const heroSlides = $$('.hero-slide');
const heroThumbs = $$('.hero-thumb');
let heroIndex = 0, heroTimer = null;
function showHero(i) {
  heroIndex = (i + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((s, k) => s.classList.toggle('active', k === heroIndex));
  heroThumbs.forEach((t, k) => { t.classList.toggle('active', k === heroIndex); t.setAttribute('aria-selected', String(k === heroIndex)); });
}
function startHero() { clearInterval(heroTimer); heroTimer = setInterval(() => showHero(heroIndex + 1), 6500); }
function stopHero() { clearInterval(heroTimer); }
if (heroSlides.length) {
  heroThumbs.forEach((t, k) => t.addEventListener('click', () => { showHero(k); startHero(); }));
  hero.addEventListener('mouseenter', stopHero);
  hero.addEventListener('mouseleave', startHero);
  showHero(0); startHero();
}

/* ---------- CTA slider ---------- */
if ($('#ctaSlider')) {
  const wrap = $('#ctaSlider');
  const imgs = $$('img', wrap);
  const dots = $('.cta-dots', wrap);
  dots.innerHTML = imgs.map((_, i) => `<button type="button" aria-label="Image ${i + 1}"></button>`).join('');
  let i = 0, timer;
  const show = (n) => {
    i = (n + imgs.length) % imgs.length;
    imgs.forEach((im, k) => im.classList.toggle('active', k === i));
    $$('button', dots).forEach((d, k) => d.classList.toggle('active', k === i));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 4000); };
  $$('button', dots).forEach((d, k) => d.addEventListener('click', () => { show(k); restart(); }));
  show(0); restart();
  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', restart);
}

/* ---------- Brands marquee ---------- */
if ($('#brandTrack')) {
  const items = BRANDS.map((b) => {
    const file = b.toLowerCase().replace(/\s+/g, '-');
    return `<div class="brand-item"><img src="images/brands/${file}.png" alt="${b} logo" data-hide><span>${b}</span></div>`;
  }).join('');
  $('#brandTrack').innerHTML = items + items;
}

/* ---------- Footer product links ---------- */
if ($('#footerProducts')) {
  $('#footerProducts').innerHTML = PRODUCTS.slice(0, 5)
    .map((p) => `<li><a href="product-detail.html?id=${p.id}">${p.name}</a></li>`).join('');
}

/* ---------- Contact form -> WhatsApp ---------- */
if ($('#contactForm')) {
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const text = ['Hi urbancollection!', `Name: ${f.get('name')}`, `Phone: ${f.get('phone')}`,
      `Email: ${f.get('email') || '-'}`, `Interested in: ${f.get('interest')}`, `Message: ${f.get('message')}`].join('\n');
    window.open(waLink(text), '_blank', 'noopener');
  });
}

/* ---------- Back to top ---------- */
if ($('#backTop')) $('#backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Init ---------- */
buildMega();
onScroll();
observeReveal();
checkBrokenImages();
