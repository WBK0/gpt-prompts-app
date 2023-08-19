import React from 'react'

interface PromtCardProps {
  prompt: {
    title: string,
    content: string,
    tags: string[]
  }
}

const PromptCard = ({ prompt }: PromtCardProps) => {
  console.log(prompt)
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden w-full flex flex-col'>
      <div className='p-4 flex-1 flex flex-wrap flex-col'>
        <h2 className='text-xl font-gilroyBold mb-2 w-full'>{prompt.title}</h2>
        <p className='text-gray-700 font-gilroyLight mb-4 w-full'>{prompt.content}</p>
        <div className='flex flex-wrap grow items-end h-100'>
          {prompt.tags && prompt.tags.map(tag => (
            <span key={tag} className='bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-gilroyMedium mr-2 mb-2 '>{tag}</span>
          ))}
        </div>
      </div>
      <div className='bg-gray-100 px-4 py-3'>
        <button className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl'>
          View Prompt
        </button>
      </div>
    </div>
  )
}

export default PromptCard