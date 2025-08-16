import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import '../styles/LoginPage.css';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5001/login', form);
      const { access_token } = res.data;
      localStorage.setItem('token', access_token);
      const user = getCurrentUser();
      setUser && setUser(user);
      navigate('/');
    } catch {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="lux-bg">
      <form className="lux-card" onSubmit={handleLogin}>
        <img src="/login.png" className="lux-logo" alt="Food Bridge Logo" />
        <h1 className="lux-title">Welcome Back</h1>
        <p className="lux-subtitle">Login to FoodBridge</p>
        <div className="lux-field">
          <span className="lux-icon">&#128100;</span>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="lux-input"
            autoComplete="username"
          />
        </div>
        <div className="lux-field">
          <span className="lux-icon">&#128274;</span>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="lux-input"
            autoComplete="current-password"
          />
        </div>
        <div className="lux-links">
          <Link to="/reset-password" className="lux-link">Forgot password?</Link>
        </div>
        {error && <div className="lux-error">{error}</div>}
        <button type="submit" className="lux-btn">Sign In</button>
        <div className="lux-bottom">
          Don’t have an account?{' '}
          <Link to="/register" className="lux-link">Join Us</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
