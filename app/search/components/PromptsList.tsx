import React from 'react'
import PromptCard from './PromptCard'

const prompts = [
  {
    id: 1,
    title: 'How to create a successful social media marketing campaign',
    content: 'Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.',
    tags: ['#tag1', '#tag2', '#tag3']
  },
  {
    id: 2,
    title: 'How to create a successful social media marketing campaign',
    content: 'Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.',
    tags: ['#tag1', '#tag2', '#tag3']
  },
  {
    id: 3,
    title: 'Title',
    content: 'Content.',
    tags: ['#tag1', '#tag2', '#tag3']
  }
]

const PromptsList = () => {
  return (
    <div className='flex flex-col items-center px-3 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {prompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

export default PromptsList