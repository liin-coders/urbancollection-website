/* ==========================================================
   urbancollection – shared product & menu data
   Used by every page. Edit here to change products, mega menu
   content, brands and WhatsApp number.
   ========================================================== */

const WA_NUMBER = '916280903604';
const BUSINESS = 'urbancollection';

/* ---------- Products (12) ----------
   img: main image, gallery: extra views shown as thumbnails on product-detail */
const PRODUCTS = [
  { id: 1, name: 'Urban Runner Pro', cat: 'men', price: 2499, mrp: 3499, sizes: [7, 8, 9, 10, 11], colors: ['#0D0E12', '#F5F0E6', '#9AA0AE'], colorNames: ['Black', 'Cream', 'Grey'], img: 'images/product-1.jpg', gallery: ['images/product-1.jpg', 'images/product-1-2.jpg', 'images/product-1-3.jpg', 'images/product-1-4.jpg'], desc: 'Breathable knit upper and a cushioned ZoomX-style foam sole for daily runs and gym sessions. Lightweight, supportive and built to keep up with your routine.', material: 'Knit mesh upper, foam midsole, rubber outsole', care: 'Wipe with a damp cloth. Air dry away from direct heat.' },
  { id: 2, name: 'Street Flex Low', cat: 'men', price: 1899, mrp: 2599, sizes: [7, 8, 9, 10], colors: ['#F5F0E6', '#0D0E12'], colorNames: ['Cream', 'Black'], img: 'images/product-2.jpg', gallery: ['images/product-2.jpg', 'images/product-2-2.jpg', 'images/product-2-3.jpg', 'images/product-2-4.jpg'], desc: 'Low-profile everyday sneaker with flexible grooves and a soft padded collar. Easy to style with jeans, chinos or shorts.', material: 'Synthetic upper, textile lining, rubber sole', care: 'Spot clean with mild soap and water.' },
  { id: 3, name: 'Classic Leather Derby', cat: 'men', price: 3299, mrp: 4499, sizes: [8, 9, 10], colors: ['#4A2F1D', '#0D0E12'], colorNames: ['Brown', 'Black'], img: 'images/product-3.jpg', gallery: ['images/product-3.jpg', 'images/product-3-2.jpg', 'images/product-3-3.jpg', 'images/product-3-4.jpg'], desc: 'Full-grain leather derby with a polished finish for office, events and occasions. Comfortable enough for all-day wear.', material: 'Suede/leather upper, rubber outsole', care: 'Use a suede brush and leather conditioner regularly.' },
  { id: 4, name: 'Velocity Mesh Trainer', cat: 'men', price: 2199, mrp: 2999, sizes: [7, 8, 9, 10, 11], colors: ['#0D0E12', '#D9D6CC'], colorNames: ['Black', 'Stone'], img: 'images/product-4.jpg', gallery: ['images/product-4.jpg', 'images/product-4-2.jpg', 'images/product-4-3.jpg', 'images/product-4-4.jpg'], desc: 'Engineered mesh trainer with a responsive midsole for training, cardio and gym work.', material: 'Engineered mesh, EVA midsole', care: 'Hand wash with cold water. Air dry.' },
  { id: 5, name: 'Metro Court Sneaker', cat: 'men', price: 2799, mrp: 3699, sizes: [8, 9, 10], colors: ['#FFFFFF', '#0D0E12'], colorNames: ['White', 'Black'], img: 'images/product-5.jpg', gallery: ['images/product-5.jpg', 'images/product-5-2.jpg', 'images/product-5-3.jpg', 'images/product-5-4.jpg'], desc: 'Clean court-style sneaker that pairs with denim, chinos and everything in between.', material: 'Leather-look upper, rubber sole', care: 'Clean with a soft brush and a little mild soap.' },
  { id: 6, name: 'Aero Knit Sport', cat: 'men', price: 1699, mrp: 2299, sizes: [7, 8, 9], colors: ['#9AA0AE', '#F5F0E6'], colorNames: ['Grey', 'Cream'], img: 'images/product-6.jpg', gallery: ['images/product-6.jpg', 'images/product-6-2.jpg', 'images/product-6-3.jpg', 'images/product-6-4.jpg'], desc: 'Light sock-fit knit sport shoe with breathable ventilation for long days on your feet.', material: 'Knit upper, foam sole', care: 'Hand wash, air dry.' },
  { id: 7, name: 'Cloud Step Women', cat: 'women', price: 1999, mrp: 2799, sizes: [4, 5, 6, 7], colors: ['#F5F0E6', '#0D0E12'], colorNames: ['Cream', 'Black'], img: 'images/product-7.jpg', gallery: ['images/product-7.jpg', 'images/product-7-2.jpg', 'images/product-7-3.jpg', 'images/product-7-4.jpg'], desc: 'Soft cushioned sneaker for all-day comfort with a sleek, modern silhouette.', material: 'Leather-look upper, cushioned sole', care: 'Wipe clean with a dry cloth.' },
  { id: 8, name: 'Bloom Ballet Flat', cat: 'women', price: 1499, mrp: 1999, sizes: [4, 5, 6], colors: ['#E7C9B5', '#0D0E12'], colorNames: ['Blush', 'Black'], img: 'images/product-8.jpg', gallery: ['images/product-8.jpg', 'images/product-8-2.jpg', 'images/product-8-3.jpg', 'images/product-8-4.jpg'], desc: 'Lightweight ballet flat with a flexible sole, ideal for work and casual outings.', material: 'Synthetic upper, flexible sole', care: 'Wipe with a damp cloth.' },
  { id: 9, name: 'Luna Strap Sandal', cat: 'women', price: 1399, mrp: 1899, sizes: [4, 5, 6, 7], colors: ['#0D0E12', '#F5F0E6'], colorNames: ['Black', 'Cream'], img: 'images/product-9.jpg', gallery: ['images/product-9.jpg', 'images/product-9-2.jpg', 'images/product-9-3.jpg', 'images/product-9-4.jpg'], desc: 'Minimal strap sandal with an adjustable buckle and a comfortable footbed.', material: 'Synthetic strap, cushioned footbed', care: 'Wipe clean. Keep away from water for long periods.' },
  { id: 10, name: 'Pulse Runner Women', cat: 'women', price: 2299, mrp: 3199, sizes: [4, 5, 6, 7], colors: ['#F5F0E6', '#9AA0AE'], colorNames: ['Cream', 'Grey'], img: 'images/product-10.jpg', gallery: ['images/product-10.jpg', 'images/product-10-2.jpg', 'images/product-10-3.jpg', 'images/product-10-4.jpg'], desc: 'Responsive running shoe with a supportive fit and a cushioned heel.', material: 'Engineered mesh, foam midsole', care: 'Hand wash, air dry.' },
  { id: 11, name: 'Heritage Leather Heel', cat: 'women', price: 2999, mrp: 3999, sizes: [5, 6, 7], colors: ['#0D0E12', '#4A2F1D'], colorNames: ['Black', 'Brown'], img: 'images/product-11.jpg', gallery: ['images/product-11.jpg', 'images/product-11-2.jpg', 'images/product-11-3.jpg', 'images/product-11-4.jpg'], desc: 'Elegant leather block heel with a secure ankle strap for evenings and celebrations.', material: 'Leather upper, block heel', care: 'Use leather conditioner. Store in a dust bag.' },
  { id: 12, name: 'Court Pro Sport', cat: 'women', price: 2099, mrp: 2899, sizes: [4, 5, 6, 7], colors: ['#FFFFFF', '#D9D6CC'], colorNames: ['White', 'Stone'], img: 'images/product-12.jpg', gallery: ['images/product-12.jpg', 'images/product-12-2.jpg', 'images/product-12-3.jpg', 'images/product-12-4.jpg'], desc: 'Sport-inspired court sneaker with grip outsole and breathable lining.', material: 'Leather-look upper, rubber outsole', care: 'Clean with a soft brush.' },
];

