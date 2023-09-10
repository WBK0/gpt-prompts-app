import PromptCard from '@components/PromptCard';
import Prompt from '@interfaces/prompt.interface';
import { headers } from 'next/headers';

const OtherPrompts = async () => {
  const response = await fetch('http://localhost:3000/api/prompt?max=3', {
    cache: "no-store",
    headers: headers()
  });

  // console.log(response)

  const prompts : Prompt[] = await response.json()

  return (
    <div className="mt-12 mb-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-gilroyBold text-gray-900 mb-4 px-4">Another prompts:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map(prompt => (
          <PromptCard key={prompt._id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

export default OtherPrompts;