import React, { useEffect } from 'react'

const SubmitButton = () => {

  const test = async () => {

    // fetch post request to /api/prompt/add
    const data = {
      title: 'test title',
      prompt: 'test prompt'
      // tags: ['test', 'tags']
    }
    fetch('/api/prompt/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    test();
  }, [])

  return (
    <button 
      // type="submit" 
      className="block px-3 py-2 mx-auto mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      onClick={(e) => test()}
    >
      Add prompt
    </button>
  )
}

export default SubmitButton;