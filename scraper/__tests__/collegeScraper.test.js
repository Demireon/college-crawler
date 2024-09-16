const { scrapeColleges } = require("../collegeScraper");

describe("scrapeColleges", () => {
  test("should scrape colleges from the page", async () => {
    // Mock the page object
    const page = {
      waitForSelector: jest.fn().mockResolvedValue(),
      evaluate: jest.fn().mockResolvedValue([
        {
          name: "Test College",
          city: "Test City",
          state: "TS",
          detailPageUrl: "https://example.com/college/test-college",
        },
      ]),
    };

    const colleges = await scrapeColleges(page);
    expect(page.waitForSelector).toHaveBeenCalledWith(
      "div.cs-search-results-list-display",
      { timeout: 60000 }
    );
    expect(colleges).toEqual([
      {
        name: "Test College",
        city: "Test City",
        state: "TS",
        detailPageUrl: "https://example.com/college/test-college",
      },
    ]);
  });
});
