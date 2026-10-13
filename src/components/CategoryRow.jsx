import { categories } from '../data.jsx';

export default function CategoryRow({ activeCategory, onCategoryChange }) {
  return (
    <nav className="category-row" aria-label="Shop categories">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-tile ${activeCategory === category.id ? 'selected' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className={`category-icon category-icon-${category.id}`}>{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </nav>
  );
}
