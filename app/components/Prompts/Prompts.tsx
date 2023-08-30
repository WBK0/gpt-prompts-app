import PromptCard from "@components/PromptCard";
import Prompt from "@interfaces/prompt.interface";

const Prompts = async () => {
  const response = await fetch('http://localhost:3000/api/prompt', {
    cache: "no-store"
  });
  const prompts : Prompt[] = await response.json()

  return (
    <div className='flex flex-col items-center mb-12'>
      <h2 className='text-5xl font-gilroyHeavy text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 drop-shadow p-4 text-center'>MOST POPULAR</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 mt-10">
        {prompts.map((prompt) => (
          <PromptCard key={prompt._id} prompt={prompt}/>
        ))}
      </div>
    </div>
  )
}

export default Prompts;