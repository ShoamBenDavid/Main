const express = require("express");
const router = express.Router();
const Family = require("../models/family"); // Assuming FamilyModel is the filename where you export your Mongoose model

// Create a new family
router.post("/families", async (req, res) => {
  try {
    const family = await Family.create(req.body);
    res.status(201).json(family);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all families
router.get("/families", async (req, res) => {
  try {
    const families = await Family.find();
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single family by ID
router.get("/families/:id", async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }
    res.status(200).json(family);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a family by ID
router.patch("/families/:id", async (req, res) => {
  try {
    const family = await Family.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }
    res.status(200).json(family);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a family by ID
router.delete("/families/:id", async (req, res) => {
  try {
    const family = await Family.findByIdAndDelete(req.params.id);
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }
    res.status(200).json({ message: "Family deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
