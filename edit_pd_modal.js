import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProductModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then(response => {
      const { name, price, category } = response.data;
      setProduct(response.data);
      setName(name);
      setPrice(price);
      setCategory(category);
    });
  }, [productId]);

  const handleSave = () => {
    const updatedProduct = { name, price, category };
    axios.put(`/api/products/${productId}`, updatedProduct)
      .then(() => {
        alert('Product updated successfully!');
        onClose(); // Close the modal
      })
      .catch(err => alert('Failed to update product.'));
  };

  return (
    <div className="modal">
      <div>
        <h2>Edit Product</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Product Name"
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditProductModal;
