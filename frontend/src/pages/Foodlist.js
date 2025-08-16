import React from 'react';
import '../styles/FoodList.css';

const FoodList = ({ foodItems }) => {
  return (
    <div className="lux-bg-food min-h-screen">
      {/* Header */}
      <header className="lux-header">
        <h1>Available Food Donations</h1>
        <p>
          Explore fresh surplus food shared by generous donors in your area.<br />
          Ready to help or need assistance? Join us in reducing waste and feeding hope.
        </p>
      </header>

      {/* Food Items Grid */}
      <div className="lux-grid-food">
        {foodItems.length === 0 ? (
          <div className="lux-empty">
            No food donations available right now.<br />
            Please check back soon or become our next donor!
          </div>
        ) : (
          foodItems.map(({ id, name, quantity, location, expiry }) => (
            <div key={id} className="lux-card-food">
              <div className="lux-img-wrap">
                <img
                  src="/food-placeholder.jpg"
                  alt={name}
                  className="lux-food-img"
                />
              </div>
              <div className="lux-info">
                <h3>{name}</h3>
                <p><span>Quantity:</span> {quantity} pcs</p>
                <p><span>Location:</span> {location}</p>
                <p className="lux-expiry">
                  <span>Expires on:</span> {expiry}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="lux-footer-food">
        Food Bridge &mdash; Together, we create golden moments by reducing waste and feeding hope.
      </footer>
    </div>
  );
};

export default FoodList;
