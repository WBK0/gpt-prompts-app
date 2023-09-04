"use client";
import LoginButton from '@components/LoginButton';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { signOut } from "next-auth/react"

// LoginActions component - displays the login actions on the navbar
const LoginActions = () => {
  const session = useSession();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  
  console.log(session)

  const handleChange = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleCloseSubmenu = () => {
    setShowSubmenu(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        handleCloseSubmenu();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-none sm:flex hidden items-center">
      <div className="relative" ref={submenuRef}>
        {session.status === 'unauthenticated' ? (
          <LoginButton />
        ) : (
          <div className="relative">
            {session.data?.user && (
              <button className="flex" onClick={handleChange}>
                {session.data.user.image ? (
                  <Image src={session.data.user.image} width={40} height={40} alt="User image" className="rounded-full" />
                ) : null}
              </button>
            )}
            {showSubmenu && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-300 shadow-md min-w-[200px] flex justify-center flex-wrap py-2 font-gilroyBold">
                <Link href="/prompt/add" className="py-2 px-4 text-black w-full text-center hover:bg-gray-100" onClick={handleCloseSubmenu}>
                  MY PROMPTS
                </Link>
                <p className="py-2 px-4 text-black w-full text-center hover:bg-gray-100 cursor-pointer" onClick={() => signOut()}>
                  LOGOUT
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginActions;