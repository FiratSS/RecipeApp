import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Header from './Header';
import Search from './Search';
import RecipeList from './RecipeList';
import SubmitRecipe from './SubmitRecipe';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // If you need to handle the authenticated user in the future, you can uncomment and use this
      // setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/searchRecipes?search=${query}`);
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