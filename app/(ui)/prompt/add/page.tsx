"use client";
import { useState } from 'react'
import TitleInput from '@components/PromptForm/TitleInput';
import PromptInput from '@components/PromptForm/PromptInput';
import Tags from '@components/PromptForm/Tags';
import SubmitButton from '@components/PromptForm/SubmitButton';
import { toast } from 'react-toastify';
import { useFormValidate } from '@hooks/useFormValidate';

// PromptForm component - renders the form for adding a new prompt
const PromptForm = () => {
  // State variables for the form
  const [title, setTitle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [promptError, setPromptError] = useState<string | null>(null);
  const [tagsError, setTagsError] = useState<string | null>(null);

  const { validateForm } = useFormValidate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/new`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: prompt,
          tags: tags,
        })
      });

      const data = await response.json();
  
      if (!response.ok) {
        const errors = validateForm({ title, prompt, tags });
        setTitleError(errors.title);
        setPromptError(errors.prompt);
        setTagsError(errors.tags);
        throw new Error(errors.title || errors.prompt || errors.tags || data);
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
      <div className='px-4 py-4 mx-3 bg-white dark:bg-zinc-800 rounded-md lg:px-6 lg:py-6 drop-shadow'>
        <div className='flex flex-col space-y-3'>
          <h1 className="text-3xl font-gilroyBold text-center mb-4 dark:text-white">Add new prompt</h1>
          <TitleInput title={title} setTitle={setTitle} titleError={titleError} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} promptError={promptError} />
          <Tags tags={tags} setTags={setTags} tagsError={tagsError} />
        </div>
        <SubmitButton handleSubmit={handleSubmit} >
          Add prompt
        </SubmitButton>
      </div>
    </form>
  )
}

export default PromptForm;