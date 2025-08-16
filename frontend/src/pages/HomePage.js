import React from "react";
import { Link } from "react-router-dom";
import HeroBackgroundSlider from "../components/HeroBackgroundSlider";
import "../styles/HomePage.css";


const HomePage = ({ user }) => {
  const displayName = user?.username || user?.name || user?.email || null;

  return (
    <div className="fe-bg">
     

      {/* Hero Section with Sliding Background */}
      <section className="homepage-hero" style={{ position: "relative", overflow: "hidden" }}>
        <HeroBackgroundSlider />
        <div className="hero-content" style={{ position: "relative", zIndex: 10 }}>
          <h1>FoodBridge</h1>
          <p>Elevating kindness with every meal shared.</p>
          <Link to="/donate" className="hero-btn">Donate Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="fe-features-row animate-fadeInUp">
        <div className="fe-feature-card">
          <img
            src="/sharing.png"
            alt="Sharing Food"
            className="fe-feature-img"
          />
          <h3>Seamless Sharing</h3>
          <p>Snap, post, and reach those in need instantly.</p>
        </div>
        <div className="fe-feature-card">
          <img
            src="/impact.png"
            alt="Community Impact"
            className="fe-feature-img"
          />
          <h3>Impact in Focus</h3>
          <p>Explore positive stories—see your impact in real-time.</p>
        </div>
        <div className="fe-feature-card">
          <img
            src="/community.png"
            alt="Celebrated Community"
            className="fe-feature-img"
          />
          <h3>Celebrated Community</h3>
          <p>Be honored for your generosity and join joyful changemakers.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="fe-impact-section animate-fadeInUp">
        <h2 className="fe-impact-title">How It Works</h2>
        <div className="fe-steps">
          <div className="impact-card">
            <span className="fe-step-number">1</span>
            <h4>Donate</h4>
            <p>Share extra food quickly and easily.</p>
          </div>
          <div className="impact-card">
            <span className="fe-step-number">2</span>
            <h4>Distribute</h4>
            <p>Trusted partners deliver meals with care and safety.</p>
          </div>
          <div className="impact-card">
            <span className="fe-step-number">3</span>
            <h4>Inspire</h4>
            <p>See your generosity ripple across communities.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="fe-cta-section animate-fadeInUp">
        <div>
          <h2>Become a Part of FoodBridge</h2>
          <p>
            <b>Why Join FoodBridge?</b><br />
            FoodBridge is more than a platform—it’s a heartfelt movement where every individual can contribute to making the world more compassionate and sustainable. By joining us, you become an essential link in a chain of kindness that turns surplus food into smiles and hope.<br />
            <br />
            Bridge the gap between surplus and smiles. Every act, big or small, makes a difference.
          </p>
          <Link to="/register" className="fe-btn fe-btn-gold fe-btn-large mt-4">
            Join Our Family
          </Link>
        </div>
        <img
          src="/donate.png"
          alt="Group of Volunteers"
          className="fe-cta-image"
        />
      </section>

      {/* Impact Numbers */}
      <section className="fe-impact-numbers animate-fadeInUp">
        <div className="fe-impact-number">
          <div>100%</div>
          <span>Digital Certificate</span>
        </div>
        <div className="fe-impact-number">
          <div>99%</div>
          <span>Zero Waste</span>
        </div>
        <div className="fe-impact-number">
          <div>100%</div>
          <span>Fresh food</span>
        </div>
        <div className="fe-impact-number">
          <div>100%</div>
          <span>Transparency</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="fe-footer animate-fadeInUp"></footer>
    </div>
  );
};

export default HomePage;
