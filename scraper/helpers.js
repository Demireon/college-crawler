const fs = require('fs');
const path = require('path');

// Log file path
const logFilePath = path.join(__dirname, '../logs/scraper.log');

// Clear the log file at the start of each run
function clearLogFile() {
  fs.writeFileSync(logFilePath, '');
}

// Log messages with different levels (info, error, etc.)
function logMessage(level, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${level.toUpperCase()}]: ${message}\n`;
  fs.appendFileSync(logFilePath, logEntry);
}

// Randomize delays between requests to avoid bot detection
function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Initialize logging
clearLogFile();

module.exports = { logMessage, randomDelay };