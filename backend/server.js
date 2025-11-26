const express = require("express");
const dotenv = require("dotenv");
const { connectDB, disconnectDB } = require("./config/database");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use environment port when provided by platform (e.g. Vercel).
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Simple health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// When running locally (node server.js) start the HTTP server.
if (require.main === module) {
  (async () => {
    try {
      // Connect to MongoDB before starting the server
      await connectDB();

      app.listen(PORT, () => {
        console.log(`Express server running at http://localhost:${PORT}/`);
      });

      // Handle graceful shutdown
      process.on("SIGINT", async () => {
        console.log("\nShutting down gracefully...");
        await disconnectDB();
        process.exit(0);
      });
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    }
  })();
}

// Export the app so platforms (serverless wrappers) can reuse it.
module.exports = app;
