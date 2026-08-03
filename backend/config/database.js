const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using a cached connection
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection if one isn't already in progress
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        cached.promise = null; // Allow retry on next attempt
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

/**
 * Disconnect from MongoDB (used only in local development)
 */
const disconnectDB = async () => {
  if (process.env.NODE_ENV !== "production") {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("MongoDB disconnected");
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
