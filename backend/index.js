const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Replace with your actual Google API Key and Custom Search Engine ID
const GOOGLE_API_KEY = 'AIzaSyCkAfhExYcwvZK4oCVWK53AyBCVQP1Kjko';
const GOOGLE_CSE_ID = '36cb1d55c6f38470a';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API endpoint for searching
app.post('/search', async (req, res) => {
  const searchQuery = req.body.query;
  console.log(`Received search query: ${searchQuery}`);

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(searchQuery)}`;

    const response = await axios.get(googleApiUrl);
    const searchData = response.data;

    const results = searchData.items ? searchData.items.map(item => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet,
    })) : [];

    res.json({ results });

  } catch (error) {
    console.error('Error fetching from Google Search API:', error.message);
    console.error('Google API error response:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ error: 'Error fetching search results.' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
}); 