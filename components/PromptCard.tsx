"use client"
import React, { useEffect, useState } from 'react'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tags from './Tags';
import Prompt from '@interfaces/prompt.interface';
import Link from 'next/link';
import { toast } from 'react-toastify';

const PromptCard = ({ prompt, refreshPrompts }: {prompt: Prompt, refreshPrompts?: () => void}) => {
  const [isLiked, setIsLiked] = useState(prompt.isLiked)

  useEffect(() => {
    setIsLiked(prompt.isLiked)
  }, [prompt])

  const handleClick = async () => {
    console.log(prompt._id, isLiked)
    try {
      const response = await fetch(`http://localhost:3000/api/prompt/${prompt._id}/${isLiked ? 'dislike' : 'like'}`, {
      method: 'PATCH'
    })

    const data = await response.json();

    if(!response.ok){
      if(response.status === 400){
        setIsLiked(!isLiked);
      }
      throw new Error(data);
    }

    console.log(data);
    
    if(refreshPrompts){
      console.log(refreshPrompts)
      refreshPrompts();
    }else{
      setIsLiked(data.isLiked);
    }
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden w-full flex flex-col'>
      <div className='px-4 py-3 flex justify-between items-center'>
        <h2 className='text-xl font-gilroyBold w-full'>{prompt.title}</h2>
        <div className='flex items-center'>
          <button 
            className={`${isLiked ? 'text-red-500 ': 'text-gray-200 '} font-bold py-1 px-1 text-3xl rounded-xl`} 
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faHeart} width={32} height={32}/>
          </button>
        </div>
      </div>
      <div className='p-4 flex-1 flex flex-wrap flex-col'>
        <p className='text-gray-700 font-gilroyLight mb-4 w-full'>{prompt.content}</p>
        <Tags tags={prompt.tags} />
      </div>
      <div className='bg-gray-100 px-4 py-3 flex justify-end'>
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