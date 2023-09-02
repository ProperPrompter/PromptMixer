import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({ type, text, updateSearchBar, options, locked, toggleLock, handleSync }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions([]);
  }, [type]);

  useEffect(() => {
    if (text && options) {
      const newSuggestions = options.filter((item) =>
        item.text.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [text, options]);

  const handleSyncClick = () => {
    if (!locked) {
      handleSync();
    }
  };

  const handleChange = (e) => {
    updateSearchBar(e.target.value);
  };

  return (
    <div className="search-bar">
      <FontAwesomeIcon
        disabled={locked}
        onClick={handleSyncClick}
        className="icon"
        icon="sync"
      />
      <input
        type="text"
        value={text}
        onChange={handleChange}
        disabled={locked}
        onFocus={handleChange}
        placeholder={type}
      />
      <FontAwesomeIcon
        className="icon"
        icon={locked ? 'lock' : 'unlock-alt'}
        onClick={toggleLock}
      />
    </div>
  );
};

export default SearchBar;
