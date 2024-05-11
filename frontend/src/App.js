import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import RecipeList from './RecipeList';
import SubmitRecipe from './SubmitRecipe';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/searchRecipes?search=${query}`);
      const recipes = response.data.hits.map(hit => hit.recipe);
      setRecipes(recipes);
      setError(''); // Clear any existing errors on successful fetch
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes'); // Set error message on failure
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch
    }
  };

  // Render method starts here
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Search onSearch={handleSearch} />
              <RecipeList recipes={recipes} />
            </>
          } exact />
          <Route path="/submit-recipe" element={<SubmitRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
