import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PromptDisplay from '../PromptDisplay/PromptDisplay';
import { data } from '../data'; // updated import statement
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Gallery = () => {
  const initialSearchBars = [
    { type: 'subject', text: '' },
    { type: 'setting', text: '' },
    { type: 'artStyle', text: '' },
    { type: 'mood', text: '', locked: false },
    { type: 'mood', text: '', locked: false },
  ];

  const [searchBars, setSearchBars] = useState(initialSearchBars);
  const [activeSearchIndex, setActiveSearchIndex] = useState(null);

  const handleToggleLock = (index) => {
    const newSearchBars = [...searchBars];
    newSearchBars[index].locked = !newSearchBars[index].locked;
    setSearchBars(newSearchBars);
  };

  const handleSync = (index) => {
    let options;
    const type = searchBars[index].type;
    if (type === 'wildcard') {
      options = Object.values(data).flat(); // flat all arrays into one for wildcard
    } else {
      options = data[type];
    }
    const randomOption = options[Math.floor(Math.random() * options.length)];
    const newSearchBars = [...searchBars];
    newSearchBars[index].text = randomOption.text;
    setSearchBars(newSearchBars);
  };

  const handleAllSync = () => {
    searchBars.forEach((searchBar, index) => {
      if (!searchBar.locked) {
        handleSync(index);
      }
    });
  };

  const handleAddSearch = () => {
    if (searchBars.length < 10) {
      setSearchBars([
        ...searchBars,
        { type: 'wildcard', text: '', locked: false },
      ]);
    }
  };

  const handleUpdateSearchBar = (index, text) => {
    setActiveSearchIndex(index);
    const newSearchBars = [...searchBars];
    newSearchBars[index].text = text;
    setSearchBars(newSearchBars);
  };

  const handleSelectOption = (text) => {
    // Check if the currently active search bar is locked
    if (!searchBars[activeSearchIndex].locked) {
      const newSearchBars = [...searchBars];
      newSearchBars[activeSearchIndex].text = text;
      setSearchBars(newSearchBars);
    }
  };

  return (
    <>
      <div className="title">
        <h1 className="title-prompt">Prompt</h1>
        <h1 className="title-mixer">Mixer</h1>
      </div>
      <div className="inputs">
        <div className="button-inputs-container">
          <button onClick={handleAllSync} className="button-inputs">
            <FontAwesomeIcon className="icon" icon="sync" />
          </button>
        </div>
        <div className="search-container">
          {searchBars.map((searchBar, index) => (
            <div key={index}>
              <SearchBar
                type={searchBar.type}
                text={searchBar.text}
                updateSearchBar={(text) => handleUpdateSearchBar(index, text)}
                options={data[searchBar.type]}
                locked={searchBar.locked}
                toggleLock={() => handleToggleLock(index)}
                handleSync={() => handleSync(index)} // pass handleSync to SearchBar
              />
            </div>
          ))}
        </div>
        <div className="button-inputs-container">
          <button className="button-inputs" onClick={handleAddSearch}>
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>
      </div>
      <div className="outputs">
        <PromptDisplay
          prompts={searchBars.map((searchBar) => searchBar.text)}
        />
      </div>
      <div className="button-container">
        {activeSearchIndex !== null &&
          (searchBars[activeSearchIndex].type === 'wildcard'
            ? [].concat(...Object.values(data).flat()).map((datum, index) => (
                <button
                  key={`${index}-${datum.id}`} // Use index here to make the key unique
                  onClick={() => handleSelectOption(datum.text)}
                >
                  {datum.text}
                </button>
              ))
            : data[searchBars[activeSearchIndex].type].map((datum, index) => (
                <button
                  key={`${index}-${datum.id}`} // Use index here to make the key unique
                  onClick={() => handleSelectOption(datum.text)}
                >
                  {datum.text}
                </button>
              )))}
      </div>
    </>
  );
};

export default Gallery;
