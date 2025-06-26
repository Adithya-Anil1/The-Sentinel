
import React from 'react';
import './CategoryNavigation.css';

const CategoryNavigation = () => {
  const categories = ['All', 'World News', 'Technology', 'Business', 'Sports', 'Health', 'Travel'];

  return (
    <nav className="category-nav-sticky">
      <div className="category-nav">
        <button className="category-tab dont-miss">DON'T MISS</button>
        {categories.map((category, index) => (
          <button key={index} className={`category-tab ${index === 0 ? 'active' : ''}`}>
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNavigation;
