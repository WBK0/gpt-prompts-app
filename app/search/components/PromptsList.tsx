import React from 'react'
import PromptCard from '@components/PromptCard'
import Prompt from '@interfaces/prompt.interface';

const PromptsList = async () => {
  const response = await fetch('http://localhost:3000/api/prompt', {
    cache: "no-store"
  });
  const prompts : Prompt[] = await response.json()

  return (
    <div className='flex flex-col items-center px-3 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {prompts.map(prompt => (
          <PromptCard key={prompt._id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

export default PromptsList