import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure the CSS file is properly linked

function Header() {
    return (
        <header className="header">
            <h1><Link to="/" className="header-title">Recipe Finder</Link></h1> {/* Title of the app */}
            <nav>
                <ul>
                    <li><Link to="/">Get Recipes</Link> {/* Link to the home page */}</li>
                    <li><Link to="/submit-recipe">Submit Your Recipe</Link> {/* Link to the recipe submission page */}</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
