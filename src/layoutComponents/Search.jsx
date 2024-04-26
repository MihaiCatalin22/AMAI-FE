import React from 'react';
import './style/Search.css';

function Search() {
    const handleSearch = () => {
        // Implement search functionality here
        console.log('Searching...');
      };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search by title or speaker" />
      <select>
        <option value="current">Current Semester</option>
        <option value="latest">Latest Semester</option>
      </select>
      <button onClick={handleSearch}>Search</button> {/* Moved the button after the select */}
    </div>
  );
}

export default Search;
