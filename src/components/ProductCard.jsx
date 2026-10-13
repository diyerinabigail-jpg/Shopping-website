import { useShop } from '../hooks/useShop.js';
import Icon from './Icon.jsx';
import { formatPrice } from '../data.jsx';

export default function ProductCard({ product, onOpenProduct }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const isSaved = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button className="product-open-image" onClick={() => onOpenProduct?.(product)} aria-label={`View ${product.name} details`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        </button>
        {product.badge && <span className={`product-badge ${product.badge === 'NEW' ? 'badge-new' : ''}`}>{product.originalPrice ? `-${Math.round((1 - product.price / product.originalPrice) * 100)}%` : product.badge}</span>}
        <button
          className={`product-wishlist ${isSaved ? 'is-saved' : ''}`}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          <Icon name="heart" size={16} />
        </button>
        <button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to cart`}>
          <Icon name="bag" size={17} />
        </button>
      </div>
      <div className="product-info">
        <button className="product-title-button" onClick={() => onOpenProduct?.(product)}>{product.name}</button>
        <div className="product-meta"><span>{product.category === 'jewelry' ? 'Accessories' : product.category === 'kids' ? 'Kidswear' : product.category === 'men' ? "Men's style" : "Women's style"}</span>{product.originalPrice && <span className="discount-label">On sale</span>}</div>
        <div className="product-rating"><span className="rating-star">★</span><b>{product.rating}</b><span>({product.reviews})</span></div>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="original-price">{formatPrice(product.originalPrice)}</span>}
          <span className="color-swatches" aria-label="Available colors">
            {product.colors.slice(0, 3).map((color) => <i key={color} style={{ backgroundColor: color }} />)}
          </span>
        </div>
      </div>
    </article>
  );
}
