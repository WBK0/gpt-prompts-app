import Searchbar from "@components/Searchbar";
import PromptsList from "../../../search/[[...search]]/PromptsSearchList";
import { SearchParams } from "@interfaces/SearchParams.interface";

const UserPrompts = ({ params } : {params: SearchParams}) => {
  return(
    <div>
      <h1 className='text-4xl font-gilroyBold text-center mt-5 mb-4 dark:text-white'>
        User prompts
      </h1>
      <Searchbar baseUrl='/user/prompts'/>
      <PromptsList 
        params={params}
        url={`${process.env.NEXT_PUBLIC_API}/prompt/user`} 
      />
    </div>
  )
}

export default UserPrompts;