
import React from 'react';
import './ArticleGrid.css';

const ArticleGrid = ({ articles }) => {
  return (
    <div className="article-grid">
      {articles.map((article, index) => (
        <div key={index} className="article-card-main">
          <div className="image-container">
            <img src={article.image} alt={article.title} className="article-image" />
          </div>
          <div className="card-content-main">
            <div className="card-meta">
              <span className="card-category">{article.category}</span>
              <span className="card-date">{article.date}</span>
            </div>
            <h3 className="article-title-main">{article.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleGrid;
