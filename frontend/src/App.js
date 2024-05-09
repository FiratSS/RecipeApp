import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import RecipeList from './RecipeList';
import SubmitRecipe from './SubmitRecipe';

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = (query) => {
    axios.get(`http://localhost:3000/searchRecipes?search=${query}`)
      .then(response => {
        const recipes = response.data.hits.map(hit => hit.recipe);
        setRecipes(recipes);  // Update recipes state with the fetched recipes
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

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
