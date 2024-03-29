const { v4: uuidv4 } = require('uuid');
const Family = require("../models/familyModel");

// Create a new family
exports.createFamily = async (req, res) => {
    try {
        const name="cohen";
        // Generate a UUID for the familyId
        const familyId = uuidv4();
        if (!req.body.name) {
            
            return res.status(400).json({ error: "Family name is required" });
        }
        // Create the new family document with the generated UUID
        // Ensure that other required fields are included in req.body
        const familyData = { ...req.body, familyId,name};

        const family = await Family.create(familyData);
        res.status(201).json(family);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Get all families
exports.getAllFamilies = async (req, res) => {
    try {
        const families = await Family.find();
        res.status(200).json(families);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single family by ID
exports.getFamilyById = async (req, res) => {
    try {
        const family = await Family.findOne({ familyId: req.params.id });
        if (!family) {
            return res.status(404).json({ message: "Family not found" });
        }
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a family by ID
exports.updateFamilyById = async (req, res) => {
    try {
        const family = await Family.findOneAndUpdate({ familyId: req.params.id }, req.body, {
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
};

// Delete a family by ID
exports.deleteFamilyById = async (req, res) => {
    try {
        const family = await Family.findOneAndDelete({ familyId: req.params.id });
        if (!family) {
            return res.status(404).json({ message: "Family not found" });
        }
        res.status(200).json({ message: "Family deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { createFamily, getAllFamilies, getFamilyById, deleteFamilyById };
