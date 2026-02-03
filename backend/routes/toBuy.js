const express = require("express");
const router = express.Router();
const ToBuy = require("../models/toBuy");

/**
 * GET /api/tobuy
 * Fetch all items to buy
 */
router.get("/", async (req, res) => {
  try {
    const items = await ToBuy.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/tobuy/:id
 * Fetch a single item by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const item = await ToBuy.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/tobuy
 * Create a new item to buy
 * Required: name, price
 */
router.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validation
    if (!name || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        error: "name, price, and category are required",
      });
    }

    const item = new ToBuy({ name, price, category });
    await item.save();

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/tobuy/:id
 * Update an item
 */
router.put("/:id", async (req, res) => {
  try {
    const item = await ToBuy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/tobuy/:id
 * Delete an item
 */
router.delete("/:id", async (req, res) => {
  try {
    const item = await ToBuy.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
