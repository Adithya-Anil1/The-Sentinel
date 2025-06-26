import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TrendingArticles from './components/TrendingArticles'

function App() {
  const [articles, setArticles] = useState({})
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const trendingArticles = [
    {
      title: 'The Future of AI: Trends to Watch in 2025',
      author: 'Jane Doe',
      date: 'June 26, 2025',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1593349480503-64d3518a65a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Global Markets Rally as New Trade Agreements Signed',
      author: 'John Smith',
      date: 'June 25, 2025',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1554260570-e9689a3418b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Exploring the Amazon: A Journey to the Heart of the Jungle',
      author: 'Emily White',
      date: 'June 24, 2025',
      category: 'Travel',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319235?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'The Rise of Sustainable Architecture',
      author: 'David Green',
      date: 'June 23, 2025',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3001/api/articles')
        setArticles(response.data)
        setLastUpdated(new Date())
        console.log('Articles fetched successfully:', response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
    
    // Set up interval to refresh articles every 10 minutes
    const interval = setInterval(fetchArticles, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date().toLocaleDateString('en-US', options)
  }

  const categories = ['All', 'Technology & Science', 'World News', 'Business', 'Politics', 'Weather', 'Stocks']

  const getFilteredArticles = () => {
    let filteredArticles = activeFilter === 'All' ? articles : { [activeFilter]: articles[activeFilter] || [] }
    
    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      const searchResults = {}
      Object.keys(filteredArticles).forEach(category => {
        const filtered = filteredArticles[category].filter(article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        if (filtered.length > 0) {
          searchResults[category] = filtered
        }
      })
      return searchResults
    }
    
    return filteredArticles
  }

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line subtitle"></div>
      <div className="skeleton-line content"></div>
      <div className="skeleton-line content" style={{width: '70%'}}></div>
    </div>
  )

  // Render skeleton cards while loading
  const renderSkeletonCards = () => (
    <div className="articles-container">
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )

  const handleCategoryClick = (category) => {
    setIsTransitioning(true)
    
    // Start fade out transition
    setTimeout(() => {
      setActiveFilter(category)
      setMobileMenuOpen(false)
      
      // Smooth scroll to category section
      if (category !== 'All') {
        setTimeout(() => {
          const element = document.querySelector(`[data-category-section="${category}"]`)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      
      // End transition after a delay
      setTimeout(() => {
        setIsTransitioning(false)
      }, 400)
    }, 150)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now - date
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      return `${diffInMinutes} min ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      })
    }
  }

  const getEstimatedReadTime = (title) => {
    // Estimate read time based on title length (rough approximation)
    const wordCount = title.split(' ').length
    const readTime = Math.max(1, Math.ceil(wordCount / 50)) // Assuming 200 WPM, but title is short
    return Math.min(5, readTime + Math.floor(Math.random() * 3) + 1) // Random 1-5 min
  }

  const getSourceInfo = (category) => {
    const sourceMap = {
      'Technology & Science': { 
        name: 'TechNews', 
        icon: '💻',
        color: '#4285f4'
      },
      'World News': { 
        name: 'WorldWire', 
        icon: '🌍',
        color: '#9c27b0'
      },
      'Business': { 
        name: 'BizDaily', 
        icon: '💼',
        color: '#34a853'
      },
      'Politics': { 
        name: 'PoliticoLive', 
        icon: '🏛️',
        color: '#ea4335'
      },
      'Weather': { 
        name: 'WeatherNow', 
        icon: '⛅',
        color: '#00bcd4'
      },
      'Stocks': { 
        name: 'MarketWatch', 
        icon: '📈',
        color: '#ff9800'
      }
    }
    return sourceMap[category] || { name: 'NewsSource', icon: '📰', color: '#4285f4' }
  }

  const generatePreview = (title) => {
    // Generate a realistic preview based on the title
    const templates = [
      `${title.substring(0, 50)}... Stay informed with the latest developments in this breaking story that continues to unfold.`,
      `Breaking news update on ${title.toLowerCase().substring(0, 40)}... Our reporters are following this story closely as details emerge.`,
      `Latest information reveals ${title.toLowerCase().substring(0, 45)}... This developing situation has significant implications for the industry.`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const formatLastUpdated = () => {
    const now = new Date()
    const diffInMs = now - lastUpdated
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    
    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    }
  }

  // Empty state component
  const EmptyState = ({ category }) => (
    <div className="empty-state">
      <div className="empty-state-icon">📰</div>
      <h3 className="empty-state-title">No articles found</h3>
      <p className="empty-state-message">
        {searchQuery.trim() 
          ? `No articles match "${searchQuery}" in ${category}`
          : `No articles available in ${category} at the moment`
        }
      </p>
      {searchQuery.trim() && (
        <button 
          className="empty-state-button"
          onClick={() => setSearchQuery('')}
        >
          Clear search
        </button>
      )}
    </div>
  )

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Project Sentinel</h1>
          <p className="hero-date">{getCurrentDate()}</p>
          <p className="hero-tagline">Curated news, intelligently organized</p>
        </div>
      </header>

      {/* Trending Articles Hero Section */}
      <TrendingArticles articles={trendingArticles} />

      {/* Enhanced Sticky Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          {/* Desktop Categories */}
          <div className="nav-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`nav-button ${activeFilter === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`nav-button ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mobile-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading latest news...</p>
            {renderSkeletonCards()}
          </div>
        ) : (
          <>
            {/* Last Updated */}
            <div className="last-updated">
              <span className="update-indicator"></span>
              Last updated: {formatLastUpdated()}
            </div>
            
            <div className={`articles-grid ${isTransitioning ? 'transitioning' : ''}`}>
            {Object.keys(getFilteredArticles()).map((category) => (
              <section key={category} className="category-section" data-category-section={category}>
                {activeFilter === 'All' && (
                  <h2 className="category-title">{category}</h2>
                )}
                <div className="articles-container">
                  {getFilteredArticles()[category]?.length === 0 ? (
                    <EmptyState category={category} />
                  ) : (
                    getFilteredArticles()[category]?.slice(0, 12).map((article, index) => {
                      const sourceInfo = getSourceInfo(category)
                      return (
                        <article 
                          key={index} 
                          className={`article-card animate-in ${isTransitioning ? 'transitioning' : ''}`}
                          data-category={category}
                          style={{'--delay': `${index * 0.1}s`}}
                        >
                          <div className="article-header">
                            <h3 className="article-title">
                              <a 
                                href={article.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="article-link"
                              >
                                {article.title}
                              </a>
                            </h3>
                            <span 
                              className="source-badge" 
                              style={{'--badge-color': sourceInfo.color}}
                            >
                              <span className="source-icon">{sourceInfo.icon}</span>
                              {sourceInfo.name}
                            </span>
                          </div>
                          
                          <p className="article-preview">
                            {generatePreview(article.title)}
                          </p>
                          
                          <div className="article-meta">
                            <span className="article-timestamp">{formatDate(article.pubDate)}</span>
                            <span className="read-time">{getEstimatedReadTime(article.title)} min read</span>
                          </div>
                        </article>
                      )
                    })
                  )}
                </div>
                {getFilteredArticles()[category]?.length === 0 && (
                  <EmptyState category={category} />
                )}
              </section>
            ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Project Sentinel</h3>
            <p className="footer-description">
              Intelligent news aggregation platform bringing you curated content from trusted sources.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <div className="footer-links">
              {categories.slice(1).map(category => (
                <button 
                  key={category}
                  className="footer-link"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Features</h4>
            <ul className="footer-list">
              <li>Real-time updates</li>
              <li>Smart categorization</li>
              <li>Mobile responsive</li>
              <li>Dark mode ready</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Project Sentinel. Real-time news aggregation.</p>
          <p className="footer-tech">Built with React, Vite & Express</p>
        </div>
      </footer>
    </div>
  )
}

export default App
