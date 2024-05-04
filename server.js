const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { query, validationResult } = require('express-validator');
require('dotenv').config();
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/recipes', recipeRoutes);
// Apply rate limiting to the searchRecipes route
const searchRecipeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.get('/searchRecipes', [
    searchRecipeLimiter,
    query('search').optional().isString().notEmpty(),
    query('diet').optional().isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const options = {
        method: 'GET',
        url: `https://api.edamam.com/search`,
        params: {
            q: req.query.search, // 'q' is used instead of 'query'
            diet: req.query.diet, // Check if 'diet' parameter is supported as is
            app_id: process.env.EDAMAM_APP_ID,
            app_key: process.env.EDAMAM_APP_KEY,
            to: '10' // Assuming 'to' parameter is used to limit results
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

mongoose.connect('mongodb://localhost:27017/myRecipeApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected successfully to MongoDB');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
