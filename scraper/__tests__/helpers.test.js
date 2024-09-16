const { randomDelay } = require("../helpers");

describe("randomDelay", () => {
  test("should return a number between min and max", () => {
    const min = 5000;
    const max = 15000;
    for (let i = 0; i < 10; i++) {
      const delay = randomDelay(min, max);
      expect(delay).toBeGreaterThanOrEqual(min);
      expect(delay).toBeLessThanOrEqual(max);
    }
  });
});
