const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/authMiddleware');

// POST route to create a new recipe, requires authentication
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newRecipe = new Recipe({
            ...req.body,
            user: req.user.uid // Associate recipe with the user's UID
        });
        const savedRecipe = await newRecipe.save();
        res.status(201).send(savedRecipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
