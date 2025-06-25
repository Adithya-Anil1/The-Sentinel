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
    </div>
  )
}

export default App
