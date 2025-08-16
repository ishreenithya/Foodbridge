import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddFoodForm.css';

const AddFoodForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    location: '',
    expiry: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please log in first.");
      return;
    }
    try {
      await axios.post(
        'http://localhost:5001/food',
        {
          name: formData.name,
          quantity: formData.quantity,
          location: formData.location,
          expiry: formData.expiry
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess("Thank you for your generous donation!");
      setFormData({ name: '', quantity: '', location: '', expiry: '' });
    } catch (err) {
      setError("Failed to donate food. Please try again.");
    }
  };

  return (
    <div className="lux-bg">
      <form className="lux-card af-card" onSubmit={handleSubmit}>
        <img
          src="/logo.png"
          alt="Share Surplus Food"
          className="lux-banner"
        />
        <h1 className="lux-title">Donate Food</h1>
        <p className="lux-subtitle">
          Help connect surplus food to those in need. Your act makes a real impact!
        </p>
        <ul className="af-highlights">
          <li>🍎 Fresh fruits and meals welcome</li>
          <li>📅 Please only donate food not expired</li>
          <li>🌱 Every item helps reduce hunger and waste</li>
        </ul>
        {success && <div className="lux-success">{success}</div>}
        {error && <div className="lux-error">{error}</div>}
        <div className="lux-field">
          <span className="lux-icon">&#127858;</span>
          <input
            type="text"
            name="name"
            placeholder="Food name (e.g., Rice, Apples)"
            value={formData.name}
            onChange={handleChange}
            className="lux-input"
            autoComplete="off"
            required
          />
        </div>
        <div className="lux-field">
          <span className="lux-icon">&#35;</span>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="lux-input"
            min="1"
            required
          />
        </div>
        <div className="lux-field">
          <span className="lux-icon">&#127968;</span>
          <input
            type="text"
            name="location"
            placeholder="Pickup location (e.g., Block B, Street 21)"
            value={formData.location}
            onChange={handleChange}
            className="lux-input"
            autoComplete="off"
            required
          />
        </div>
        <div className="lux-field">
          <span className="lux-icon">&#128197;</span>
          <input
            type="date"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="lux-input"
            required
          />
        </div>
        <div className="af-info">
          <img
            src="/login.png"
            alt="Food Basket"
            className="af-sideimage"
          />
          <span>
            Your donation helps bridge the gap between abundance and need. 
            <strong> Let's feed hope together!</strong>
          </span>
        </div>
        <button type="submit" className="lux-btn">Donate</button>
      </form>
    </div>
  );
};

export default AddFoodForm;
