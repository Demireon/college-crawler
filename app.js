const puppeteer = require("puppeteer");
const { connectDB, clearDatabase } = require("./db/mongodb");
const { runScraper } = require("./scraper/index");
const { logMessage } = require("./scraper/helpers");
const mongoose = require("mongoose");

(async () => {
  try {
    logMessage("info", "Starting scraper...");

    // Connect to MongoDB
    await connectDB();

    // Clear the database before starting
    await clearDatabase();

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: false }); // headless is false for testing purposes
    const page = await browser.newPage();

    // Run the scraper
    await runScraper(page);

    logMessage("info", "Scraper finished successfully");

    // Close the browser
    await browser.close();

    // Close MongoDB connection
    await mongoose.connection.close();
    logMessage("info", "Closed MongoDB connection");
  } catch (error) {
    logMessage("error", `An error occurred: ${error.message}`);
  }
})();
