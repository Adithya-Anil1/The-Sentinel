import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [articles, setArticles] = useState({})
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3001/api/articles')
        setArticles(response.data)
        console.log('Articles fetched successfully:', response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
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

  const handleCategoryClick = (category) => {
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

  const getSourceName = (category) => {
    const sourceMap = {
      'Technology & Science': 'TechNews',
      'World News': 'WorldWire',
      'Business': 'BizDaily',
      'Politics': 'PoliticoLive',
      'Weather': 'WeatherNow',
      'Stocks': 'MarketWatch'
    }
    return sourceMap[category] || 'NewsSource'
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
          </div>
        ) : (
          <div className="articles-grid">
            {Object.keys(getFilteredArticles()).map((category) => (
              <section key={category} className="category-section" data-category-section={category}>
                {activeFilter === 'All' && (
                  <h2 className="category-title">{category}</h2>
                )}
                <div className="articles-container">
                  {getFilteredArticles()[category]?.slice(0, 12).map((article, index) => (
                    <article key={index} className="article-card" data-category={category}>
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
                        <span className="source-badge">{getSourceName(category)}</span>
                      </div>
                      
                      <p className="article-preview">
                        {generatePreview(article.title)}
                      </p>
                      
                      <div className="article-meta">
                        <span className="article-timestamp">{formatDate(article.pubDate)}</span>
                        <span className="read-time">{getEstimatedReadTime(article.title)} min read</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Project Sentinel. Real-time news aggregation.</p>
      </footer>
    </div>
  )
}

export default App
