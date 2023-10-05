interface PromptInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  promptError: string | null;
}

const PromptInput = ({ prompt, setPrompt, promptError } : PromptInputProps) => {

  // Handle prompt change event 
  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }

  return (
    <>          
      <label htmlFor="prompt" className="text-lg text-gray-700 dark:text-zinc-200 font-gilroyBold">Prompt:</label>
      <textarea 
        rows={8} 
        id="prompt" 
        value={prompt} 
        onChange={handlePromptChange} 
        className={`px-3 py-2 dark:bg-zinc-700 dark:border-zinc-700 dark:text-zinc-200 border border-gray-400 rounded-md font-gilroyMedium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${promptError ? 'border-red-500 border-2' : 'border-gray-400'}`} />
    </>
  )
}

export default PromptInput;