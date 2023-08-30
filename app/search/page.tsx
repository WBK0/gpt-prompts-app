import Searchbar from './components/Searchbar'
import PromptsList from './components/PromptsList'

// Search component - displays the search page
const Search = async () => {

  return(
    <div>
      <Searchbar /> 
      <PromptsList />
    </div>
  )
}

export default Search;