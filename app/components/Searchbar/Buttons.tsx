import React from 'react'

// Buttons component - displays the buttons for searching prompts and saved prompts
const Buttons = () => {
  return (
    <div className='mt-7 flex gap-3'>
      <button className='w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 py-3 rounded-xl text-white font-gilroyBold'>
        Search
      </button>
      <button className='w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 py-3 rounded-xl text-white font-gilroyBold'>
        Saved prompts
      </button>
    </div>
  )
}

export default Buttons;