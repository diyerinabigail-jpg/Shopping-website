import { products } from '../data.jsx';
import Icon from './Icon.jsx';

const colors = [
  { name: 'Black', value: '#252832' },
  { name: 'White', value: '#fff' },
  { name: 'Cream', value: '#f5ebdc' },
  { name: 'Pink', value: '#e9b4c8' },
  { name: 'Lilac', value: '#c6a0ed' },
  { name: 'Blue', value: '#338be4' },
  { name: 'Green', value: '#38a370' },
  { name: 'Brown', value: '#946343' },
  { name: 'Red', value: '#dd464d' },
];

const filterCategories = [
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'kids', label: 'Kids' },
  { id: 'jewelry', label: 'Accessories' },
];

export default function ShopFilters({
  activeCategory,
  onCategoryChange,
  maxPrice,
  onPriceChange,
  selectedColors,
  onToggleColor,
  onClear,
  filtersOpen,
  onToggleFilters,
}) {
  const counts = products.reduce((result, product) => {
    result[product.category] = (result[product.category] || 0) + 1;
    return result;
  }, {});

  return (
    <aside className={`shop-filters ${filtersOpen ? 'filters-open' : ''}`} id="shop-filters" aria-label="Filter products">
      <button className="mobile-filter-trigger" onClick={onToggleFilters} aria-expanded={filtersOpen}>
        <Icon name="grid" size={15} /> {filtersOpen ? 'Hide filters' : 'Filters'} <Icon name="chevron" size={14} />
      </button>
      <div className="filter-header">
        <h2>Filters</h2>
        <button onClick={onClear}>Clear All</button>
      </div>
      <section className="filter-group">
        <h3>Category <Icon name="chevron" size={15} /></h3>
        {filterCategories.map((category) => (
          <label className="filter-check" key={category.id}>
            <input
              type="checkbox"
              checked={activeCategory === category.id}
              onChange={() => onCategoryChange(activeCategory === category.id ? 'all' : category.id)}
            />
            <span className="custom-check" />
            <span>{category.label}</span>
            <small>{counts[category.id] || 0}</small>
          </label>
        ))}
      </section>
      <section className="filter-group price-filter">
        <h3>Price Range <Icon name="chevron" size={15} /></h3>
        <div className="price-slider-wrap">
          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            aria-label="Maximum product price"
            style={{ '--range-progress': `${((maxPrice - 5000) / 95000) * 100}%` }}
          />
        </div>
        <div className="price-inputs">
          <span>₦5k</span>
          <span>{maxPrice >= 100000 ? '₦100k+' : `₦${(maxPrice / 1000).toFixed(0)}k`}</span>
        </div>
      </section>
      <section className="filter-group color-filter">
        <h3>Color <Icon name="chevron" size={15} /></h3>
        <div className="color-options">
          {colors.map((color) => {
            const active = selectedColors.includes(color.name);
            return (
              <button
                className={`color-option ${active ? 'selected' : ''}`}
                key={color.name}
                title={color.name}
                aria-label={`${active ? 'Remove' : 'Filter by'} ${color.name}`}
                onClick={() => onToggleColor(color.name)}
                style={{ '--swatch': color.value }}
              >
                {active && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </section>
      <section className="filter-group size-filter">
        <h3>Style <Icon name="chevron" size={15} /></h3>
        <div className="size-options">
          {['All', 'Clothing', 'Accessories'].map((style) => (
            <button
              className={(style === 'All' && activeCategory === 'all') || (style === 'Clothing' && ['women', 'men', 'kids'].includes(activeCategory)) || (style === 'Accessories' && activeCategory === 'jewelry') ? 'selected' : ''}
              key={style}
              onClick={() => onCategoryChange(style === 'Clothing' ? 'women' : style === 'Accessories' ? 'jewelry' : 'all')}
            >
              {style}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
