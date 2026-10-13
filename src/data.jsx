const image = (filename) => `${import.meta.env.BASE_URL}${encodeURIComponent(filename)}`;

export const categories = [
  { id: 'all', label: 'All', icon: '✳' },
  { id: 'women', label: 'Fashion', icon: '♧' },
  { id: 'jewelry', label: 'Jewelry', icon: '♢' },
  { id: 'men', label: 'Essentials', icon: '◉' },
  { id: 'kids', label: 'Kids', icon: '♡' },
  { id: 'sale', label: 'Sale', icon: '▦' },
];

export const products = [
  { id: 4, name: 'Denim Everyday Jacket', price: 20000, originalPrice: 40000, category: 'women', rating: 4.8, reviews: 124, image: image('blue jean denim women jacket.jpg'), badge: '-50%', colors: ['#8796a2', '#d8c2a9', '#22232b'] },
  { id: 8, name: 'Relaxed Fit Hoodie', price: 15000, category: 'men', rating: 4.9, reviews: 90, image: image('grey flatlayed unisex hoodie.jpg'), badge: 'NEW', colors: ['#777b80', '#24232a', '#d6d0c9'] },
  { id: 2, name: 'Cuban Link Earrings', price: 5000, category: 'jewelry', rating: 4.7, reviews: 86, image: image('gold cuban earrings.jpg'), badge: 'BESTSELLER', colors: ['#d6b25c', '#c1c1c1'] },
  { id: 21, name: 'Soft Knit Sweater', price: 14000, category: 'women', rating: 4.9, reviews: 170, image: image('white knitted wool women sweater.jpg'), colors: ['#e7e3da', '#8c8c87', '#bca99b'] },
  { id: 3, name: 'Minimal Gold Necklace', price: 12000, category: 'jewelry', rating: 4.8, reviews: 68, image: image('gold flat minimalist necklace.jpg'), colors: ['#d6b25c', '#c4c4c4'] },
  { id: 23, name: 'Modern Red Blazer', price: 35000, category: 'women', rating: 4.8, reviews: 112, image: image('women red blazers.jpg'), badge: 'TRENDING', colors: ['#9d323d', '#252631'] },
  { id: 19, name: 'Leaf Detail Blouse', price: 6000, category: 'women', rating: 4.6, reviews: 48, image: image('white flare hand top with leaf designs.jpg'), colors: ['#e5e0d8', '#d6af95'] },
  { id: 18, name: 'Little Explorer Set', price: 27000, category: 'kids', rating: 4.9, reviews: 74, image: image('boys 3 in 1 brown piece.jpg'), colors: ['#ad7348', '#7b8292'] },
  { id: 9, name: 'Classic White Polo', price: 12000, originalPrice: 19000, category: 'men', rating: 4.7, reviews: 102, image: image('men white polo.jpg'), badge: '-35%', colors: ['#f3f1ec', '#181a21', '#526577'] },
  { id: 12, name: 'Rose Gold Ring Set', price: 9000, category: 'jewelry', rating: 4.8, reviews: 59, image: image('rose gold heart shaped 3 ring set.jpg'), colors: ['#cc9a87', '#d6b25c'] },
  { id: 17, name: 'Faux Fur Statement Coat', price: 35000, category: 'women', rating: 4.8, reviews: 92, image: image('women grey fur jacket.jpg'), colors: ['#85817e', '#29272c'] },
  { id: 20, name: 'Sunny Day Kids Tee', price: 13000, category: 'kids', rating: 4.7, reviews: 37, image: image('yellow unisex children shirt 1.jpg'), colors: ['#efc850', '#e7e2d4'] },
  { id: 6, name: 'Golden Leaf Pendant', price: 12000, category: 'jewelry', rating: 4.9, reviews: 81, image: image('gold leaf pendant  necklace.jpg'), colors: ['#d6b25c'] },
  { id: 5, name: 'Everyday Denim Jeans', price: 25000, category: 'women', rating: 4.8, reviews: 95, image: image('blue jean denim women trouser.jpg'), colors: ['#526883', '#212733'] },
  { id: 26, name: 'Kids Denim Trousers', price: 9000, category: 'kids', rating: 4.6, reviews: 41, image: image('children denim jeans.jpg'), colors: ['#526883', '#9cabb9'] },
  { id: 10, name: 'Essential Knit Top', price: 15000, category: 'men', rating: 4.8, reviews: 56, image: image('men white sweater top.jpg'), colors: ['#e6e2dc', '#24232a'] },
  { id: 7, name: 'Emerald Necklace & Earring Set', price: 30000, category: 'jewelry', rating: 4.9, reviews: 53, image: image('gold necklace and earring with emerald green embedded stones.jpg'), colors: ['#d6b25c', '#19765f'] },
  { id: 11, name: 'Red Leaf Print Dress', price: 11000, category: 'women', rating: 4.7, reviews: 63, image: image('red leaf imprints short gown.jpg'), colors: ['#a7544c', '#e7ded1'] },
  { id: 13, name: 'Cloud Nine Hoodie', price: 16000, category: 'women', rating: 4.8, reviews: 77, image: image('unisex white flatlayed hoodie.jpg'), colors: ['#edeae4', '#b8b4ac'] },
  { id: 14, name: 'Ruffle & Knit Co-ord', price: 70000, originalPrice: 85000, category: 'women', rating: 4.9, reviews: 36, image: image('white and black sweater top with blue ruffled jeans.jpg'), badge: '-18%', colors: ['#e1ded8', '#7890aa'] },
  { id: 22, name: 'Diamond Detail Bracelet', price: 19000, category: 'jewelry', rating: 4.8, reviews: 49, image: image('women diamond studded bracelet.jpg'), colors: ['#d6b25c', '#c5c8ce'] },
  { id: 24, name: 'The Classic Blue Jacket', price: 14000, category: 'women', rating: 4.6, reviews: 34, image: image('women jacket.jpg'), colors: ['#7f8991', '#c3ac99'] },
  { id: 25, name: 'Burgundy Day Dress', price: 18000, category: 'women', rating: 4.8, reviews: 62, image: image('burgundy flared short gown.jpg'), colors: ['#702f43', '#24232a'] },
  { id: 27, name: 'Bow Detail Party Dress', price: 11000, category: 'kids', rating: 4.9, reviews: 51, image: image('girls white bowed gown.jpg'), colors: ['#f0ece5', '#dba9b6'] },
  { id: 15, name: 'Weekend Grey Hoodie', price: 17000, category: 'women', rating: 4.7, reviews: 45, image: image('grey flatlayed unisex hoodie.jpg'), colors: ['#777b80', '#24232a'] },
  { id: 16, name: 'Unisex Everyday Hoodie', price: 15000, category: 'men', rating: 4.8, reviews: 73, image: image('unisex white flatlayed hoodie.jpg'), colors: ['#edeae4', '#56565a'] },
  { id: 1, name: 'Mouse Ear Puffer Jacket', price: 11000, originalPrice: 25000, category: 'kids', rating: 4.9, reviews: 129, image: image('gold brown mouse-shaped ear coat children jacket.jpg'), badge: '-56%', colors: ['#bd8048', '#d4bd9b'] },
];

