import React from 'react'

interface TagsInputProps {
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddTag: () => void;
}

const TagsInput = ({tagInput, setTagInput, handleAddTag }: TagsInputProps) => {
  // Handle tag input change event
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  return (
    <div className='flex w-full space-x-2'>
      <div className="flex-grow">
        <input type="text" value={tagInput} onChange={handleTagInputChange} className="w-full px-3 py-2 border border-gray-400 rounded-md font-gilroyMedium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <button type="button" onClick={handleAddTag} className="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
        Add Tag
      </button>
    </div>
  )
}

export default TagsInput;