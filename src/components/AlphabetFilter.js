import React from 'react';
import { useEffect, useState } from "react";

const AlphabetFilter = ({ onLetterClick, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      onSearch(event.target.value);
    };

    const handleLetterChange = (letter) => {
        onSearch('');
        onLetterClick(letter)
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => handleLetterChange(null)}
            style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}
          >
            All
          </button>
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterChange(letter)}
              style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default AlphabetFilter;