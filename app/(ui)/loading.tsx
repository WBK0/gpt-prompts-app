import Loader from '@components/Loader';
import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Loader />
    </div>
  )
}

export default Loading;