"use client"
import Loader from '@components/Loader';
import PromptCard from '@components/PromptCard'
import { SearchParams } from '@interfaces/SearchParams.interface';
import Prompt from '@interfaces/prompt.interface';
import { useEffect, useState } from 'react';

const PromptsList = ({ params, url } : { params : SearchParams, url: String}) => {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMorePrompts, setNoMorePrompts] = useState<boolean>(false);

  // Fetch more prompts on scrolling to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (Math.round(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight - 84) return;
      setLoading(true);
  
      // Debounce the scroll event listener
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        getPrompts(prompts?.length);
      }, 500);
    };
  
    // Define the debounce timeout
    let debounceTimeout: NodeJS.Timeout;

    // Add the event listener
    window.addEventListener('scroll', handleScroll);
  
    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimeout);
    };
  }, [prompts]);

  const getPrompts = async (skip ?: number) => {
    const response = await fetch(`${url}?search=${params.search || ''}&skip=${skip || 0}&max=${prompts?.length}`, {
      cache: "no-store"
    });
    const newPrompts : Prompt[] = await response.json();

    if(skip){
      setPrompts((prevPrompts) => {
        if (prevPrompts === null) {
          return newPrompts;
        } else {
          return [...prevPrompts, ...newPrompts];
        }
      });  
  
      if(newPrompts.length < 12) {
        setNoMorePrompts(true);
      }
      setLoading(false);
    }else{
      setPrompts(newPrompts);
    }
  }
  
  useEffect(() => {
    getPrompts();
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
            <h1 className='text-2xl font-gilroyBold dark:text-zinc-300'>No prompts found</h1>  
        }
      <div className="flex items-center justify-center h-[60px] mt-6">
        {
          prompts && prompts.length > 0 && loading && !noMorePrompts 
          ?
            <Loader />
          : 
            prompts 
              && 
                prompts.length > 0 
              ? 
                <h1 className='text-2xl font-gilroyBold dark:text-zinc-300'>No more prompts found</h1> : null
        } 
      </div>   
    </div>
  )
}

export default PromptsList