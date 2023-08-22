import React from 'react'

interface TitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleInput = ({title, setTitle} : TitleInputProps) => {
  // Handle title change event
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <>
      <label htmlFor="title" className="text-lg text-gray-700 font-gilroyBold">Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange} className="px-3 py-2 border border-gray-400 rounded-md font-gilroyMedium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </>
  )
}

export default TitleInput;