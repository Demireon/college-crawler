require("dotenv").config();

module.exports = {
  dbUrl: process.env.MONGO_URI,
  scraping: {
    minDelay: 5000, // Minimum delay of 5 seconds between scraping requests
    maxDelay: 15000, // Maximum delay of 15 seconds between scraping requests
    retryLimit: 3, // Retry 3 times on failure
  },
};
