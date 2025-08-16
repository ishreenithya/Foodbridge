// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
    return decoded.sub || decoded; // <- ✅ This is the key fix
  } catch (err) {
    console.error('Token decode error:', err);
    return null;
  }
};
