import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text" 
      placeholder="Buscar cómics..." 
      value={searchTerm} 
      // Estado de seachTerm
      onChange={(e) => setSearchTerm(e.target.value)} 
      className="search-bar" 
    />
  );
}

export default SearchBar;
