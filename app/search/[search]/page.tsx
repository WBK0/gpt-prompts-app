import Searchbar from './components/Searchbar'
import PromptsList from './components/PromptsList'

export type SearchParams = {
  search: string
}

// Search component - displays the search page
const Search = async ({ params }: {params: SearchParams}) => {

  console.log(params)

  return(
    <div>
      <Searchbar /> 
      <PromptsList params={params}/>
    </div>
  )
}

export default Search;