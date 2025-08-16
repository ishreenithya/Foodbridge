import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/About.css";

// FontAwesome CDN: ADD THIS in public/index.html's <head>:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>

const About = () => {
  const navigate = useNavigate();

  // Get user from localStorage (assuming structure: {username, name, email})
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const displayName =
    user?.username || user?.name || user?.email || null;

  return (
    <div className="fe-bg">
      {/* --- Topbar --- */}
      <div className="fe-topbar">
        <div className="fe-greeting">
          {displayName ? `Hello, ${displayName}!` : "Hello! Welcome to FoodBridge"}
        </div>
        <div className="fe-topbar-actions">
          {user ? (
            <>
              <Link to="/profile" className="fe-topbar-btn">
                My Profile
              </Link>
              <button className="fe-topbar-btn logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="fe-topbar-btn">
              Login here
            </Link>
          )}
        </div>
      </div>

      {/* --- HERO/INTRO --- */}
      <div className="about-center">
        <section className="about-hero-card animate-bounceIn">
          <img src="/logo.png" alt="Food Bridge Logo" className="about-hero-logo" />
          <h2 className="about-hero-title">About Food Bridge</h2>
          <p className="about-hero-desc">
            <span className="about-bold">Food Bridge</span> is the platform that unites people and communities to fight hunger and stop food waste. <br />
            We connect food donors, NGOs, and those in need—making giving and receiving simple, transparent, and joyful.
          </p>
          <div className="about-socials">
            <a href="https://facebook.com/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn facebook" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn twitter" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn instagram" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com/company/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </section>
      </div>

      {/* --- Mission/Values --- */}
      <section className="about-section-row-cols animate-fadeInUp">
        <div className="about-section-block mission-block">
          <img
            src="/mission.png"
            className="about-section-photo"
            alt="Mission"
          />
          <div>
            <h3 className="about-section-title">Bridge Surplus & Support</h3>
            <p className="about-section-desc">
              Excess food shouldn't go to waste. We empower communities to redirect surplus meals, fresh produce, and packaged food to those who need them most—responsibly and efficiently.
            </p>
          </div>
        </div>
        <div className="about-section-block values-block">
          <img
            src="/value.png"
            className="about-section-photo"
            alt="Values"
          />
          <div>
            <h3 className="about-section-title">What We Value</h3>
            <ul className="about-values-list">
              <li><span className="about-icon">🤝</span> Community & Compassion</li>
              <li><span className="about-icon">💡</span> Innovation & Transparency</li>
              <li><span className="about-icon">🌱</span> Sustainability</li>
              <li><span className="about-icon">🛡️</span> Safety & Trust</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section className="about-features modern-grid animate-slideInUp">
  <div className="about-feature-card">
    <span className="about-feature-icon">🍴</span>
    <h4>Easy Donations</h4>
    <p>Share food in seconds. Snap a photo and log it—our system does the rest.</p>
  </div>
  <div className="about-feature-card">
    <span className="about-feature-icon">⏱️</span>
    <h4>Real-Time Dashboard</h4>
    <p>Receivers view food offers live, book pickups, and track status instantly.</p>
  </div>
  <div className="about-feature-card">
    <span className="about-feature-icon">🎖️</span>
    <h4>Recognize Impact</h4>
    <p>Contributors see the lives they help, earn badges, and inspire others.</p>
  </div>
  
   
</section>


      {/* --- Impact Numbers --- */}
      <section className="about-impact-grid animate-fadeInUp">
        <div className="impact-card">
          <div className="impact-number">Our First 100</div>
          <div className="impact-label">Meals to Rescue</div>
        </div>
        <div className="impact-card">
          <div className="impact-number">Building to 50+</div>
          <div className="impact-label">Donations</div>
        </div>
        <div className="impact-card">
          <div className="impact-number">One Community</div>
          <div className="impact-label">United Against Waste</div>
        </div>
        <div className="impact-card">
          <div className="impact-number">Open Data</div>
          <div className="impact-label">Full Transparency</div>
        </div>
      </section>

      {/* --- Community --- */}
      <section className="about-community animate-fadeInUp">
        <img
          src="/bridge.png"
          alt="Community"
          className="about-community-img"
        />
        <div className="about-community-content">
          <h3 className="about-section-title">Everyone Can Be The Bridge</h3>
          <p>
            From individual families to restaurants, supermarkets to non-profits—our network is powered by diverse, passionate people working together. <br />
            <span className="about-accent">Contributors are the real superheroes of our mission.</span>
          </p>
          <Link to="/contributors" className="about-btn about-btn-outline">Meet All Contributors</Link>
        </div>
      </section>

      {/* --- Contact --- */}
      <section className="about-contact animate-slideInUp">
        <div className="about-contact-content">
          <h3 className="about-section-title">Let's Grow Together</h3>
          <p>
            Get in touch for partnerships, volunteering, or to share your Food Bridge story.<br />
            We’re always looking for new hands, hearts, and ideas!
          </p>
          <div className="about-contact-details">
            <div>
              <span className="about-contact-icon">✉️</span> support@foodbridge.org
            </div>
            <div>
              <span className="about-contact-icon">📞</span> +91-9606680966
            </div>
          </div>
          <div className="about-socials-large">
            <a href="https://facebook.com/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com/company/foodbridge" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="fe-footer animate-fadeInUp">
        © {new Date().getFullYear()} Food Bridge | Built with <span className="animate-heartBeat" role="img" aria-label="love">❤️</span> to reduce waste and feed hope.
      </footer>
    </div>
  );
};

export default About;
