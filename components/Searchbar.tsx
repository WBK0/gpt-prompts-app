"use client"
import { useParams, useRouter } from "next/navigation";
import {  useState } from "react";

// Searchbar component - displays the searchbar for searching prompts
const Searchbar = ({ baseUrl } : {baseUrl : string}) => {
  // Search params
  const params = useParams();

  // router
  const router = useRouter();
  // Search state

  const [search, setSearch] = useState(decodeURIComponent(params.search ? params.search[0] : ''));

  // Function to submit form - update search param
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${baseUrl}/${encodeURIComponent(search)}`)
  }

  return (
    <div className='py-4'>
      <form className='flex w-full lg:w-1/2 mx-auto px-3' onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='Search by tag or prompt' 
          className='flex-1 drop-shadow px-4 py-2 text-lg font-gilroyBold text-gray-800 bg-slate-50 dark:bg-zinc-800 dark:ring-zinc-800 dark:text-zinc-200 ring-gray-100 ring-1 border-gray-100 rounded-l-md focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-transparent z-10' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          className='drop-shadow px-6 py-2 font-gilroyBold bg-blue-700 text-white border-2 ring-1 ring-blue-700 border-blue-700 rounded-r-md focus:outline-none z-0 outline-none transition-colors duration-300 hover:bg-blue-800'
          type="submit"
        >
          Search
        </button>
          
      </form>
    </div>
  )
}

export default Searchbar;
