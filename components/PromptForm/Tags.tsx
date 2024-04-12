import React, { useState } from 'react'
import TagsList from './TagsList';
import TagsInput from './TagsInput';
import { useFormValidate } from '@hooks/useFormValidate';
import { toast } from 'react-toastify';

interface TagsProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagsError: string | null;
}

const Tags = ({ tags, setTags, tagsError }: TagsProps) => {
  const [tagInput, setTagInput] = useState('');

  const { validateTags } = useFormValidate();

  // Handle add tag event
  const handleAddTag = () => {
    const errors = validateTags({ tags, tagInput });
    console.log(errors)
    // Check if tag input is not empty and tag is not already in tags array 
    if (!errors.tagInput && !errors.tags) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }else{
      toast.error(errors.tagInput || errors.tags);
    }
  }


  return (
    <>
      <label htmlFor="tags" className="text-lg text-gray-700 font-gilroyBold dark:text-zinc-200">Tags:</label>
      <div className="flex flex-wrap">
        <TagsList tags={tags} setTags={setTags} />
        <TagsInput tagInput={tagInput} setTagInput={setTagInput} handleAddTag={handleAddTag} tagsError={tagsError}/>
      </div>
    </>
  )
}

export default Tags;