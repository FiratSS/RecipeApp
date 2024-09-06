import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import AuthDropdown from './components/AuthDropdown';
import { AuthContext } from './context/AuthContext';
import './Header.css';

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const headerRef = useRef(null);
    const dropdownRef = useRef(null);
    const { currentUser } = useContext(AuthContext);

    const handleIconClick = (event) => {
        event.stopPropagation();
        setShowDropdown(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            !headerRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <h1 className="header-title"><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Recipe Finder</a></h1>
            <nav className="header-nav">
                <ul className="header-nav-list">
                    <li><a href="/" className="nav-link">Home</a></li>
                    <li><a href="/submit-recipe" className="nav-link">Submit Recipe</a></li>
                    <li onClick={handleIconClick} className="nav-link user-icon-container">
                        <FaUserCircle size={24} />
                        {showDropdown && (
                            <div
                                ref={dropdownRef}
                                onClick={(e) => e.stopPropagation()} // Stop event propagation for clicks within the dropdown
                                className="auth-dropdown"
                            >
                                <AuthDropdown />
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            {currentUser && <p className="welcome-message">Welcome, {currentUser.email}</p>}
        </div>
    );
}

export default Header;
