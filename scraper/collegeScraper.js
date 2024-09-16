const { logMessage } = require("./helpers");

async function scrapeColleges(page) {
  try {
    logMessage("info", "Scraping college list page...");

    // Wait for the college list to load
    await page.waitForSelector("div.cs-search-results-list-display", {
      timeout: 60000,
    });

    // Scrape colleges currently visible on the page (first 15 colleges)
    const colleges = await page.evaluate(() => {
      // Query all the college card containers
      const collegeElements = document.querySelectorAll(
        "div.cs-college-card-outer-container"
      );

      // Extract relevant information from each card
      return Array.from(collegeElements).map((college) => {
        const name =
          college
            .querySelector("h3.cs-college-card-college-name")
            ?.innerText.trim() || "N/A"; // College name
        const locationText =
          college
            .querySelector("div.cs-college-card-college-address")
            ?.innerText.trim() || ""; // Location
        const [city, state] = locationText.split(", ").map((str) => str.trim()); // Split into city and state
        const detailPageUrl =
          college.querySelector("a.cs-college-card-college-name-link")?.href ||
          null; // URL to detail page

        return { name, city, state, detailPageUrl };
      });
    });

    logMessage("info", `Scraped ${colleges.length} colleges from the list`);
    return colleges;
  } catch (error) {
    logMessage("error", `Error scraping colleges: ${error.message}`);
    throw error;
  }
}

module.exports = { scrapeColleges };
