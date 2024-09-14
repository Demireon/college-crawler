const { scrapeColleges } = require('./collegeScraper');
const { scrapeCollegeDetails } = require('./detailScraper');
const { logMessage, randomDelay } = require('./helpers');
const { scraping } = require('../config/config');
const College = require('../db/collegeModel');

async function runScraper(page) {
  try {
    logMessage('info', 'Starting scraping process...');
    await page.goto('https://bigfuture.collegeboard.org/college-search', { waitUntil: 'networkidle2' });

    let processedColleges = new Set();

    while (true) {
      // Scrape colleges on the current page
      const colleges = await scrapeColleges(page);

      // Process each college that hasn't been processed yet
      for (const college of colleges) {
        if (processedColleges.has(college.detailPageUrl)) {
          continue; // Skip if already processed
        }

        processedColleges.add(college.detailPageUrl);

        // Wait a random time between 5 to 15 seconds
        const delay = randomDelay(scraping.minDelay, scraping.maxDelay);
        logMessage('info', `Waiting for ${delay} milliseconds before processing next college...`);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Scrape the individual college details
        const fullCollegeData = await scrapeCollegeDetails(page, college);

        // Save to MongoDB
        try {
          const existingCollege = await College.findOne({ name: fullCollegeData.name });
          if (!existingCollege) {
            const collegeDoc = new College(fullCollegeData);
            await collegeDoc.save();
            logMessage('info', `Saved data for ${fullCollegeData.name}`);
          } else {
            logMessage('info', `College ${fullCollegeData.name} already exists in the database`);
          }
        } catch (dbError) {
          logMessage('error', `Error saving data for ${fullCollegeData.name}: ${dbError.message}`);
        }

        // Navigate back to the college list page
        await page.goBack({ waitUntil: 'networkidle2', timeout: 60000 });
      }

      // Check if the "Show More Colleges" button is present
      const showMoreButton = await page.$('button[data-testid="cs-show-more-results"]');
      if (showMoreButton) {
        logMessage('info', 'Show More Colleges button found.');

        // Wait a random time before clicking the button
        const delay = randomDelay(scraping.minDelay, scraping.maxDelay);
        logMessage('info', `Waiting for ${delay} milliseconds before clicking "Show More Colleges" button.`);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Get the current number of college cards
        const previousCollegeCount = await page.evaluate(() => document.querySelectorAll('div.cs-college-card-outer-container').length);

        // Click the button and wait for more colleges to load
        await Promise.all([
          showMoreButton.click(),
          page.waitForFunction(
            (prevCount) => {
              return document.querySelectorAll('div.cs-college-card-outer-container').length > prevCount;
            },
            { timeout: 60000 },
            previousCollegeCount
          ),
        ]);

        logMessage('info', 'Clicked "Show More Colleges" button to load more colleges...');
      } else {
        logMessage('info', 'Show More Colleges button not found. Exiting loop.');
        // No more colleges to load
        break;
      }
    }

    logMessage('info', 'Scraping process completed successfully');
  } catch (error) {
    logMessage('error', `Error during scraping: ${error.message}`);
  }
}

module.exports = { runScraper };