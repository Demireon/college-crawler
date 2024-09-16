
# College Scraper

## Description

This project is a web scraper built with Node.js and Puppeteer that extracts college information from the College Board's BigFuture college search website. It collects data such as college name, city, state, and College Board code, and stores it in a MongoDB database. The scraper navigates through the college list, loads more colleges as needed, and processes each college individually.

## Features

- Scrapes college name, city, state, and College Board code from each college.
- Stores scraped data into a MongoDB database.
- Handles pagination by clicking the "Show More Colleges" button to load additional colleges.
- Implements random delays between actions to mimic human behavior.
- Includes basic unit tests using Jest.

## Prerequisites

- **Node.js**
- **MongoDB** (running locally or accessible via URI)

## Installation


1. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/collegescraper
   ```

   Replace the MongoDB URI with your own if necessary.

## Usage

1. **Start MongoDB**

   Ensure that your MongoDB server is running. If installed locally, you can start it with:

   ```bash
   mongosh
   ```

2. **Run the scraper**

   ```bash
   node app.js
   ```

   The scraper will launch a browser window and begin scraping the college data. Logs will be generated in the `logs/scraper.log` file.

3. **View the data**

   After the scraper has finished, you can view the data stored in MongoDB using the MongoDB shell or a GUI tool like MongoDB Compass.

## Testing

The project includes basic tests using Jest.

1. **Run tests**

   ```bash
   npm test
   ```

   This will run the test suites located in the `scraper/__tests__/` directory.

## Project Structure

```
├── app.js                     # Entry point of the application
├── config
│   └── config.js              # Configuration file
├── db
│   ├── mongodb.js             # MongoDB connection functions
│   └── CollegeModel.js        # Mongoose model for colleges
├── scraper
│   ├── __tests__              # Test suites for the scraper modules
│   │   ├── collegeScraper.test.js
│   │   ├── detailScraper.test.js
│   │   └── helpers.test.js
│   ├── helpers.js             # Helper functions (logging, delays)
│   ├── collegeScraper.js      # Scrapes college list data
│   ├── detailScraper.js       # Scrapes college detail data
│   └── index.js               # Orchestrator for the scraping process
├── logs
│   └── scraper.log            # Log file for scraper output
├── package.json               # Project metadata and scripts
└── .env                       # Environment variables (not committed to version control)
```

## Dependencies

- [puppeteer](https://www.npmjs.com/package/puppeteer) - Headless Chrome Node.js API
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool
- [jest](https://www.npmjs.com/package/jest) - JavaScript testing framework

## Configuration

The scraper uses a configuration file located at `config/config.js`. You can adjust parameters such as scraping delays and retry limits there.

```javascript
module.exports = {
  dbUrl: process.env.MONGO_URI,
  scraping: {
    minDelay: 5000,   // Minimum delay between actions (in milliseconds)
    maxDelay: 15000,  // Maximum delay between actions (in milliseconds)
    retryLimit: 3,    // Number of retries on failure
  },
};
```

## Logging

Logs are written to the `logs/scraper.log` file. The logging system captures informational messages and errors, which can help with debugging and monitoring the scraping process.

## Acknowledgments

- Uses the College Board's BigFuture college search website for data.

---

**Note:** This project is intended for educational purposes and should be used responsibly. Ensure compliance with the website's terms of service and scraping policies before running the scraper.
