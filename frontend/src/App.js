import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar'; // Import your existing Navbar

import FoodList from './pages/Foodlist';
import AddFoodForm from './pages/AddFoodForm';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import MyDonations from './pages/MyDonations';
import HomePage from './pages/HomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { getCurrentUser } from './utils/auth';

// AppWrapper allows the use of useLocation/useNavigate at App's top level
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const [foodItems, setFoodItems] = useState([]);
  const [user, setUser] = useState(getCurrentUser());

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5001/food');
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    window.location.href = '/login';
  };

  // Paths where navbar should be hidden
  const hideNavbarPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

  const isNavbarVisible = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {isNavbarVisible && <Navbar user={user} onLogout={handleLogout} />}
      <main className="flex-grow bg-white">
        <Routes>
          {/* HomePage */}
          <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />

          {/* Protected routes */}
          <Route
            path="/donate"
            element={
              user ? (
                <AddFoodForm onAdd={fetchFoodItems} />
              ) : (
                <Navigate to="/login" state={{ message: 'Please login to donate food.' }} />
              )
            }
          />
          <Route
            path="/view"
            element={
              user ? (
                <FoodList foodItems={foodItems} />
              ) : (
                <Navigate to="/login" state={{ message: 'Please login to view donations.' }} />
              )
            }
          />
          <Route
            path="/my-donations"
            element={
              user ? (
                <MyDonations />
              ) : (
                <Navigate to="/login" state={{ message: 'Please login to view your donations.' }} />
              )
            }
          />

          {/* Public pages */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-6 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Food Bridge — Built with ❤️ for a better world.
      </footer>
    </div>
  );
}

export default AppWrapper;
