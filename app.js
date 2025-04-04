import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
  });

  // Fetch all products on component load
  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  // Handle product search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filters
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle form submit to edit product
  const handleEdit = (productId) => {
    const product = products.find(p => p._id === productId);
    // You can redirect to a detailed edit page or use a modal
    console.log('Edit product:', product);
  };

  // Filter and search logic
  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filters.category ? product.category === filters.category : true;
    const matchPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div>
      <h1>Product Management</h1>

      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />

      {/* Filter options */}
      <select name="category" onChange={handleFilterChange} value={filters.category}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>

      <input
        type="range"
        name="priceRange"
        min="0"
        max="1000"
        value={filters.priceRange}
        onChange={(e) => setFilters({...filters, priceRange: [0, e.target.value]})}
      />

      <div>
        <h2>Products</h2>
        {filteredProducts.map((product) => (
          <div key={product._id}>
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => handleEdit(product._id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
