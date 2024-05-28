import React from 'react';
import './RecipeList.css';

function RecipeList({ recipes }) {
    if (recipes.length === 0) {
        return <div className="recipe-list-empty">You deserve a delicious meal...</div>;
    }

    return (
        <div>
            {recipes.map((recipe, index) => (
                <div key={index} className="recipe-item">
                    <h2>{recipe.label}</h2>
                    <img src={recipe.image} alt={recipe.label} />
                    <p>{recipe.summary}</p> {/* Summary or description of the recipe */}
                    {recipe.ingredients && (
                        <div>
                            <h3>Ingredients:</h3>
                            <ul>
                                {recipe.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient.text}</li> // Assuming each ingredient has a 'text' property
                                ))}
                            </ul>
                        </div>
                    )}
                    {recipe.cookingTime && <p>Cooking Time: {recipe.cookingTime} minutes</p>} {/* Cooking time if available */}
                    {recipe.servings && <p>Servings: {recipe.servings}</p>} {/* Number of servings if available */}
                    {recipe.dietLabels && recipe.dietLabels.length > 0 && (
                        <p className="diet-labels">Diet: {recipe.dietLabels.join(', ')}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RecipeList;
