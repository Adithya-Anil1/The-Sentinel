import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [articles, setArticles] = useState({})

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/articles')
        setArticles(response.data)
        console.log('Articles fetched successfully:', response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div>
      <h1>Project Sentinel News</h1>
      
      {Object.keys(articles).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {articles[category].map((article, index) => (
              <li key={index}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App
