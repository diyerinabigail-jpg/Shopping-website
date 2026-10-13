import { products } from '../data.jsx';
import Icon from './Icon.jsx';

const promotions = [
  { title: 'Flash Sale', copy: 'Limited time deals', detail: 'Up to 50% off', className: 'promo-flash', category: 'sale', art: 'bag' },
  { title: 'Free Shipping', copy: 'On orders over ₦50k', detail: 'Shop now →', className: 'promo-shipping', category: 'all', art: 'box' },
  { title: 'New Arrivals', copy: 'Check out the latest trends', detail: 'Shop now →', className: 'promo-new', category: 'all', art: 'hanger' },
];

export default function PromoGrid({ onCategoryChange }) {
  return (
    <section className="promo-grid" aria-label="Store promotions">
      {promotions.map((promotion, index) => {
        const product = products[[0, 1, 2][index]];
        return (
          <button
            className={`promo-card ${promotion.className}`}
            key={promotion.title}
            onClick={() => onCategoryChange(promotion.category)}
          >
            <span className="promo-copy">
              <strong>{promotion.title}</strong><span>{promotion.copy}</span>
              <em>{promotion.detail}</em>
            </span>
            {index === 0 && <span className="sale-clock">02 : 45 : 10</span>}
            <span className="promo-art">
              {index === 1 ? <span className="shipping-box">K<span>✳</span></span> :
                index === 2 ? <img src={product.image} alt="" /> :
                  <><img src={product.image} alt="" /><span className="sale-percent">%</span></>}
            </span>
            {index === 2 && <Icon name="arrow" className="promo-arrow" size={16} />}
          </button>
        );
      })}
    </section>
  );
}
