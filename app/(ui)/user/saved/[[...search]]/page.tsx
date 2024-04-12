import Searchbar from '@components/Searchbar';
import PromptsList from '../../../search/[[...search]]/PromptsSearchList';
import { SearchParams } from '@interfaces/SearchParams.interface';

const FavoritesPrompts = ({ params } : {params: SearchParams}) => {
  return (
    <div>
      <h1 className='text-4xl font-gilroyBold text-center mt-5 mb-4 dark:text-white'>
        Favorites Prompts
      </h1>
      <Searchbar baseUrl='/user/saved'/>
      <PromptsList
        url={`${process.env.NEXT_PUBLIC_API}/prompt/user/favorites`}
        params={params}
      />
    </div>
  )
}

export default FavoritesPrompts;