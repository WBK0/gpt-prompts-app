import Searchbar from "@components/Searchbar";
import PromptsList from "../../../../components/PromptsList";
import { SearchParams } from "@interfaces/SearchParams.interface";

const UserPrompts = ({ params } : {params: SearchParams}) => {
  return(
    <div>
      <h1 className='text-4xl font-gilroyBold text-center mt-5 mb-4'>
        User prompts
      </h1>
      <Searchbar baseUrl='/user/prompts'/>
      <PromptsList 
        url={`/api/prompt/user?search=${params.search || ''}`} 
      />
    </div>
  )
}

export default UserPrompts;