import Icon from './Icon.jsx';
import { products } from '../data.jsx';

export default function ShopBanner({ onShop }) {
  return (
    <section className="shop-banner">
      <div className="shop-banner-copy">
        <span className="banner-eyebrow">THE KIRALUX EDIT</span>
        <h2>A little something for your next favorite.</h2>
        <p>Refined styles. Brighter days. Up to 30% off selected fashion.</p>
      </div>
      <button className="shop-banner-cta" onClick={onShop}>Shop the Collection <Icon name="arrow" size={17} /></button>
      <div className="shop-banner-products">
        <img src={products[2].image} alt="" />
        <img src={products[4].image} alt="" />
        <img src={products[0].image} alt="" />
      </div>
      <div className="shop-banner-side">Good<br />Style<br />Brighter<br />You <span>✦</span></div>
      <span className="banner-leaf" aria-hidden="true">✳</span>
    </section>
  );
}
