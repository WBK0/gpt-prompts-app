import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

interface SubmitButtonProps {
  handleSubmit: (e: React.FormEvent) => void
}

const SubmitButton = ({ handleSubmit } : SubmitButtonProps) => {
  return (
    <button 
      type="submit" 
      className="block px-3 py-2 mx-auto mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      onClick={handleSubmit}
    >
      Add prompt
    </button>
  )
}

export default SubmitButton;