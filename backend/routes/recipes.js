const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// POST route to create a new recipe
router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).send(savedRecipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
