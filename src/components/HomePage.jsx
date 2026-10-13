import { useMemo } from 'react';
import { products } from '../data.jsx';
import BenefitsBar from './BenefitsBar.jsx';
import CategoryRow from './CategoryRow.jsx';
import Header from './Header.jsx';
import HeroBanner from './HeroBanner.jsx';
import ProductSection from './ProductSection.jsx';
import PromoGrid from './PromoGrid.jsx';
import Icon from './Icon.jsx';

export default function HomePage({ search, onSearch, onOpenCart, onOpenWishlist, onOpenAccount, onShop, onCategoryChange, onOpenProduct }) {
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? products.filter((product) => product.name.toLowerCase().includes(query)) : products;
  }, [search]);

  const bestDeals = visibleProducts.filter((product) => product.originalPrice).slice(0, 4);
  const recommended = visibleProducts.filter((product) => !product.originalPrice).slice(0, 4);

  return (
    <>
      <Header search={search} onSearch={onSearch} onOpenCart={onOpenCart} onOpenWishlist={onOpenWishlist} onOpenAccount={onOpenAccount} />
      <div className="home-content">
        <HeroBanner onShop={onShop} />
        <section className="home-categories">
          <div className="home-section-heading">
            <div><h2>Shop by category</h2><p>A little something for every side of you</p></div>
            <button onClick={onShop}>View all <Icon name="arrow" size={15} /></button>
          </div>
          <CategoryRow activeCategory="all" onCategoryChange={onCategoryChange} />
        </section>
        <PromoGrid onCategoryChange={onCategoryChange} />
        <ProductSection
          id="deals"
          title="Best deals for you"
          subtitle="Lovely finds, even lovelier prices"
          products={bestDeals}
          onViewAll={onShop}
          onOpenProduct={onOpenProduct}
          viewAllLabel="See all deals"
        />
        <ProductSection
          title="Picked just for you"
          subtitle="Pieces we think you’ll love"
          products={recommended}
          onViewAll={onShop}
          onOpenProduct={onOpenProduct}
          compact
        />
        <BenefitsBar />
      </div>
    </>
  );
}
