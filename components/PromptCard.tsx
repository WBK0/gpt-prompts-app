import React from 'react'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tags from './Tags';

interface PromtCardProps {
  prompt: {
    id: number,
    title: string,
    content: string,
    tags: string[],
  }
}

const PromptCard = ({ prompt }: PromtCardProps) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden w-full flex flex-col'>
      <div className='px-4 py-3 flex justify-between items-center'>
        <h2 className='text-xl font-gilroyBold w-full'>{prompt.title}</h2>
        <div className='flex items-center'>
          <button className='text-gray-200 font-bold py-1 px-1 text-3xl rounded-xl' >
            <FontAwesomeIcon icon={faHeart} width={32} height={32}/>
          </button>
      </div>
      </div>
      <div className='p-4 flex-1 flex flex-wrap flex-col'>
        <p className='text-gray-700 font-gilroyLight mb-4 w-full'>{prompt.content}</p>
        <Tags tags={prompt.tags} />
      </div>
      <div className='bg-gray-100 px-4 py-3 flex justify-end'>
        <button className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl'>
          View prompt
        </button>
      </div>
    </div>
  )
}

export default PromptCard;