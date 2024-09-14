const { logMessage } = require('./helpers');

async function scrapeCollegeDetails(page, college) {
  try {
    logMessage('info', `Scraping details for ${college.name}`);

    await page.goto(college.detailPageUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for the College Board Code element to load
    await page.waitForSelector('div[data-testid="csp-more-about-college-board-code-valueId"]', { timeout: 10000 });

    // Extract College Board Code
    const collegeBoardCode = await page.evaluate(() => {
      const codeElement = document.querySelector('div[data-testid="csp-more-about-college-board-code-valueId"]');
      return codeElement ? codeElement.innerText.trim() : null;
    });

    logMessage('info', `Scraped College Board Code for ${college.name}: ${collegeBoardCode || 'Not Found'}`);
    return { ...college, collegeBoardCode };
  } catch (error) {
    logMessage('error', `Error scraping details for ${college.name}: ${error.message}`);
    return { ...college, collegeBoardCode: null }; // Return null code if error occurs
  }
}

module.exports = { scrapeCollegeDetails };