import React from 'react'

const SubmitButton = () => {
  return (
    <button 
      type="submit" 
      className="block px-3 py-2 mx-auto mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
    >
      Add prompt
    </button>
  )
}

export default SubmitButton;