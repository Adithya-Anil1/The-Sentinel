
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
      <div className="featured-article-card" style={{ backgroundImage: `url(${featuredArticle.image})` }}>
        <div className="card-overlay">
          <div className="card-content">
            <span className="category-tag">{featuredArticle.category}</span>
            <h2 className="article-title">{featuredArticle.title}</h2>
            <p className="article-meta">By {featuredArticle.author} on {featuredArticle.date}</p>
          </div>
        </div>
      </div>
      <div className="other-articles">
        {otherArticles.map((article, index) => (
          <div key={index} className="small-article-card" style={{ backgroundImage: `url(${article.image})` }}>
            <div className="card-overlay">
              <div className="card-content">
                <span className="category-tag">{article.category}</span>
                <h3 className="article-title-small">{article.title}</h3>
                <p className="article-meta-small">By {article.author} on {article.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
