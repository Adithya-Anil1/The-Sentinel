const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors());

// Create a GET route at the root path
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});