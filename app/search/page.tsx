'use client'
import { useSearchParams } from 'next/navigation'
import Searchbar from './components/Searchbar'
import PromptsList from './components/PromptsList'

// Search component - displays the search page
const Search = () => {
  // Get search params from url
  const searchParams = useSearchParams()

  console.log(searchParams.get('search'))

  return(
    <div>
      <Searchbar
        param={searchParams.get('search') || ''}
      /> 
      <PromptsList />
    </div>
  )
}

export default Search;