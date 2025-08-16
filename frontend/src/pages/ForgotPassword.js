import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ForgetPassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!username) {
      setError('Please enter your username.');
      return;
    }
    try {
      // Replace with your backend API endpoint as needed
      await axios.post('http://localhost:5001/forgot-password', { username });
      setSent(true);
    } catch {
      setError('Could not send reset instructions. Please check your username.');
    }
  };

  return (
    <div className="lux-bg">
      <form className="lux-card fp-card" onSubmit={handleSubmit}>
        <img src="/logo.jpg" className="lux-logo" alt="Food Bridge Logo" />
        <h1 className="lux-title">Reset Password</h1>
        <p className="lux-subtitle fp-subtitle">
          Enter your username and we'll send a reset link to your registered email.
        </p>
        {sent ? (
          <div className="fp-success">
            ✅ Instructions sent!<br />
            Check your email for the reset link.<br />
            <Link to="/login" className="lux-link">Return to Login</Link>
          </div>
        ) : (
          <>
            <div className="lux-field">
              <span className="lux-icon">&#128100;</span>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="lux-input"
                autoComplete="username"
              />
            </div>
            {error && <div className="lux-error">{error}</div>}
            <button type="submit" className="lux-btn">Send Reset Link</button>
            <div className="lux-bottom">
              Remembered? <Link to="/login" className="lux-link">Back to Login</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
