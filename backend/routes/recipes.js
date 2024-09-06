const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Assuming you have a Recipe model defined

// POST endpoint for creating a new recipe
router.post('/', async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
