const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { fetchAllArticles } = require('./featcher');

const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors());

// Create a GET route at the root path
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Schedule fetchAllArticles to run every 10 minutes
cron.schedule('*/10 * * * *', () => {
  console.log('🕐 Running scheduled news fetch (every 10 minutes)...');
  fetchAllArticles()
    .then(() => {
      console.log('✅ Scheduled news fetch completed successfully');
    })
    .catch(error => {
      console.error('❌ Error in scheduled news fetch:', error);
    });
});

// Run fetchAllArticles once when server starts
console.log('🚀 Starting initial news fetch...');
fetchAllArticles()
  .then(() => {
    console.log('✅ Initial news fetch completed successfully');
  })
  .catch(error => {
    console.error('❌ Error in initial news fetch:', error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});