import React, { useState } from 'react';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex flex-1 justify-end">
      <input
        type="search"
        value={query}
        onChange={handleSearchChange}
        className="w-1/5 h-10 px-4 py-1 bg-white border border-cyan-950 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-950 hover:border-cyan-800 focus:border-transparent"
        placeholder="Buscar"
      />
    </form>
  );
};

export default Search;
