import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ShopFilters from './components/ShopFilters.jsx';
import ShopBanner from './components/ShopBanner.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import CartPanel from './components/CartPanel.jsx';
import Footer from './components/Footer.jsx';
import HomeFooter from './components/HomeFooter.jsx';
import HomePage from './components/HomePage.jsx';
import HomeRightRail from './components/HomeRightRail.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import AccountPage from './components/AccountPage.jsx';
import MobileNav from './components/MobileNav.jsx';
import Icon from './components/Icon.jsx';
import { categories, matchesColorFamily, products, getProductById } from './data.jsx';
import { useShop } from './hooks/useShop.js';

const MAX_PRICE = 100000;
const categoryNames = {
  all: 'All Fashion',
  women: 'Women',
  men: 'Men',
  kids: 'Kids',
  jewelry: 'Accessories',
  sale: 'Deals',
};

function App() {
  const [pagePath, setPagePath] = useState(() => window.location.pathname);
  const [locationSearch, setLocationSearch] = useState(() => window.location.search);
  const [activeCategory, setActiveCategory] = useState(() => new URLSearchParams(window.location.search).get('category') || 'all');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOrder, setSortOrder] = useState(() => new URLSearchParams(window.location.search).get('sort') || 'featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState(null);
  const { wishlist } = useShop();
  const isAccountPage = pagePath.startsWith('/account');
  const isCheckoutPage = pagePath.startsWith('/checkout');
  const isProductPage = /^\/product\/\d+\/?$/.test(pagePath);
  const isShopPage = pagePath.startsWith('/shop') || isProductPage || isCheckoutPage;
  const isMarketplacePage = isShopPage || isAccountPage;
  const selectedProduct = isProductPage ? getProductById(pagePath.match(/\d+/)?.[0]) : null;

  const syncLocation = () => {
    setPagePath(window.location.pathname);
    setLocationSearch(window.location.search);
    const params = new URLSearchParams(window.location.search);
    if (window.location.pathname.startsWith('/shop')) {
      setActiveCategory(params.get('category') || 'all');
      setSortOrder(params.get('sort') || 'featured');
    }
  };

  useEffect(() => {
    window.addEventListener('popstate', syncLocation);
    return () => window.removeEventListener('popstate', syncLocation);
  }, []);

  const navigate = (path) => {
    const next = new URL(path, window.location.origin);
    window.history.pushState({ fromPath: `${window.location.pathname}${window.location.search}` }, '', `${next.pathname}${next.search}${next.hash}`);
    setPagePath(next.pathname);
    setLocationSearch(next.search);
    setMobilePanel(null);
    if (next.pathname.startsWith('/shop')) {
      const params = next.searchParams;
      setActiveCategory(params.get('category') || 'all');
      setSortOrder(params.get('sort') || 'featured');
      setFiltersOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (product) => navigate(`/product/${product.id}`);
  const closeProduct = () => navigate(window.history.state?.fromPath || '/shop');

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const matches = products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'sale' ? Boolean(product.originalPrice) : product.category === activeCategory);
      const matchesSearch = !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch);
      const matchesPrice = product.price <= maxPrice;
      const matchesColor = !selectedColors.length || product.colors.some((color) =>
        selectedColors.some((family) => matchesColorFamily(color, family)),
      );
      return matchesCategory && matchesSearch && matchesPrice && matchesColor;
    });

    if (sortOrder === 'price-low') return matches.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-high') return matches.sort((a, b) => b.price - a.price);
    if (sortOrder === 'rating') return matches.sort((a, b) => b.rating - a.rating);
    return matches;
  }, [activeCategory, search, maxPrice, selectedColors, sortOrder]);

  const handleCategoryChange = (category) => {
    if (!pagePath.startsWith('/shop')) {
      navigate(category === 'all' ? '/shop' : `/shop?category=${category}`);
      return;
    }
    setActiveCategory(category);
    const url = new URL(window.location.href);
    if (category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`);
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSearch('');
    setMaxPrice(MAX_PRICE);
    setSelectedColors([]);
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('q');
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`);
  };

  const toggleColor = (color) => {
    setSelectedColors((current) =>
      current.includes(color) ? current.filter((item) => item !== color) : [...current, color],
    );
  };
  const activeLabel = categoryNames[activeCategory] || 'All Fashion';
  const onChooseCategory = (category) => {
    setMobilePanel(null);
    handleCategoryChange(category);
  };
  const onFooterCategory = (category) => navigate(category === 'all' ? '/shop' : `/shop?category=${category}`);

  return (
    <div className={`store-shell ${isAccountPage ? 'account-shell' : isCheckoutPage ? 'checkout-shell' : isShopPage ? 'browse-shell' : 'home-shell'}`}>
      <Sidebar
        page={isAccountPage ? 'account' : isCheckoutPage ? 'checkout' : isShopPage ? 'shop' : 'home'}
        onNavigate={navigate}
        onOpenWishlist={() => setMobilePanel('wishlist')}
      />
      <main className={`store-main ${isAccountPage ? 'account-main' : isCheckoutPage ? 'checkout-main' : isShopPage ? 'browse-main' : 'home-main'}`}>
        {isMarketplacePage && (
          <Header
            search={search}
            onSearch={setSearch}
            onOpenCart={() => setMobilePanel('cart')}
            onOpenWishlist={() => setMobilePanel('wishlist')}
            onOpenAccount={() => navigate('/account?tab=orders')}
          />
        )}
        {isProductPage && selectedProduct ? (
          <>
            <ProductDetail
              key={selectedProduct.id}
              product={selectedProduct}
              relatedProducts={products.filter((product) => product.id !== selectedProduct.id && product.category === selectedProduct.category).slice(0, 3)}
              onBack={closeProduct}
              onOpenProduct={openProduct}
            />
            <Footer onCategoryChange={onFooterCategory} />
          </>
        ) : isCheckoutPage ? (
          <CheckoutPage
            onContinueShopping={() => navigate('/shop')}
            onOpenProduct={openProduct}
          />
        ) : isAccountPage ? (
          <AccountPage
            initialTab={new URLSearchParams(locationSearch).get('tab') || 'orders'}
            onNavigate={navigate}
            onOpenProduct={openProduct}
          />
        ) : isShopPage ? (
          <div className="browse-content">
            <div className="breadcrumbs"><button onClick={() => navigate('/')}>Home</button><span>/</span><b>{activeLabel}</b></div>
            <section className="browse-heading">
              <div>
                <h1>Shop the edit</h1>
                <p>Discover the latest trends in fashion, beauty and lifestyle.</p>
              </div>
              <span className="browse-heading-note"><Icon name="sparkle" size={16} /> Find your everyday favorite</span>
            </section>

            <nav className="browse-categories" aria-label="Browse fashion categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`browse-category ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className={`browse-category-icon browse-icon-${category.id}`}>{category.icon}</span>
                  {categoryNames[category.id]}
                </button>
              ))}
            </nav>

            <div className="browse-layout">
              <ShopFilters
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                maxPrice={maxPrice}
                onPriceChange={setMaxPrice}
                selectedColors={selectedColors}
                onToggleColor={toggleColor}
                onClear={clearFilters}
                filtersOpen={filtersOpen}
                onToggleFilters={() => setFiltersOpen((open) => !open)}
              />

              <section className="browse-results" aria-label="Products">
                <ShopBanner onShop={() => handleCategoryChange('sale')} />
                <div className="results-toolbar">
                  <span>Showing <b>{filteredProducts.length}</b> pieces</span>
                  <label className="sort-control">
                    <span>Sort by</span>
                    <select value={sortOrder} onChange={(event) => {
                      setSortOrder(event.target.value);
                      const url = new URL(window.location.href);
                      if (event.target.value === 'featured') url.searchParams.delete('sort');
                      else url.searchParams.set('sort', event.target.value);
                      window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`);
                    }} aria-label="Sort products">
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: low to high</option>
                      <option value="price-high">Price: high to low</option>
                      <option value="rating">Top rated</option>
                    </select>
                    <Icon name="chevron" size={15} />
                  </label>
                </div>
                <div className="product-grid browse-product-grid">
                  {filteredProducts.map((product) => <ProductCard product={product} key={product.id} onOpenProduct={openProduct} />)}
                  {!filteredProducts.length && (
                    <div className="no-results">
                      <Icon name="search" size={26} />
                      <b>No pieces found</b>
                      <span>Try changing your search or filters.</span>
                      <button onClick={clearFilters}>Clear filters</button>
                    </div>
                  )}
                </div>
                {filteredProducts.length > 0 && (
                  <button className="load-more" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    You’re all caught up <span>↑</span>
                  </button>
                )}
              </section>
            </div>
            <div className="browse-benefits">
              <span><Icon name="truck" size={18} /> Free shipping over ₦50,000</span>
              <span><Icon name="return" size={18} /> Easy 30-day returns</span>
              <span><Icon name="shield" size={18} /> Secure checkout</span>
            </div>
            <Footer onCategoryChange={onFooterCategory} />
          </div>
        ) : (
          <>
            <HomePage
              search={search}
              onSearch={setSearch}
              onOpenCart={() => setMobilePanel('cart')}
              onOpenWishlist={() => setMobilePanel('wishlist')}
              onOpenAccount={() => navigate('/account?tab=orders')}
              onShop={() => navigate('/shop')}
              onCategoryChange={handleCategoryChange}
              onOpenProduct={openProduct}
            />
            <HomeFooter onNavigate={navigate} />
          </>
        )}
      </main>
      {isCheckoutPage ? null : isMarketplacePage
        ? <CartPanel onCheckout={() => navigate('/checkout')} />
        : <HomeRightRail onOpenProduct={openProduct} onCheckout={() => navigate('/checkout')} />}
      <MobileNav
        currentPage={isAccountPage ? 'account' : isShopPage ? 'shop' : 'home'}
        onHome={() => navigate('/')}
        onOpenCart={() => setMobilePanel('cart')}
        onOpenCategories={() => { navigate('/shop'); setMobilePanel('categories'); }}
        onOpenWishlist={() => isAccountPage ? navigate('/account?tab=wishlist') : setMobilePanel('wishlist')}
        onOpenAccount={() => navigate('/account?tab=orders')}
      />
      {mobilePanel === 'cart' && <CartPanel mobile onClose={() => setMobilePanel(null)} onCheckout={() => navigate('/checkout')} />}
      {mobilePanel === 'categories' && (
        <div className="mobile-sheet-backdrop" onClick={() => setMobilePanel(null)}>
          <section className="mobile-category-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-heading"><strong>Browse categories</strong><button onClick={() => setMobilePanel(null)} aria-label="Close"><Icon name="close" /></button></div>
            {categories.map((category) => (
              <button key={category.id} onClick={() => onChooseCategory(category.id)}>
                {categoryNames[category.id]} <Icon name="chevron" size={15} />
              </button>
            ))}
          </section>
        </div>
      )}
      {mobilePanel === 'wishlist' && (
        <div className="mobile-sheet-backdrop" onClick={() => setMobilePanel(null)}>
          <section className="mobile-category-sheet wishlist-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-heading"><strong>Your wishlist</strong><button onClick={() => setMobilePanel(null)} aria-label="Close"><Icon name="close" /></button></div>
            {wishlist.length
              ? products.filter((product) => wishlist.includes(product.id)).map((product) => (
                <button key={product.id} onClick={() => { setMobilePanel(null); openProduct(product); }}>
                  {product.name} <span>₦{product.price.toLocaleString('en-NG')}</span>
                </button>
              ))
              : <p>Tap the heart on a product to save it for later.</p>}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
