"use client";
import { useState } from 'react'
import TitleInput from '@components/PromptForm/TitleInput';
import PromptInput from '@components/PromptForm/PromptInput';
import Tags from '@components/PromptForm/Tags';
import SubmitButton from '@components/PromptForm/SubmitButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// PromptForm component - renders the form for adding a new prompt
const PromptEditForm = ({ params }: { params: {id : string}}) => {
  // State variables for the form
  const [title, setTitle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();

  const getPromptById = async () => {
    const response = await fetch(`http://localhost:3000/api/prompt/edit/${params.id}`, {
      cache: "no-store"
    })

    if(!response.ok){      
      router.back();
    }

    const prompt = await response.json();
    
    setTitle(prompt.title);
    setPrompt(prompt.content);
    setTags(prompt.tags);
  }

  getPromptById()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/prompt/edit', {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: prompt,
          tags: tags,
        })
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data);
      }

      toast.success(`Prompt added successfully!`);

      setTitle('');
      setPrompt('');
      setTags([]);

    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  }

  return (
    <form className="max-w-4xl mx-auto mt-8 mb-8">
      <div className='px-4 py-4 mx-3 bg-white rounded-md lg:px-6 lg:py-6 drop-shadow'>
        <div className='flex flex-col space-y-3'>
          <h1 className="text-3xl font-gilroyBold text-center mb-4">Edit prompt</h1>
          <TitleInput title={title} setTitle={setTitle} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <Tags tags={tags} setTags={setTags} />
        </div>
        <SubmitButton handleSubmit={handleSubmit}>
          Edit prompt
        </SubmitButton>
      </div>
    </form>
  )
}

export default PromptEditForm;