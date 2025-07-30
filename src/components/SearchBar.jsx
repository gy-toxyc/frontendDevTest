import React, { useState, useEffect } from 'react';

import searchIcon from '../assets/search.svg';

import '../styles/SearchBar.scss';

function SearchBar({ onSearch, placeholder = "Search products...", initialValue = "" }) {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (onSearch) {
                onSearch(searchTerm);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setSearchTerm('');
        }
    };

    return (
        <div className={`searchbar-container ${isFocused ? 'focused' : ''}`}>
            <img src={searchIcon} alt="Search" className="search-icon" />

            <input
                type="text"
                className="searchbar-input"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                aria-label="Search"
            />

            {searchTerm && (
                <button
                    type="button"
                    className="clear-button"
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default SearchBar;
