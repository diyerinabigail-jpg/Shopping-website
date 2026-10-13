import { useEffect, useMemo, useState } from 'react';
import { formatPrice, getColorName, products } from '../data.jsx';
import { useShop } from '../hooks/useShop.js';
import Icon from './Icon.jsx';
import ProductCard from './ProductCard.jsx';

const productCopy = (product) => {
  const type = product.category === 'jewelry'
    ? 'accessory'
    : product.category === 'kids'
      ? 'piece'
      : 'wardrobe essential';
  return `A considered ${type} designed for everyday confidence. Made with thoughtful details and a comfortable, easy-to-wear feel, it brings a little something special to your daily edit.`;
};

const productFeatures = (product) => [
  'Thoughtfully selected materials with a soft, comfortable feel',
  'Easy-to-style design for everyday wear',
  'Carefully finished details for a polished look',
  'Made to pair effortlessly with your wardrobe',
  'A KIRALUX favorite, selected for lasting style',
];

function Gallery({ product }) {
  const images = useMemo(() => [product.image, product.image, product.image], [product.image]);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setZoomOpen(false);
  }, [product.id]);

  useEffect(() => {
    if (!zoomOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setZoomOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomOpen]);

  const stepImage = (direction) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <>
      <section className="detail-gallery" aria-label={`${product.name} product images`}>
        <div className="detail-main-image">
          <img className={`detail-main-photo photo-view-${activeImage}`} src={images[activeImage]} alt={`${product.name} detail view ${activeImage + 1}`} />
          <button className="gallery-expand" onClick={() => setZoomOpen(true)} aria-label="Expand product image"><Icon name="expand" size={19} /></button>
          <button className="gallery-arrow gallery-previous" onClick={() => stepImage(-1)} aria-label="Previous product image">‹</button>
          <button className="gallery-arrow gallery-next" onClick={() => stepImage(1)} aria-label="Next product image">›</button>
        </div>
        <div className="detail-thumbnails">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              className={`detail-thumbnail ${activeImage === index ? 'active' : ''}`}
              onClick={() => setActiveImage(index)}
              aria-label={`Show product image ${index + 1}`}
            >
              <img className={`thumbnail-view-${index}`} src={src} alt="" />
            </button>
          ))}
        </div>
      </section>
      {zoomOpen && (
        <div className="image-zoom" role="dialog" aria-modal="true" aria-label="Expanded product image" onClick={() => setZoomOpen(false)}>
          <button onClick={() => setZoomOpen(false)} aria-label="Close expanded image"><Icon name="close" size={23} /></button>
          <img src={images[activeImage]} alt={product.name} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function ProductBenefits() {
  const benefits = [
    { icon: 'shield', title: 'Secure Payment', detail: '100% secure checkout' },
    { icon: 'box', title: 'Easy Returns', detail: '30-day return policy' },
    { icon: 'truck', title: 'Free Shipping', detail: 'On orders over ₦50k' },
    { icon: 'headset', title: '24/7 Support', detail: 'Dedicated support' },
  ];

  return (
    <div className="detail-benefits">
      {benefits.map((benefit) => (
        <div className="detail-benefit" key={benefit.title}>
          <Icon name={benefit.icon} size={26} />
          <span><b>{benefit.title}</b><small>{benefit.detail}</small></span>
        </div>
      ))}
    </div>
  );
}

function ProductInformation({ product, onAdded, onShowReviews }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const isSaved = wishlist.includes(product.id);
  const sizeOptions = product.category === 'jewelry'
    ? ['One size']
    : product.category === 'kids'
      ? ['2–3Y', '4–5Y', '6–7Y', '8–9Y']
      : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    setQuantity(1);
    setSelectedColor(product.colors[0]);
    setSelectedSize('');
  }, [product.id, product.colors]);

  const shareProduct = async () => {
    const shareData = { title: product.name, text: `Take a look at ${product.name} at KIRALUX.`, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('Product shared');
        window.setTimeout(() => setShareMessage(''), 1800);
        return;
      }
      if (!navigator.clipboard?.writeText) {
        setCopied(false);
        setShareMessage('Sharing is unavailable in this browser.');
        window.setTimeout(() => setShareMessage(''), 2400);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setShareMessage('Link copied to clipboard');
      window.setTimeout(() => setCopied(false), 1800);
      window.setTimeout(() => setShareMessage(''), 1800);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setCopied(false);
        setShareMessage('Could not share this product.');
        window.setTimeout(() => setShareMessage(''), 2400);
      }
    }
  };

  const handleAdd = () => {
    if (product.category !== 'jewelry' && !selectedSize) {
      document.querySelector('.detail-sizes')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    addToCart(product.id, quantity, { size: selectedSize, color: selectedColor });
    onAdded();
  };

  return (
    <section className="detail-information">
      <div className="detail-badge-row">
        <span className="detail-label">{product.originalPrice ? 'Limited offer' : product.badge || 'KIRALUX PICK'}</span>
        <button className="share-product" onClick={shareProduct} aria-label="Share product"><Icon name="share" size={19} /> <span>{copied ? 'Copied!' : 'Share'}</span></button>
      </div>
      <h1>{product.name}</h1>
      <div className="detail-rating">
        <span className="rating-star">★</span><b>{product.rating.toFixed(1)}</b>
        <button className="detail-review-link" onClick={onShowReviews}>{product.reviews} reviews</button>
        <i />
        <span>{(product.reviews * 9 + 150).toLocaleString()}+ sold</span>
      </div>
      <div className="detail-price-row">
        <strong>{formatPrice(product.price)}</strong>
        {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
        {product.originalPrice && <span className="detail-discount">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>}
      </div>
      <p className="detail-description">{productCopy(product)}</p>

      <div className="detail-option detail-colors">
        <div className="option-title">Color: <span>{getColorName(selectedColor)}</span></div>
        <div className="detail-color-list">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`detail-color ${selectedColor === color ? 'selected' : ''}`}
              style={{ '--color': color }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${getColorName(color)}`}
            />
          ))}
        </div>
      </div>

      {product.category !== 'jewelry' && (
        <div className="detail-option detail-sizes">
          <div className="option-title">Size <span>{selectedSize ? `· ${selectedSize}` : '· Select a size'}</span></div>
          <div className="detail-size-list">
            {sizeOptions.map((size) => (
              <button className={selectedSize === size ? 'selected' : ''} key={size} onClick={() => setSelectedSize(size)}>{size}</button>
            ))}
            <button className="size-guide" onClick={() => setSizeGuideOpen(true)}>Size guide</button>
          </div>
          {sizeGuideOpen && (
            <div className="size-guide-overlay" role="dialog" aria-modal="true" aria-label="Size guide">
              <section className="size-guide-dialog">
                <div><h2>Size guide</h2><button onClick={() => setSizeGuideOpen(false)} aria-label="Close size guide"><Icon name="close" /></button></div>
                <p>Use this guide to find your comfortable fit.</p>
                <table><thead><tr><th>Size</th><th>Fit</th><th>Availability</th></tr></thead><tbody>{sizeOptions.map((size) => <tr key={size}><td>{size}</td><td>{size === 'XS' || size === '2–3Y' ? 'Extra small' : size === 'XL' || size === 'XXL' || size === '8–9Y' ? 'Relaxed' : 'Regular'}</td><td>In stock</td></tr>)}</tbody></table>
              </section>
            </div>
          )}
        </div>
      )}

      <div className="purchase-options">
        <div className="quantity-block">
          <span>Quantity</span>
          <div className="detail-quantity">
            <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Icon name="minus" size={17} /></button>
            <b>{quantity}</b>
            <button onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Increase quantity"><Icon name="plus" size={17} /></button>
          </div>
        </div>
        <div className="delivery-note"><Icon name="truck" size={28} /><span><b>Ready for your wardrobe</b><small>Free shipping on orders over ₦50,000</small></span></div>
      </div>
      {product.category !== 'jewelry' && !selectedSize && <p className="size-required">Choose a size to add this item to your bag.</p>}
      <div className="detail-actions">
        <button className="detail-add-button" onClick={handleAdd}><Icon name="bag" size={20} /> Add to cart · {formatPrice(product.price * quantity)}</button>
        <button className={`detail-wishlist-button ${isSaved ? 'saved' : ''}`} onClick={() => toggleWishlist(product.id)}>
          <Icon name="heart" size={21} /> {isSaved ? 'Saved to wishlist' : 'Add to wishlist'}
        </button>
      </div>
      <ProductBenefits />
      {shareMessage && <p className="share-message" role="status">{shareMessage}</p>}
    </section>
  );
}

function ProductTabs({ product, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: `Reviews (${product.reviews})` },
    { id: 'shipping', label: 'Shipping & returns' },
  ];

  return (
    <section className="detail-tabs-card">
      <div className="detail-tab-content">
        <div className="detail-tabs" role="tablist" aria-label="Product information">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'details' && (
          <div className="tab-copy">
            <p>{productCopy(product)} The {product.name} pairs beautifully with your everyday favorites and brings an easy, considered finish to every look.</p>
            <ul>{productFeatures(product).map((feature) => <li key={feature}><Icon name="check" size={17} />{feature}</li>)}</ul>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="review-summary" id="product-reviews">
            <div className="review-score"><b>{product.rating.toFixed(1)}</b><span>★★★★★</span><small>Based on {product.reviews} customer reviews</small></div>
            <div className="review-bars">{[5, 4, 3, 2, 1].map((stars, index) => <div key={stars}><span>{stars} ★</span><i><b style={{ width: `${[82, 13, 4, 1, 0][index]}%` }} /></i><small>{Math.round(product.reviews * [0.82, 0.13, 0.04, 0.01, 0][index])}</small></div>)}</div>
            <p>Customers love the thoughtful details and everyday comfort.</p>
          </div>
        )}
        {activeTab === 'shipping' && (
          <div className="shipping-copy">
            <p><b>Delivery:</b> Orders are prepared within 1–2 business days. Delivery timing and fees are shown at checkout.</p>
            <p><b>Returns:</b> If it’s not quite right, request a return within 30 days of delivery. Items should be unworn and in their original condition.</p>
            <p><b>Need help?</b> Our support team is here around the clock at hello@kiralux.com.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductDetail({ product, relatedProducts, onBack, onOpenProduct }) {
  const suggestions = relatedProducts.length >= 3
    ? relatedProducts
    : [...relatedProducts, ...products.filter((item) => item.id !== product.id && !relatedProducts.some((related) => related.id === item.id))].slice(0, 3);
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="product-detail-page">
      <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
        <button onClick={onBack}>Home</button><span>/</span>
        <button onClick={onBack}>{product.category === 'jewelry' ? 'Accessories' : product.category[0].toUpperCase() + product.category.slice(1)}</button><span>/</span>
        <b>{product.name}</b>
      </nav>
      <section className="detail-overview">
        <Gallery product={product} />
        <ProductInformation product={product} onShowReviews={() => {
          setActiveTab('reviews');
          document.getElementById('product-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }} onAdded={() => {
          setNotice('Added to your cart');
          window.setTimeout(() => setNotice(''), 1800);
        }} />
        {notice && <div className="detail-toast" role="status"><Icon name="check" size={16} />{notice}</div>}
      </section>
      <section className="detail-lower">
        <ProductTabs product={product} activeTab={activeTab} setActiveTab={setActiveTab} />
        <section className="detail-recommendations">
          <div className="detail-recommendation-heading"><h2>You may also love</h2><button onClick={onBack}>View all <Icon name="chevron" size={15} /></button></div>
          <div className="detail-recommendation-grid">
            {suggestions.map((item) => <ProductCard key={item.id} product={item} onOpenProduct={onOpenProduct} />)}
          </div>
        </section>
      </section>
    </div>
  );
}
