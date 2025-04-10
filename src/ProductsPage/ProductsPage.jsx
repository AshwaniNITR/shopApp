// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import { getProducts, getCategories, getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';
import Notification from '../components/Notification';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        const categoriesData = await getCategories();
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification({
          message: 'Failed to load products. Please try again.',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      
      if (category) {
        const categoryProducts = await getProductsByCategory(category);
        setFilteredProducts(categoryProducts);
      } else {
        setFilteredProducts(products);
      }
    } catch (error) {
      console.error('Error fetching category products:', error);
      setNotification({
        message: 'Failed to load category products.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      // If search is cleared, respect category filter
      if (selectedCategory) {
        handleCategoryChange(selectedCategory);
      } else {
        setFilteredProducts(products);
      }
      return;
    }
    
    // Filter based on search term and possibly selected category
    const searchResults = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(term);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(searchResults);
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="products-page">
      <div className="products-header">  
        <div className="filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option className='rer' key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found{searchTerm ? ` matching "${searchTerm}"` : ''}.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />
    </div>
  );
};

export default ProductsPage;