"use client";
import { useState } from 'react'
import Header from './components/Header';
import TitleInput from './components/TitleInput';
import PromptInput from './components/PromptInput';
import Tags from './components/Tags';
import SubmitButton from './components/SubmitButton';
import axios from 'axios';

// PromptForm component - renders the form for adding a new prompt
const PromptForm = () => {
  // State variables for the form
  const [title, setTitle] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post('/api/prompt/new', {
      title: title,
      content: prompt,
      tags: tags,
    })
    console.log(response.data)
  }

  return (
    <form className="max-w-4xl mx-auto mt-8 mb-8">
      <div className='px-4 py-4 mx-3 bg-white rounded-md lg:px-6 lg:py-6 drop-shadow'>
        <div className='flex flex-col space-y-3'>
          <Header />
          <TitleInput title={title} setTitle={setTitle} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <Tags tags={tags} setTags={setTags} />
        </div>
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </form>
  )
}

export default PromptForm;