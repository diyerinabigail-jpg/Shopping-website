import ProductCard from './ProductCard.jsx';
import Icon from './Icon.jsx';

export default function ProductSection({ id, title, subtitle, products, onViewAll, onOpenProduct, viewAllLabel = 'View all', compact = false }) {
  return (
    <section className={`product-section ${compact ? 'recommended-section' : ''}`} id={id}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="section-tools">
          <button className="view-all" onClick={onViewAll}>{viewAllLabel} <Icon name="chevron" size={14} /></button>
          {compact && <div className="carousel-arrows"><button aria-label="Previous products">‹</button><button aria-label="Next products">›</button></div>}
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => <ProductCard product={product} key={product.id} onOpenProduct={onOpenProduct} />)}
        {!products.length && <p className="no-results">No products found. Try another search.</p>}
      </div>
    </section>
  );
}
