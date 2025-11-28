const express = require("express");
const router = express.Router();
const Bought = require("../models/bought");

/**
 * GET /api/bought
 * Fetch all bought items (with optional filters)
 */
router.get("/", async (req, res) => {
  try {
    const { boughtBy } = req.query;

    // Build filter if boughtBy is specified
    const filter = boughtBy ? { boughtBy } : {};

    const items = await Bought.find(filter).sort({ createdAt: -1 });

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
 * GET /api/bought/by/:person
 * Fetch items bought by a specific person
 */
router.get("/by/:person", async (req, res) => {
  try {
    const validPeople = ["alaa", "mohamed"];
    const person = req.params.person.toLowerCase();

    if (!validPeople.includes(person)) {
      return res.status(400).json({
        success: false,
        error: `boughtBy must be one of: ${validPeople.join(", ")}`,
      });
    }

    const items = await Bought.find({ boughtBy: person }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: items.length,
      person,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/bought/:id
 * Fetch a single bought item by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const item = await Bought.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/bought
 * Create a new bought item
 * Required: name, price, boughtBy
 */
router.post("/", async (req, res) => {
  try {
    const { name, price, boughtBy } = req.body;

    // Validation
    if (!name || price === undefined || !boughtBy) {
      return res.status(400).json({
        success: false,
        error: "name, price, and boughtBy are required",
      });
    }

    const validPeople = ["alaa", "mohamed"];
    if (!validPeople.includes(boughtBy.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `boughtBy must be one of: ${validPeople.join(", ")}`,
      });
    }

    const item = new Bought({
      name,
      price,
      boughtBy: boughtBy.toLowerCase(),
    });
    await item.save();

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/bought/:id
 * Update a bought item
 */
router.put("/:id", async (req, res) => {
  try {
    const item = await Bought.findByIdAndUpdate(req.params.id, req.body, {
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
 * DELETE /api/bought/:id
 * Delete a bought item
 */
router.delete("/:id", async (req, res) => {
  try {
    const item = await Bought.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
