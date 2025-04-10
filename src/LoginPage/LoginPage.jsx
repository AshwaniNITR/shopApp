// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './LoginPage.css';
import Notification from '../components/Notification';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setNotification({ message: 'Please enter both username and password', type: 'error' });
      return;
    }
    
    try {
      setLoading(true);
      const data = await login(username, password);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setNotification({ message: 'Invalid login credentials', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({ 
        message: 'Login failed. Please try with "mor_2314" as username and "83r5^_" as password.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <svg viewBox="0 0 24 24" className="logo-icon">
            <path fill="currentColor" d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,13.6 14.1,15.3 12,15.3C9.9,15.3 8.2,13.6 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M7,17V18H17V17C17,14.3 14.7,12 12,12C9.3,12 7,14.3 7,17Z" />
          </svg>
          <h1>Welcome to ShopApp</h1>
        </div>
        
        <p className="subtitle">Sign in to access your dashboard</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="username">Username</label>
            <div className="underline"></div>
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <div className="underline"></div>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <span className="button-loader"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="login-help">
          <p>For testing, use:</p>
          <div className="credentials">
            <div>
              <span>Username:</span>
              <code>mor_2314</code>
            </div>
            <div>
              <span>Password:</span>
              <code>83r5^_</code>
            </div>
          </div>
        </div>
      </div>
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={clearNotification} 
      />
      
      <div className="circles">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
      </div>
    </div>
  );
};

export default LoginPage;