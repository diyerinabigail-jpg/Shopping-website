import { useShop } from '../hooks/useShop.js';
import Icon from './Icon.jsx';

export default function MobileNav({ currentPage, onHome, onOpenCart, onOpenCategories, onOpenWishlist, onOpenAccount }) {
  const { cartCount, wishlist } = useShop();
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <button className={currentPage === 'home' ? 'active' : ''} onClick={onHome}><Icon name="home" size={20} /><span>Home</span></button>
      <button className={currentPage === 'shop' ? 'active' : ''} onClick={onOpenCategories}><Icon name="grid" size={20} /><span>Categories</span></button>
      <button className="mobile-nav-cart" onClick={onOpenCart}><Icon name="bag" size={20} /><span>Cart</span>{cartCount > 0 && <i>{cartCount}</i>}</button>
      <button onClick={onOpenWishlist}><Icon name="heart" size={20} /><span>Wishlist</span>{wishlist.length > 0 && <i>{wishlist.length}</i>}</button>
      <button className={currentPage === 'account' ? 'active' : ''} onClick={onOpenAccount}><Icon name="user" size={20} /><span>Account</span></button>
    </nav>
  );
}
