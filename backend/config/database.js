const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using a cached connection for serverless environments
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable missing");
  }

  // Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is already in progress, return that promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
      console.log("MongoDB connected (serverless cache)");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

/**
 * Disconnect only for local dev, not for serverless
 */
const disconnectDB = async () => {
  if (process.env.NODE_ENV !== "production") {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
