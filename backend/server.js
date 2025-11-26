const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
const cors = require("cors");
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const toBuyRoutes = require("./routes/toBuy");
const boughtRoutes = require("./routes/bought");

app.use("/api/tobuy", toBuyRoutes);
app.use("/api/bought", boughtRoutes);

module.exports = app;

// LOCAL MODE ONLY
if (require.main === module) {
  const { connectDB } = require("./config/database");
  const PORT = process.env.PORT || 3000;

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server running on http://localhost:" + PORT);
    });
  });
}
