"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import LoginButton from '@components/LoginButton';
import { signOut, useSession } from 'next-auth/react';

// Content component - displays the content on the navbar
const Content = () => {
  const session = useSession();
  const [showResponsive, setShowResponsive] = useState(false);
  return (
    <>
      <div className='flex-2 sm:flex hidden justify-center items-center gap-4'>
        <Link href="/prompt/add" className='font-gilroyBold text-sm hover:text-gray-300'>ADD PROMPT</Link>
        <Link href="/user/saved" className='font-gilroyBold text-sm hover:text-gray-300'>SAVED PROMPTS</Link>
      </div>
      <div 
        className='flex-1 flex sm:hidden justify-end items-center'
      >
        <div onClick={() => setShowResponsive(!showResponsive)}>
          <i className="bi bi-list text-2xl"></i>
        </div>
      </div>
      { // Responsive menu for mobile devices 
        showResponsive &&
        <div className='absolute top-12 bg-blue-700 w-full left-0 pt-2 pb-5 flex flex-wrap sm:hidden z-10'>
          <Link href="/prompt/add" className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center'>ADD PROMPT</Link>
          <Link href="/user/saved" className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center'>SAVED PROMPTS</Link>
          {
            session.status === 'unauthenticated' ?
            <div className='mx-auto py-3'>
              <LoginButton />
            </div>
            : 
            <>
              <Link href="/user/prompts" className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center'>MY PROMPTS</Link>
              {
                session.data?.user?.provider === 'credentials' 
                ? <Link href="/auth/reset-password" className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center'>CHANGE PASSWORD</Link>
                : null
              }
              <p className='font-gilroyBold text-xl py-3 hover:text-gray-300 w-full text-center' onClick={() => signOut()}>LOGOUT</p>
            </>
          }

        </div>
      }
      
    </>
  )
}

export default Content;