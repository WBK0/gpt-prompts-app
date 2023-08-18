import React from 'react'
import Link from 'next/link';

// Content component - displays the content of the navbar
const Content = () => {
  return (
    <div className='flex-1 flex justify-center items-center gap-4'>
      <Link href="/test" className='font-gilroyBold text-sm hover:text-gray-300'>ADD PROMPT</Link>
      <Link href="/test" className='font-gilroyBold text-sm hover:text-gray-300'>SAVED PROMPTS</Link>
    </div>
  )
}

export default Content;