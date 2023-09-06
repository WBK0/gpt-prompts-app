import Searchbar from '../../../components/Searchbar'
import PromptsList from '@components/PromptsList'
import { SearchParams } from '@interfaces/SearchParams.interface';

// Search component - displays the search page
const Search = async ({ params }: {params: SearchParams}) => {
  return(
    <div>
      <Searchbar baseUrl='/search'/> 
      <PromptsList 
        url={`/api/prompt/search?search=${params.search || ''}`}
      />
    </div>
  )
}

export default Search;