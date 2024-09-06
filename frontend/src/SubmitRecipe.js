import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubmitRecipe.css'; // Import the CSS file for styles

const apiUrl = process.env.REACT_APP_API_URL;

function SubmitRecipe() {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Function to retrieve token
        const fetchToken = async () => {
            try {
                const response = await axios.post(`${apiUrl}/generateToken`);
                setToken(response.data.token);
            } catch (error) {
                console.error('Failed to fetch token:', error);
            }
        };

        fetchToken();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/recipes`, recipe, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                }
            });
            alert('Recipe submitted successfully!');
            setRecipe({ title: '', ingredients: '', instructions: '' }); // Reset form
            setError('');
        } catch (error) {
            console.error('Failed to submit recipe:', error);
            setError('Failed to submit recipe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-recipe">
            <h1>Submit a Recipe</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                />
                <textarea
                    name="ingredients"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    placeholder="Ingredients"
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                />
                <textarea
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                    placeholder="Instructions"
                    required
                    style={{ display: 'block', marginBottom: '10px' }}
                />
                <button type="submit" disabled={loading} style={{ display: 'block', marginBottom: '10px' }}>
                    {loading ? "Submitting..." : "Submit Recipe"}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default SubmitRecipe;
