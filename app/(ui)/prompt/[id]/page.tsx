"use client";
import GptAnswer from './components/GptAnswer';
import Content from './components/Content';
import Title from './components/Title';
import Creator from './components/Creator';
import Tags from '@components/Tags';
import AddToFavorite from './components/AddToFavorite';
import OtherPrompts from './components/OtherPrompts';
import UserActions from './components/UserActions';
import { useEffect, useState } from 'react';
import Prompt from '@interfaces/prompt.interface';
import { useSession } from 'next-auth/react';

type PromptProps = {
  params: {
    id: string
  }
}

const PromptSite = ({ params } : PromptProps) => {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [error, setError] = useState<boolean>(false);

  const session = useSession();
  

  const getPrompt = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${params.id}`, {
      cache: "no-store",
    });

    if(!response.ok) {
      setError(true);
      return;
    }

    const prompt : Prompt = await response.json();
    setPrompt(prompt);
  }

  useEffect(() => {
    console.log(prompt)
    getPrompt();
  }, [])

  return (
    <div className="mt-6">{
      error ? 
        <div className='text-white text-3xl font-black text-center pt-12'>
          <h1 className='text-6xl'>404</h1>
          <p className='mt-4'>Prompt not found</p>
        </div>
      :
      prompt ?
      <>
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 lg:px-6 lg:py-6 py-4">
            <Title title={prompt.title} />
            <Creator createdAt={prompt.createdAt} creatorName={prompt.creatorName} />
            <Content content={prompt.content} />
            <GptAnswer answer={prompt.response} />
            <Tags tags={prompt.tags} />
          </div>
          <div className="px-6 py-4 bg-gray-100 dark:bg-zinc-900 flex items-center justify-between">
            <AddToFavorite favorites={prompt.favorites} id={prompt._id} isFavorite={prompt?.isLiked || false}/>
            {
              session?.data?.user?.id === prompt?.creatorId
              ?
                <UserActions params={params} />
              : 
                null
            }
          </div>
        </div>
        <OtherPrompts />
      </>
      : null
    }
      
    </div>
  )
}

export default PromptSite;