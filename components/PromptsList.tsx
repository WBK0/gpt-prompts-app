"use client"
import Loader from '@components/Loader';
import PromptCard from '@components/PromptCard'
import Prompt from '@interfaces/prompt.interface';
import { useEffect, useState } from 'react';

const PromptsList = ({ url }: {url: string}) => {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  const getPrompts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/${url}`, {
      cache: "no-store"
    });
    const prompts : Prompt[] = await response.json();
    setPrompts(prompts);
  }

  useEffect(() => {
    getPrompts()
  }, [])

  return (
    <div className='flex flex-col items-center px-3 py-12 max-w-6xl mx-auto'>
      {
        !prompts 
        ?
          <Loader />
        :
          prompts.length > 0 ?
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
            {prompts.map(prompt => (
              <PromptCard key={prompt._id} prompt={prompt} refreshPrompts={getPrompts} />
            ))
            }
          </div>
          : 
            <h1 className='text-2xl font-gilroyBold'>No prompts found</h1>  
        }
    </div>
  )
}

export default PromptsList