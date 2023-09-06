import React from 'react'
import PromptCard from '@components/PromptCard'
import Prompt from '@interfaces/prompt.interface';
import { SearchParams } from '@interfaces/SearchParams.interface';
import { headers } from 'next/headers';

const PromptsList = async ({ params }: {params: SearchParams}) => {
  const response = await fetch(`http://localhost:3000/api/prompt/search?search=${params.search || ''}`, {
    cache: "no-store",
    headers: headers()
  });
  const prompts : Prompt[] = await response.json()
  
  return (
    <div className='flex flex-col items-center px-3 py-12'>
      {
        prompts.length > 0 
        ?
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {prompts.map(prompt => (
              <PromptCard key={prompt._id} prompt={prompt} />
            ))
            }
          </div>
        : 
          <h1 className='text-2xl font-gilroyBold'>No prompts found</h1>  
        }
      
    </div>
  )
}

export default PromptsList;