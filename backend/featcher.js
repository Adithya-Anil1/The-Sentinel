const Parser = require('rss-parser');
const sources = require('./sources');

const parser = new Parser();

async function fetchAllArticles() {
  const categorizedArticles = {};

  // Loop through each category in the sources object
  for (const [category, feedUrls] of Object.entries(sources)) {
    console.log(`Fetching articles for category: ${category}`);
    categorizedArticles[category] = [];

    // Loop through each RSS feed URL in the current category
    for (const feedUrl of feedUrls) {
      try {
        console.log(`  Fetching from: ${feedUrl}`);
        const feed = await parser.parseURL(feedUrl);
        
        // Extract articles with title, link, and pubDate
        const articles = feed.items.map(item => ({
          title: item.title || 'No title',
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || 'No date'
        }));

        // Add articles to the category array
        categorizedArticles[category].push(...articles);
        
      } catch (error) {
        console.error(`Error fetching from ${feedUrl}:`, error.message);
      }
    }

    console.log(`Found ${categorizedArticles[category].length} articles in ${category}`);
  }

  console.log('\n=== CATEGORIZED ARTICLES ===');
  console.log(JSON.stringify(categorizedArticles, null, 2));
  
  return categorizedArticles;
}

module.exports = { fetchAllArticles };

// Test the function if this file is run directly
if (require.main === module) {
  fetchAllArticles()
    .then(() => {
      console.log('\nFetch completed successfully!');
    })
    .catch(error => {
      console.error('Error in fetchAllArticles:', error);
    });
}