const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { query, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Apply rate limiting to the searchRecipes route
const searchRecipeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.get('/searchRecipes', [
    searchRecipeLimiter,
    query('search').isString(),
    query('diet').optional().isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/complexSearch`,
        params: {
            query: req.query.search,
            number: '10',
            diet: req.query.diet,
            apiKey: process.env.SPOONACULAR_API_KEY
        }
    };

    try {
        const response = await axios.request(options);
        res.send(response.data);
    } catch (error) {
        console.error('Failed to fetch recipes', error);
        res.status(500).send('Failed to fetch recipes');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
