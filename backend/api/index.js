const serverless = require("serverless-http");
const app = require("../server");
const { connectDB } = require("../config/database");

// Ensure DB connection is established before handling requests in serverless
let handler = null;
let connecting = null;

async function ensureConnected() {
  if (handler) return;
  if (connecting) return connecting;

  connecting = (async () => {
    try {
      await connectDB();
      handler = serverless(app);
      return handler;
    } catch (err) {
      // rethrow so Vercel shows the error in logs
      console.error(
        "DB connect failed in serverless wrapper:",
        err && err.message
      );
      throw err;
    }
  })();

  return connecting;
}

module.exports = async (req, res) => {
  // lightweight log to help debug route resolution in deployments
  console.log("Incoming request:", req.method, req.url);

  // Ensure DB is connected and handler is ready
  await ensureConnected();

  return handler(req, res);
};
