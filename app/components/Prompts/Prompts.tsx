import React from 'react'
import Image from 'next/image';

const Prompts = () => {
  return (
    <div className='flex flex-wrap'>
      <h2 className='text-5xl font-gilroyHeavy w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 drop-shadow'>PROMTS</h2>
      <div className='py-10 w-full mt-12 bg-white px-3'>
        <h4 className='font-gilroyBold text-2xl text-gray-800 text-center'>Prompt for generation a blog post for the blog with the new trends</h4>
        <p className='font-gilroyMedium text-lg mt-4'>Explore the concept of a minimalist approach to fashion - how to curate chic and cohesive outfits with a limited number of clothing pieces? Share your advice on crafting a capsule wardrobe, selecting essential items, and creating ...</p>
        <Image src='https://lh3.google.com/u/0/ogw/AGvuzYZtBfaYDa925u4oCRvYqV8P4GVC06xtCmg5LRN_=s32-c-mo' width={64} height={64} className='mt-5 rounded-full' alt='user icon' />
        <span>tets</span>
      </div>
    </div>
  )
}

export default Prompts;