# 📰 Project Sentinel

> **A modern, intelligent news aggregation platform that fetches, categorizes, and presents news articles from multiple RSS feeds with a professional, responsive interface.**


## 🌟 Features

- **Real-time News Aggregation** - Automatically fetches news from 12+ trusted sources every 10 minutes
- **Smart Categorization** - Organizes articles into Technology & Science, World News, Business, Politics, Weather, and Stocks
- **Responsive Design** - Mobile-first approach with smooth animations and professional UI
- **Live Search** - Full-text search across all articles with real-time filtering
- **Category Navigation** - Seamless category switching with smooth transitions
- **Professional UX** - Loading states, skeleton screens, and error handling
- **Performance Optimized** - Hardware-accelerated animations and efficient rendering

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **RSS Parser** - Fetches and parses RSS feeds
- **Node Cron** - Automated news fetching every 10 minutes
- **Axios** - HTTP client for RSS requests
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** + **Vite** - Modern build tooling and fast development
- **CSS3** - Custom styling with animations and responsive design
- **Axios** - API communication
- **Google Fonts** - Inter and Roboto typography

## 🏗 Project Structure

```
project-sentinel/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── featcher.js        # RSS feed fetching logic
│   ├── sources.js         # RSS feed source configuration
│   ├── db.json           # JSON-based article storage
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── components/       # Reusable UI components
│   │   │   ├── TrendingArticles.jsx
│   │   │   ├── CategoryNavigation.jsx
│   │   │   └── ArticleGrid.jsx
│   │   └── styles/          # Component-specific CSS files
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adithya-Anil1/Sentinel.git
   cd Sentinel
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   Server will start at `http://localhost:3001`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Application will open at `http://localhost:5173`

### Available Scripts

#### Backend
```bash
node server.js    # Start the Express server
```

#### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 📡 News Sources

The platform aggregates news from trusted sources across multiple categories:

- **Technology & Science**: CNN Tech, NASA Breaking News
- **World News**: CNN World, NPR World
- **Business**: CNN Money, MarketWatch
- **Politics**: CNN Politics, NPR Politics
- **Weather**: National Weather Service
- **Stocks**: Yahoo Finance, MarketWatch

## 🎨 UI Features

- **Dark Theme Ready** - Optimized color scheme for dark mode
- **Smooth Animations** - Staggered card animations with hardware acceleration
- **Loading States** - Professional skeleton loading screens
- **Responsive Grid** - Adapts to different screen sizes seamlessly
- **Interactive Elements** - Hover effects and smooth transitions
- **Accessibility** - WCAG compliant with keyboard navigation support

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Frontend origin for CORS configuration

### Customizing News Sources
Edit `backend/sources.js` to add or modify RSS feed sources:
```javascript
const sources = {
  'Your Category': [
    'https://example.com/rss-feed.xml',
    // Add more feeds...
  ]
};
```

## 📊 API Endpoints

- `GET /` - Health check endpoint
- `GET /api/articles` - Returns all categorized articles in JSON format

Example response:
```json
{
  "Technology & Science": [
    {
      "title": "Article Title",
      "link": "https://...",
      "pubDate": "2025-07-19T12:00:00Z"
    }
  ],
  "World News": [...]
}
```

## 🔄 How It Works

1. **RSS Fetching**: Server automatically fetches articles from configured RSS feeds every 10 minutes
2. **Data Processing**: Articles are parsed, categorized, and stored in `db.json`
3. **API Serving**: Frontend requests articles via REST API endpoints
4. **Real-time Updates**: UI updates automatically with new articles
5. **User Interaction**: Users can filter by category, search, and navigate smoothly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👨‍💻 Author

**Adithya Anil**
- GitHub: [@Adithya-Anil1](https://github.com/Adithya-Anil1)

