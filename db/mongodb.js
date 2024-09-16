const mongoose = require("mongoose");
const { logMessage } = require("../scraper/helpers");

async function connectDB() {
  try {
    await mongoose.connect(require("../config/config").dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logMessage("info", "Connected to MongoDB");
  } catch (error) {
    logMessage("error", `MongoDB connection error: ${error.message}`);
    throw error;
  }
}

async function clearDatabase() {
  try {
    await mongoose.connection.db.dropDatabase();
    logMessage("info", "Cleared the database");
  } catch (error) {
    logMessage("error", `Error clearing the database: ${error.message}`);
    throw error;
  }
}

module.exports = { connectDB, clearDatabase };
