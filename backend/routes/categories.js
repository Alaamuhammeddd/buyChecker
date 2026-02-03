const express = require("express");
const router = express.Router();
const Bought = require("../models/bought");
const ToBuy = require("../models/toBuy");

/**
 * GET /categories/list
 * Fetch distinct categories from both bought and toBuy
 */
router.get("/list", async (req, res) => {
  try {
    const [boughtCategories, toBuyCategories] = await Promise.all([
      Bought.distinct("category"),
      ToBuy.distinct("category"),
    ]);

    const merged = Array.from(
      new Set([...(boughtCategories || []), ...(toBuyCategories || [])])
    ).filter(Boolean);

    res.json({ success: true, data: merged });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
