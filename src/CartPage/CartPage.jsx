// src/pages/CartPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Notification from '../components/Notification';
import './CartPage.css';

const CartPage = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleCheckout = () => {
    // Clear the cart
    clearCart();
    
    // Show success notification
    setNotification({
      message: 'Order placed successfully!',
      type: 'success'
    });
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Your Cart</h1>
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
        
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Items ({cart.length}):</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <button onClick={handleCheckout} className="checkout-btn">
            Checkout
          </button>
          
          <Link to="/" className="continue-shopping">
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

export default CartPage;