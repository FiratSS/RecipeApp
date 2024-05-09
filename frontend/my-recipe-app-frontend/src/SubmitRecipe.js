import React, { useState } from 'react';
import axios from 'axios';

function SubmitRecipe() {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/recipes', recipe);
            alert('Recipe submitted successfully!');
            setRecipe({ title: '', ingredients: '', instructions: '' }); // Reset form
        } catch (error) {
            alert('Failed to submit recipe: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Submit a Recipe</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="ingredients"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    placeholder="Ingredients"
                    required
                />
                <textarea
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                    placeholder="Instructions"
                    required
                />
                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    );
}

export default SubmitRecipe;