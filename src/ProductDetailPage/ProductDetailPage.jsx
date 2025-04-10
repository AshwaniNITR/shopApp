// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';
import Notification from '../components/Notification';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotification({
          message: 'Failed to load product details.',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setNotification({
      message: `${product.title} added to cart!`,
      type: 'success'
    });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  if (loading) {
    return <div className="loading-container">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Link to="/" className="back-to-products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-detail-image" 
          />
        </div>
        
        <div className="product-info-container">
          <div className="breadcrumb">
            <Link to="/">Products</Link> / <span>{product.category}</span>
          </div>
          
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-category">
            Category: <span>{product.category}</span>
          </div>
          
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          
          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-detail-actions">
            <div className="quantity-selector">
              <button onClick={decrementQuantity} className="quantity-btn">-</button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
                className="quantity-input"
              />
              <button onClick={incrementQuantity} className="quantity-btn">+</button>
            </div>
            
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
          
          <Link to="/" className="back-link">
            Continue Shopping
          </Link>
        </div>
      </div>
      
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />
    </div>
  );
};

export default ProductDetailPage;