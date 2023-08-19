"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import LoginButton from '@components/LoginButton';

// Content component - displays the content on the navbar
const Content = () => {
  const [showResponsive, setShowResponsive] = useState(false);
  return (
    <>
      <div className='flex-1 sm:flex hidden justify-center items-center gap-4'>
        <Link href="/test" className='font-gilroyBold text-sm hover:text-gray-300'>ADD PROMPT</Link>
        <Link href="/test" className='font-gilroyBold text-sm hover:text-gray-300'>SAVED PROMPTS</Link>
      </div>
      <div 
        className='flex-1 flex sm:hidden justify-end items-center'
      >
        <div onClick={() => setShowResponsive(!showResponsive)}>
          <svg width="36px" height="36px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" d="M14 5H2V3h12v2zm0 4H2V7h12v2zM2 13h12v-2H2v2z"/></svg>
        </div>
      </div>
      { // Responsive menu for mobile devices 
        showResponsive &&
        <div className='absolute top-12 bg-blue-700 w-full left-0 pt-2 pb-5 flex flex-wrap sm:hidden z-10'>
          <Link href="/test" className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center'>ADD PROMPT</Link>
          <Link href="/test" className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center'>SAVED PROMPTS</Link>
          <div className='mx-auto py-3'>
            <LoginButton />
          </div>
        </div>
      }
      
    </>
  )
}

export default Content;