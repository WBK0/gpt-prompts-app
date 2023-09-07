import React, { useState } from 'react'
import TagsList from './TagsList';
import TagsInput from './TagsInput';

interface TagsProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Tags = ({ tags, setTags }: TagsProps) => {
  const [tagInput, setTagInput] = useState('')

  // Handle add tag event
  const handleAddTag = () => {
    // Check if tag input is not empty and tag is not already in tags array 
    if (tagInput.trim() !== '' && tags.indexOf(tagInput.trim()) === -1) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  return (
    <>
      <label htmlFor="tags" className="text-lg text-gray-700 font-gilroyBold">Tags:</label>
      <div className="flex flex-wrap">
        <TagsList tags={tags} setTags={setTags} />
        <TagsInput tagInput={tagInput} setTagInput={setTagInput} handleAddTag={handleAddTag} />
      </div>
    </>
  )
}

export default Tags;