/* ---------- Mega menu: 4 categories per gender, 2 links each.
   Each link has its own preview image (shown big on hover). ---------- */
const MEGA = {
  men: {
    label: 'Men',
    featured: 1,
    cats: [
      {
        title: 'Running', desc: 'Road, gym and daily runners with cushioned comfort.', items: [
          { name: 'Road Running', img: 'mega-men-1.jpg' }, { name: 'Gym & Training', img: 'mega-men-2.jpg' }]
      },
      {
        title: 'Sneakers', desc: 'Everyday street sneakers that go with everything.', items: [
          { name: 'Low-top Sneakers', img: 'mega-men-3.jpg' }, { name: 'Court Classics', img: 'mega-men-4.jpg' }]
      },
      {
        title: 'Formal & Leather', desc: 'Derbies and leather shoes for work and occasions.', items: [
          { name: 'Leather Derbies', img: 'mega-men-5.jpg' }, { name: 'Suede Casuals', img: 'mega-men-6.jpg' }]
      },
      {
        title: 'Sports & Sandals', desc: 'Sports shoes and comfortable sandals for every day.', items: [
          { name: 'Sports Shoes', img: 'mega-men-7.jpg' }, { name: 'Sport Sandals', img: 'mega-men-8.jpg' }]
      },
    ],
  },
  women: {
    label: 'Women',
    featured: 7,
    cats: [
      {
        title: 'Running', desc: 'Lightweight running and training shoes.', items: [
          { name: 'Pulse Running', img: 'mega-women-1.jpg' }, { name: 'Cushion Walkers', img: 'mega-women-2.jpg' }]
      },
      {
        title: 'Sneakers', desc: 'Chunky and classic sneakers in soft colours.', items: [
          { name: 'Retro Sneakers', img: 'mega-women-3.jpg' }, { name: 'Court Sneakers', img: 'mega-women-4.jpg' }]
      },
      {
        title: 'Flats & Sandals', desc: 'Ballet flats and strap sandals for comfort.', items: [
          { name: 'Ballet Flats', img: 'mega-women-5.jpg' }, { name: 'Strap Sandals', img: 'mega-women-6.jpg' }]
      },
      {
        title: 'Heels & Party', desc: 'Leather heels for evenings and celebrations.', items: [
          { name: 'Block Heels', img: 'mega-women-7.jpg' }, { name: 'Ankle Strap', img: 'mega-women-8.jpg' }]
      },
    ],
  },
};

/* ---------- Brands (logos in images/brands/, text shown if logo missing) ---------- */
const BRANDS = ['Nike', 'Puma', 'reebok', 'Adidas', 'jordan', 'crocs', 'skechers', 'newbalance', 'bata'];
