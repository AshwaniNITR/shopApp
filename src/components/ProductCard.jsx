// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, title, price, image, category } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <div className="image-overlay"></div>
      </div>
      <div className="product-info">
        <div className="category-badge">{category}</div>
        <h3 className="product-title">{title.length > 50 ? `${title.substring(0, 50)}...` : title}</h3>
        <div className="price-container">
          <p className="product-price">${price.toFixed(2)}</p>
        </div>
        <Link to={`/product/${id}`} className="view-details-btn">
          View Details
          <svg viewBox="0 0 24 24" className="arrow-icon">
            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;