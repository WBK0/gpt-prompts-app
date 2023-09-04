import Searchbar from '@components/Searchbar';
import PromptsList from './components/PromptsList';
import { SearchParams } from '@interfaces/SearchParams.interface';

const FavoritesPrompts = ({ params } : {params: SearchParams}) => {
  return (
    <div>
      <h1 className='text-4xl font-gilroyBold text-center mt-5 mb-4'>
        Favorites Prompts
      </h1>
      <Searchbar baseUrl='/user/saved'/>
      <PromptsList params={params} />
    </div>
  )
}

export default FavoritesPrompts;