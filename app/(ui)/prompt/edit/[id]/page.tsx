"use client";
import { useEffect, useState } from 'react'
import TitleInput from '@components/PromptForm/TitleInput';
import PromptInput from '@components/PromptForm/PromptInput';
import Tags from '@components/PromptForm/Tags';
import SubmitButton from '@components/PromptForm/SubmitButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '@components/Loader';
import { useSession } from 'next-auth/react';
import { useFormValidate } from '@hooks/useFormValidate';

// PromptForm component - renders the form for adding a new prompt
const PromptEditForm = ({ params }: { params: {id : string}}) => {
  // State variables for the form
  const [title, setTitle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [promptError, setPromptError] = useState<string | null>(null);
  const [tagsError, setTagsError] = useState<string | null>(null);

  const router = useRouter();

  const { validateForm } = useFormValidate();

  const session = useSession();

  const getPrompt = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${params.id}`, {
        cache: "no-store"
      })

      if(!response.ok){      
        router.push('/user/prompts')
        return;
      }

      const prompt = await response.json();
      
      if(prompt.creatorId !== session.data?.user?.id) {
        toast.error(`You don't have permission to edit this prompt!`);
        router.push('/user/prompts')
        return;
      }

      setTitle(prompt.title);
      setPrompt(prompt.content);
      setTags(prompt.tags);
      setLoading(false);
    } catch (error) {
      console.log(error); 
    } 
  }

  useEffect(() => {
    getPrompt();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${params.id}`, {
        method: "PATCH",
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

      router.replace(`/prompt/${params.id}?refresh=${Date.now()}`) // Refresh the page to show the updated prompt. We need to add refresh param to refresh server component

      toast.success(`Prompt edited successfully!`); // Show a success message 

    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  }

  return (
    <>
      {
        loading ?
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
        :
        <form className="max-w-4xl mx-auto mt-8 mb-8">
          <div className='px-4 py-4 mx-3 bg-white rounded-md lg:px-6 lg:py-6 drop-shadow dark:bg-zinc-800'>
            <div className='flex flex-col space-y-3'>
              <h1 className="text-3xl font-gilroyBold text-center mb-4">Edit prompt</h1>
              <TitleInput title={title} setTitle={setTitle} titleError={titleError}/>
              <PromptInput prompt={prompt} setPrompt={setPrompt} promptError={promptError} />
              <Tags tags={tags} setTags={setTags} tagsError={tagsError}/>
            </div>
            <SubmitButton handleSubmit={handleSubmit}>
              Edit prompt
            </SubmitButton>
          </div>
        </form>
      }
    </>
  )
}

export default PromptEditForm;