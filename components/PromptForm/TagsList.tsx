import React from 'react'

interface TagsListProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsList = ({ tags, setTags } : TagsListProps) => {
  // Handle remove tag event
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index)); // Remove tag from tags array by index
  }

  return (
    <div className='flex flex-wrap w-full gap-2 mb-4'>
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center max-w-full px-3 py-2 space-x-2 bg-gray-200 dark:bg-zinc-600 dark:text-zinc-100 rounded-md font-gilroyMedium">
          <span className='max-w-full truncate'>{tag}</span>                  
          <button type="button" onClick={() => handleRemoveTag(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586l-2.293-2.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

export default TagsList;