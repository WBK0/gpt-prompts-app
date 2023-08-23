import PromptCard from '@components/PromptCard';
import React from 'react'

const prompts = [
  {
    id: 1,
    title: 'How to create a successful social media marketing campaign',
    content: 'Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.',
    tags: ['socialmedia', 'marketing', 'campaign']
  },
  {
    id: 2,
    title: 'How to create a successful social media marketing campaign',
    content: 'Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.',
    tags: ['socialmedia', 'marketing', 'campaign']
  },
  {
    id: 3,
    title: 'How to create a successful social media marketing campaign',
    content: 'Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.',
    tags: ['socialmedia', 'marketing', 'campaign']
  },
]

const Prompts = () => {
  return (
    <div className='flex flex-col items-center mb-12'>
      <h2 className='text-5xl font-gilroyHeavy text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 drop-shadow p-4 text-center'>MOST POPULAR</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt}/>
        ))}
      </div>
    </div>
  )
}

export default Prompts;