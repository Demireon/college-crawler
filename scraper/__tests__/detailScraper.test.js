const { scrapeCollegeDetails } = require("../detailScraper");

describe("scrapeCollegeDetails", () => {
  test("should scrape college board code from the detail page", async () => {
    const college = {
      name: "Test College",
      detailPageUrl: "https://example.com/college/test-college",
    };

    // Mock the page object
    const page = {
      goto: jest.fn().mockResolvedValue(),
      waitForSelector: jest.fn().mockResolvedValue(),
      evaluate: jest.fn().mockResolvedValue("1234"),
    };

    const result = await scrapeCollegeDetails(page, college);

    expect(page.goto).toHaveBeenCalledWith(college.detailPageUrl, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    expect(page.waitForSelector).toHaveBeenCalledWith(
      'div[data-testid="csp-more-about-college-board-code-valueId"]',
      { timeout: 10000 }
    );
    expect(result).toEqual({
      ...college,
      collegeBoardCode: "1234",
    });
  });
});
