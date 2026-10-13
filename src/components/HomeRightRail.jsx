import { products } from '../data.jsx';
import { useShop } from '../hooks/useShop.js';
import CartPanel from './CartPanel.jsx';
import Icon from './Icon.jsx';

export default function HomeRightRail({ onOpenProduct, onCheckout }) {
  const { wishlist } = useShop();
  const picks = products.filter((product) => wishlist.includes(product.id)).slice(0, 2);
  const recent = products.slice(0, 2);

  return (
    <aside className="home-right-rail">
      <CartPanel onCheckout={onCheckout} />
      <section className="home-mini-panel">
        <div className="home-mini-heading"><h2>Recently viewed</h2><button aria-label="View recently viewed"><Icon name="arrow" size={14} /></button></div>
        <div className="home-mini-products">
          {recent.map((product) => <button className="home-mini-product" key={product.id} onClick={() => onOpenProduct(product)}>
            <img src={product.image} alt="" /><span><b>{product.name}</b><small>₦{product.price.toLocaleString('en-NG')}</small></span>
          </button>)}
        </div>
      </section>
      <section className="home-club-card"><span>✦ KIRALUX CLUB</span><h2>Good things<br />come to members.</h2><p>Join for early access, member-only perks and a little treat on your birthday.</p><button>Discover the club <Icon name="arrow" size={14} /></button></section>
      {picks.length > 0 && <section className="home-mini-panel">
        <div className="home-mini-heading"><h2>Your wishlist</h2><Icon name="heart" size={16} /></div>
        <div className="home-mini-products">{picks.map((product) => <button className="home-mini-product" key={product.id} onClick={() => onOpenProduct(product)}>
          <img src={product.image} alt="" /><span><b>{product.name}</b><small>₦{product.price.toLocaleString('en-NG')}</small></span>
        </button>)}</div>
      </section>}
    </aside>
  );
}
