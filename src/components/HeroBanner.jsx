import { products } from '../data.jsx';
import { useShop } from '../hooks/useShop.js';
import Icon from './Icon.jsx';

const heroProduct = products.find((product) => product.id === 4);

export default function HeroBanner({ onShop }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const saved = wishlist.includes(heroProduct.id);

  return (
    <section className="hero-banner">
      <div className="hero-copy">
        <span className="hero-pill"><i /> NEW COLLECTION</span>
        <h1>Find your style,<br />love your look<span className="hero-sparkle">✦</span></h1>
        <p>Discover the latest in fashion, beauty, and lifestyle.</p>
        <button className="hero-cta" onClick={onShop || (() => addToCart(heroProduct.id))}>
          Shop Now <span><Icon name="arrow" size={17} /></span>
        </button>
        <div className="hero-dots" aria-label="Slide 1 of 4">
          <i className="selected" /><i /><i /><i />
        </div>
      </div>
      <div className="hero-portrait-wrap">
        <img className="hero-portrait" src={heroProduct.image} alt="Featured KIRALUX denim collection" />
      </div>
      <div className="hero-decoration hero-decoration-one" />
      <div className="hero-decoration hero-decoration-two" />
      <button
        className={`hero-heart ${saved ? 'saved' : ''}`}
        onClick={() => toggleWishlist(heroProduct.id)}
        aria-label={saved ? 'Remove featured item from wishlist' : 'Save featured item'}
      >
        <Icon name="heart" size={19} />
      </button>
    </section>
  );
}
