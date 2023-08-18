"use client";
import React, { useState } from 'react';
import Buttons from './Buttons';

// Searchbar component - displays the searchbar for searching prompts
const Searchbar = () => {
  // Search state
  const [search, setSearch] = useState<string>('')

  return (
    <div className='w-full p-4 mt-5 mx-auto max-w-xl'>
      <input 
        type='text' 
        placeholder='Search by tag or prompt'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full px-4 py-2 text-lg font-gilroyBold text-gray-800 drop-shadow bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent z-0'
      />
      {/* Buttons component */}
      <Buttons />
    </div>
  )
}

export default Searchbar;