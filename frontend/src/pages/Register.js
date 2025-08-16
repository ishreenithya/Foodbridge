import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/RegisterPage.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.username || !form.email || !form.password) {
      setError('Please fill all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      await axios.post('http://localhost:5001/register', form);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="lux-bg">
      <form className="lux-card" onSubmit={handleRegister}>
        <img src="/login.png" className="lux-logo" alt="Food Bridge Logo" />
        <h1 className="lux-title">Create Account</h1>
        <p className="lux-subtitle">Join Food Bridge</p>
        <div className="lux-field">
          <span className="lux-icon">&#128100;</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="lux-input"
            autoComplete="username"
            required
          />
        </div>
        <div className="lux-field">
          <span className="lux-icon">&#9993;</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="lux-input"
            autoComplete="email"
            required
          />
        </div>
        <div className="lux-field">
          <span className="lux-icon">&#128274;</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="lux-input"
            autoComplete="new-password"
            required
          />
        </div>
        {error && <div className="lux-error">{error}</div>}
        {success && <div className="lux-success">{success}</div>}
        <button type="submit" className="lux-btn">Register</button>
        <div className="lux-bottom">
          Already have an account?{' '}
          <Link to="/login" className="lux-link">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
