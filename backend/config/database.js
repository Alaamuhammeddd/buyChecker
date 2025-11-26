const mongoose = require("mongoose");

/**
 * Connect to MongoDB using Mongoose
 * Reads MONGO_URI from environment variables
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGO_URI environment variable is not defined. Please set it in .env or your deployment platform."
      );
    }

    await mongoose.connect(mongoUri, {
      // Mongoose connection options
      // These are recommended for MongoDB Atlas
    });

    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
};

/**
 * Disconnect from MongoDB
 * Useful for graceful shutdowns or testing
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB:", error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
