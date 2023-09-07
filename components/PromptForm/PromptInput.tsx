interface PromptInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const PromptInput = ({ prompt, setPrompt } : PromptInputProps) => {
  
  // Handle prompt change event 
  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }

  return (
    <>          
      <label htmlFor="prompt" className="text-lg text-gray-700 font-gilroyBold">Prompt:</label>
      <textarea rows={8} id="prompt" value={prompt} onChange={handlePromptChange} className="px-3 py-2 border border-gray-400 rounded-md font-gilroyMedium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </>
  )
}

export default PromptInput;