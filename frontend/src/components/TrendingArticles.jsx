
import React from 'react';
import './TrendingArticles.css';

const TrendingArticles = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 4);

  return (
    <div className="trending-hero-section">
      <div className="featured-article-card">
        <div className="background-image" style={{ backgroundImage: `url(${featuredArticle.image})` }}></div>
        <span className="category-tag">{featuredArticle.category}</span>
        <div className="card-overlay">
          <div className="card-content">
            <h2 className="article-title">{featuredArticle.title}</h2>
            <p className="article-meta">By {featuredArticle.author} on {featuredArticle.date}</p>
          </div>
        </div>
      </div>
      <div className="other-articles">
        {otherArticles.map((article, index) => (
          <div key={index} className="small-article-card">
            <div className="background-image" style={{ backgroundImage: `url(${article.image})` }}></div>
            <span className="category-tag">{article.category}</span>
            <div className="card-overlay">
              <div className="card-content">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-meta">By {article.author} on {article.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
