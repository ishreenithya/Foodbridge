import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar fe-shadow sticky top-0 z-50 bg-white/95 backdrop-blur-lg">
      <div className="fe-navbar-inner">
        {/* Left - Logo */}
        <div className="fe-navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="FoodBridge Logo" className="logo-img" />
          </Link>
        </div>

        {/* Center - Navigation Tabs */}
        <div className="fe-navbar-tabs">
          <Link to="/" className="fe-navbar-tab">Home</Link>
          <Link to="/donate" className="fe-navbar-tab">Donate</Link>
          <Link to="/view" className="fe-navbar-tab">View</Link>
          <Link to="/about" className="fe-navbar-tab">About</Link>
          <Link to="/register" className="fe-navbar-tab">Join Us</Link>
        </div>

        {/* Right - User Account */}
        <div className="fe-navbar-user" ref={profileRef}>
          {user ? (
            <>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="fe-btn fe-btn-gold fe-navbar-account-btn"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                {user.username || user.email}
                <span className={`navbar-account-arrow ${profileOpen ? "open" : ""}`}>▼</span>
              </button>
              {profileOpen && (
                <div className="fe-navbar-account-dropdown animate-fadeInUp">
                  <Link
                    to="/profile"
                    className="fe-navbar-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-donations"
                    className="fe-navbar-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Donations
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="fe-navbar-dropdown-item logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="fe-btn fe-btn-gold fe-navbar-account-btn">
              Login
            </Link>
          )}
        </div>
      </div>

      
      
      
    </nav>
  );
}

export default Navbar;
