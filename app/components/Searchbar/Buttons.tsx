import React from 'react'

// Buttons component - displays the buttons for searching prompts and saved prompts
const Buttons = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col sm:flex-row mt-6'>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md mb-4 sm:mb-0 sm:mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
          Saved prompts
        </button>
        <button 
          className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
          type='submit'  
        >
          Search prompts
        </button>
      </div>
    </div>
  )
}

export default Buttons;