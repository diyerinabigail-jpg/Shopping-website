import Icon from './Icon.jsx';
import { useShop } from '../hooks/useShop.js';

export default function Header({ search, onSearch, onOpenCart, onOpenWishlist, onOpenAccount }) {
  const { cartCount, wishlist } = useShop();

  return (
    <header className="main-header">
      <label className="search-box">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search for products, brands and more..."
          aria-label="Search products"
        />
        <Icon name="search" size={20} />
      </label>
      <div className="header-actions">
        <button className="header-action wishlist-action" onClick={onOpenWishlist}>
          <Icon name="heart" size={19} /><span>Wishlist</span>
          {wishlist.length > 0 && <i className="tiny-count">{wishlist.length}</i>}
        </button>
        <button className="header-icon notification-button" aria-label="Notifications">
          <Icon name="bell" size={20} /><i className="notification-dot" />
        </button>
        <button className="header-icon desktop-cart-button" onClick={onOpenCart} aria-label={`Open cart, ${cartCount} items`}>
          <Icon name="bag" size={20} />{cartCount > 0 && <i className="tiny-count">{cartCount}</i>}
        </button>
        <button className="profile-button" onClick={onOpenAccount} aria-label="Your profile">
          <span className="avatar">A</span>
          <span className="profile-name">Alina Putri</span>
          <span className="profile-chevron">⌄</span>
        </button>
        <button className="header-icon mobile-cart-button" onClick={onOpenCart} aria-label={`Open cart, ${cartCount} items`}>
          <Icon name="bag" size={20} />{cartCount > 0 && <i className="tiny-count">{cartCount}</i>}
        </button>
      </div>
    </header>
  );
}
