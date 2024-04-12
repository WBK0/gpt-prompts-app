import React from 'react'

interface TitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  titleError: string | null;
}

const TitleInput = ({ title, setTitle, titleError } : TitleInputProps) => {
  // Handle title change event
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <>
      <label htmlFor="title" className="text-lg text-gray-700 dark:text-zinc-200 font-gilroyBold">Title:</label>
      <input 
        type="text" 
        id="title" 
        value={title} 
        onChange={handleTitleChange} 
        className={`px-3 py-2 dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border rounded-md font-gilroyMedium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${titleError ? 'border-red-500 border-2' : 'border-gray-400'}`}
      />
    </>
  )
}

export default TitleInput;