const serverless = require("serverless-http");
const app = require("../server");
const { connectDB } = require("../config/database");

let handler = null;
let isConnecting = null;

async function init() {
  if (handler) return handler;
  if (isConnecting) return isConnecting;

  // Start a connection attempt and cache the promise so concurrent requests wait
  isConnecting = (async () => {
    try {
      // Log presence of MONGO_URI (do not print full URI)
      const hasUri = Boolean(process.env.MONGO_URI);
      const uriPreview = hasUri
        ? `${process.env.MONGO_URI.slice(0, 8)}...${process.env.MONGO_URI.slice(
            -8
          )}`
        : null;
      console.log(
        "DB init: MONGO_URI present:",
        hasUri,
        hasUri ? `(preview ${uriPreview})` : ""
      );

      await connectDB();
      handler = serverless(app);

      // Log mongoose ready state if available
      try {
        const mongoose = require("mongoose");
        console.log(
          "Mongoose readyState:",
          mongoose.connection && mongoose.connection.readyState
        );
      } catch (e) {
        // ignore
      }

      return handler;
    } catch (err) {
      console.error("DB connect failed in init():", err && err.message);
      // Clear the in-progress marker so future requests will retry connect
      isConnecting = null;
      throw err;
    }
  })();

  return isConnecting;
}

module.exports = async (req, res) => {
  console.log("API hit:", req.method, req.url);
  try {
    const h = await init();
    return h(req, res);
  } catch (err) {
    console.error("Handler init error:", err && err.message);
    // Return a 500 with a concise message (avoid leaking secrets)
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ success: false, error: "Database connection failed" })
    );
  }
};
