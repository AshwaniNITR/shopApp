// src/components/CartItem.jsx
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, title, price, image, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <p className="cart-item-price">${price.toFixed(2)}</p>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button onClick={handleDecrease} className="quantity-btn">-</button>
            <span className="quantity">{quantity}</span>
            <button onClick={handleIncrease} className="quantity-btn">+</button>
          </div>
          <button onClick={handleRemove} className="remove-btn">Remove</button>
        </div>
      </div>
      <div className="cart-item-subtotal">
        <p>${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;