export const formatPrice = (amount) =>
  `₦${Number(amount).toLocaleString('en-NG')}`;

const colorLabels = {
  '#8796a2': 'Slate Blue', '#d8c2a9': 'Warm Sand', '#22232b': 'Midnight',
  '#777b80': 'Charcoal', '#24232a': 'Black', '#d6d0c9': 'Oatmeal',
  '#d6b25c': 'Gold', '#c1c1c1': 'Silver', '#e7e3da': 'Soft Ivory',
  '#8c8c87': 'Stone', '#bca99b': 'Taupe', '#c4c4c4': 'Silver',
  '#9d323d': 'Ruby Red', '#252631': 'Midnight', '#e5e0d8': 'Ivory',
  '#d6af95': 'Blush', '#ad7348': 'Caramel', '#7b8292': 'Slate',
  '#f3f1ec': 'Ivory', '#181a21': 'Black', '#526577': 'Denim Blue',
  '#cc9a87': 'Rose Gold', '#efc850': 'Sunshine', '#e7e2d4': 'Oatmeal',
  '#526883': 'Denim Blue', '#212733': 'Ink', '#9cabb9': 'Sky Grey',
  '#e6e2dc': 'Soft Ivory', '#19765f': 'Emerald', '#a7544c': 'Terracotta',
  '#edeae4': 'Ivory', '#b8b4ac': 'Warm Grey', '#e1ded8': 'Cream',
  '#7890aa': 'Blue Grey', '#c5c8ce': 'Silver', '#7f8991': 'Blue Grey',
  '#c3ac99': 'Warm Taupe', '#702f43': 'Burgundy', '#f0ece5': 'Ivory',
  '#dba9b6': 'Blush', '#56565a': 'Charcoal', '#bd8048': 'Caramel',
  '#d4bd9b': 'Sand',
};

export const getColorName = (color) =>
  colorLabels[color?.toLowerCase()] || 'Selected color';

export function matchesColorFamily(hex, colorName) {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return false;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  const brightness = (red + green + blue) / 3;

  switch (colorName) {
    case 'Black': return brightness < 65;
    case 'White': return Math.min(red, green, blue) > 215;
    case 'Cream': return red > 180 && green > 150 && blue > 115 && red >= green && green >= blue;
    case 'Pink': return red > 160 && blue > green && red - green > 18;
    case 'Lilac': return red > 125 && blue > 135 && Math.abs(red - blue) < 80 && blue >= green;
    case 'Blue': return blue > red * 1.15 && blue > green * 1.05;
    case 'Green': return green > red * 1.12 && green > blue * 1.05;
    case 'Brown': return red > green * 1.12 && green > blue * 1.05 && brightness < 190;
    case 'Red': return red > green * 1.3 && red > blue * 1.15;
    default: return false;
  }
}

export const getProductById = (id) =>
  products.find((product) => product.id === Number(id));
