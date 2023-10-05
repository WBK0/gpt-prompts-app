"use client"
import React, { useEffect, useState } from 'react'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tags from './Tags';
import Prompt from '@interfaces/prompt.interface';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const PromptCard = ({ prompt, refreshPrompts }: {prompt: Prompt, refreshPrompts?: () => void}) => {
  const [isLiked, setIsLiked] = useState(prompt.isLiked)

  const session = useSession();

  useEffect(() => {
    setIsLiked(prompt.isLiked)
  }, [prompt])

  const handleClick = async () => {
    try {
      if(session.status === 'unauthenticated') {
        throw new Error('You must be logged in to like a prompt');
      }

      setIsLiked(!isLiked);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${prompt._id}/${isLiked ? 'dislike' : 'like'}`, {
        method: 'PATCH'
      })

      const data = await response.json();

      if(!response.ok){
        if(response.status === 400){
          setIsLiked(!isLiked);
        }
        throw new Error(data);
      }
    
      if(refreshPrompts){
        refreshPrompts();
      }else{
        setIsLiked(data.isLiked);
      }
    } catch (error : unknown) {
      if(error instanceof Error){
        toast.error(`${error.message}`);
      }
    }
  }

  return (
    <div className='bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden w-full flex flex-col'>
      <div className='px-4 py-3 flex justify-between items-center'>
        <h2 className='text-xl font-gilroyBold w-full text-black dark:text-white'>{prompt.title}</h2>
        <div className='flex items-center'>
          <button 
            className={`${isLiked ? 'text-red-500 ': 'text-gray-200 dark:text-zinc-600'} font-bold py-1 px-1 text-3xl rounded-xl`} 
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faHeart} width={32} height={32}/>
          </button>
        </div>
      </div>
      <div className='p-4 flex-1 flex flex-wrap flex-col'>
        <p className='text-gray-700 dark:text-zinc-200 font-gilroyLight mb-4 w-full'>{prompt.content}</p>
        <Tags tags={prompt.tags} />
      </div>
      <div className='bg-gray-100 dark:bg-zinc-900 px-4 py-3 flex justify-end'>
        <Link href={`/prompt/${prompt._id}`} className='font-gilroyBold text-sm hover:text-gray-300'>
          <button className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl'>
            View prompt
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PromptCard;