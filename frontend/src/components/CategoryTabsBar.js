import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryTabsBar.css';

const CategoryTabsBar = () => {
  return (
    <div className="category-tabs-bar">
      <div className="tab-links">
        <Link to="/view">View Food</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/contributors">Contributors</Link>
        <Link to="/badges">Badges</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default CategoryTabsBar;
