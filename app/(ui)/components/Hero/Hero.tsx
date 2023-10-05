import React from 'react'

// Hero component - displays the title and subtitle
const Hero = () => {
  return (
    <div className='max-w-xl '>
      <h1 className="text-center">
        <p className='font-gilroyHeavy text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500'>
          GPT PROMPTS APP
        </p>
        <p className='mt-2 font-gilroyHeavy text-3xl text-gray-800 dark:text-zinc-300'>
          Search best prompts for your usage
        </p>
      </h1>
    </div>
  )
}

export default Hero;