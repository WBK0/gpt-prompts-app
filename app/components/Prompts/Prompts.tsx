import React from 'react'

const Prompts = () => {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-5xl font-gilroyHeavy text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 drop-shadow p-4'>MOST POPULAR</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 mx-3'>
        <div className='bg-white rounded-lg shadow-md flex flex-col justify-between'>
          <div>
            <h3 className='text-lg font-gilroyBold text-gray-900 p-4 pb-1'>How to create a successful social media marketing campaign</h3>
            <p className='text-sm font-gilroyLight text-gray-500 p-4 pb-0'>#socialmedia #marketing #campaign</p>
            <div className='p-4'>
              <p className='text-sm font-gilroyLight text-gray-600 mt-1'>Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.</p>
            </div>
          </div>
          <div className='flex justify-end items-center p-4'>
            <button className='bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg'>Read more</button>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md flex flex-col justify-between'>
          <div>
            <h3 className='text-lg font-gilroyBold text-gray-900 p-4 pb-1'>How to create a successful social media marketing campaign</h3>
            <p className='text-sm font-gilroyLight text-gray-500 p-4 pb-0'>#socialmedia #marketing #campaign</p>
            <div className='p-4'>
              <p className='text-sm font-gilroyLight text-gray-600 mt-1'>Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.</p>
            </div>
          </div>
          <div className='flex justify-end items-center p-4'>
            <button className='bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg'>Read more</button>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md flex flex-col justify-between'>
          <div>
            <h3 className='text-lg font-gilroyBold text-gray-900 p-4 pb-1'>How to create a successful social media marketing campaign</h3>
            <p className='text-sm font-gilroyLight text-gray-500 p-4 pb-0'>#socialmedia #marketing #campaign</p>
            <div className='p-4'>
              <p className='text-sm font-gilroyLight text-gray-600 mt-1'>Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.</p>
            </div>
          </div>
          <div className='flex justify-end items-center p-4'>
            <button className='bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg'>Read more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prompts;