// src/pages/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!form.username || !form.password || !form.confirm) {
      setError('Please fill all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/reset-password', {
        username: form.username,
        password: form.password
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Password reset failed. Please check your username and try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white animate-fadeInUp">
      <div className="sap-card max-w-md w-full text-center animate-fadeInUp">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Reset Password</h2>
        {error && <div className="text-red-500 text-sm text-center mb-3">{error}</div>}
        {success ? (
          <div className="text-green-700 text-center font-semibold mb-6">
            Password reset! <br />
            <Link to="/login" className="text-green-700 underline">Log in with new password &rarr;</Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="sap-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
              className="sap-input"
              required
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm New Password"
              value={form.confirm}
              onChange={handleChange}
              className="sap-input"
              required
            />
            <button type="submit" className="sap-btn w-full">Reset Password</button>
          </form>
        )}
        {!success && (
          <div className="text-sm text-center mt-6 text-gray-600">
            Remembered?{' '}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
