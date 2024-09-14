const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

app.get('/api/news', async (req, res) => {
  const country = req.query.country || 'us';  // Default to 'us'
  const category = req.query.category || '';   // Default to an empty string if no category is selected

  try {
    // Construct the API URL with both country and category (if category is specified)
    let apiUrl = `https://gnews.io/api/v4/top-headlines?apikey=d32aef9cfbadd27228caa289c66bb8af&country=${country}`;
    if (category) {
      apiUrl += `&topic=${category}`;  // Append category if it exists
    }

    const response = await axios.get(apiUrl);
    
    // Check if the response is valid
    if (response.data && response.data.articles) {
      res.json(response.data);
    } else {
      res.status(500).json({ message: 'Invalid response structure' });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
