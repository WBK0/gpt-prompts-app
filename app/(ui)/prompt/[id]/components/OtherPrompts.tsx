import PromptCard from '@components/PromptCard';
import Prompt from '@interfaces/prompt.interface';
import { useEffect, useState } from 'react';

const OtherPrompts = () => {
  const [otherPrompts, setOtherPrompts] = useState<Prompt[] | null>(null);

  const getPrompts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt?max=3`, {
      cache: "no-store",
    });

    const prompts : Prompt[] = await response.json();
    setOtherPrompts(prompts);
  }

  useEffect(() => {
    getPrompts();
  }, [])

  return (
    <div className="mt-12 mb-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-gilroyBold text-gray-900 mb-4 px-4">Another prompts:</h2>
      {
        otherPrompts ?  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
          {otherPrompts.map(prompt => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
        : <div>
            Loading...
          </div>  
      }
    </div>
  )
}

export default OtherPrompts;