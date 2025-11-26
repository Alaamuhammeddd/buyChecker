const express = require("express");
const app = express();

// Use environment port when provided by platform (e.g. Vercel).
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// When running locally (node server.js) start the HTTP server.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
  });
}

// Export the app so platforms (serverless wrappers) can reuse it.
module.exports = app;
