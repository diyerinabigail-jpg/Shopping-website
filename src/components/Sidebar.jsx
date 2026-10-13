import { categories } from '../data.jsx';
import { useShop } from '../hooks/useShop.js';
import Icon from './Icon.jsx';

const links = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Categories', icon: 'grid', href: '/shop?category=women' },
  { label: 'Deals', icon: 'tag', href: '/shop?category=sale', badge: 'Hot' },
  { label: 'New Arrivals', icon: 'bag', href: '/shop' },
  { label: 'Best Sellers', icon: 'star', href: '/shop?sort=rating' },
  { label: 'Brands', icon: 'heart', href: '/shop' },
  { label: 'Collections', icon: 'grid', href: '/shop' },
];

export default function Sidebar({ page = 'home', onNavigate, onOpenWishlist }) {
  const { wishlist } = useShop();

  return (
    <aside className="sidebar">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); onNavigate('/'); }} aria-label="KIRALUX home">
        <span className="brand-mark">K</span>
        <span>KIRALUX</span>
      </a>
      <nav className="side-links" aria-label="Main navigation">
        {links.map((link, index) => (
          <button
            className={`side-link ${(index === 0 && ['home', 'checkout'].includes(page)) || (index === 1 && page === 'shop') ? 'active' : ''}`}
            key={link.label}
            onClick={() => {
              onNavigate(link.href);
            }}
          >
            <Icon name={link.icon} size={17} />
            <span>{link.label}</span>
            {link.badge && <span className="hot-badge">{link.badge}</span>}
          </button>
        ))}
        <div className="side-divider" />
        <button className={`side-link ${page === 'account' ? 'account-orders-link' : ''}`} onClick={() => onNavigate('/account?tab=orders')}>
          <Icon name="bag" size={17} /><span>My Orders</span>
        </button>
        <button className="side-link" onClick={onOpenWishlist}>
          <Icon name="heart" size={17} /><span>Wishlist</span>
          {wishlist.length > 0 && <span className="side-count">{wishlist.length}</span>}
        </button>
        <button className="side-link" onClick={() => onNavigate('/shop?category=sale')}>
          <Icon name="tag" size={17} /><span>Coupons</span>
        </button>
        <button className="side-link" onClick={() => onNavigate('/account?tab=addresses')}>
          <Icon name="home" size={17} /><span>Addresses</span>
        </button>
        <button className={`side-link ${page === 'account' ? 'active' : ''}`} onClick={() => onNavigate('/account?tab=settings')}>
          <Icon name="user" size={17} /><span>Account Settings</span>
        </button>
      </nav>

      <button className="sidebar-offer" onClick={() => onNavigate('/shop?category=sale')}>
        <span className="offer-eyebrow">SPECIAL OFFER</span>
        <strong>Summer Sale</strong>
        <span>Up to 50% Off</span>
        <span className="offer-button">Shop Now <Icon name="arrow" size={14} /></span>
        <span className="offer-spark" aria-hidden="true">✳</span>
      </button>

      <div className="sidebar-bottom">
        <a href="mailto:hello@kiralux.com"><Icon name="headset" size={18} /><span><b>Need Help?</b><small>24/7 Support Center</small></span></a>
        <button className="light-mode"><Icon name="sun" size={17} /> Light Mode <Icon name="chevron" size={15} /></button>
      </div>
      <span className="sr-only">{categories.length} shopping categories</span>
    </aside>
  );
}
