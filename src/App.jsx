// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import LoginPage from './LoginPage/LoginPage';
import ProductsPage from './ProductsPage/ProductsPage';
import ProductDetailPage from './ProductDetailPage/ProductDetailPage';
import CartPage from './CartPage/CartPage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <div className="protected-layout">
                    <Header />
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<ProductsPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;