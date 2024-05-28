import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for user icon
import AuthDropdown from './components/AuthDropdown'; // Ensure the path is correct

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    const handleClick = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className="header">
            <h1>Recipe Finder</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/submit-recipe">Submit Recipe</a></li>
                </ul>
                <div
                    className="user-icon-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}
                >
                    <FaUserCircle size={24} />
                    {showDropdown && <AuthDropdown />}
                </div>
            </nav>
        </div>
    );
}

export default Header;
