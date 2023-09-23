import Searchbar from '../../../../components/Searchbar'
import PromptsList from './PromptsSearchList'
import { SearchParams } from '@interfaces/SearchParams.interface';

// Search component - displays the search page
const Search = async ({ params }: {params: SearchParams}) => {
  return(
    <div>
      <Searchbar baseUrl='/search'/> 
      <PromptsList 
        url={`${process.env.NEXT_PUBLIC_API}/prompt/search`}
        params={params}
      />
    </div>
  )
}

export default Search;