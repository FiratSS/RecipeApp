import React, { useState } from 'react';
import './Search.css'; // Import the CSS file for styles

function Search({ onSearch }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for recipes..."
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
}

export default Search;
