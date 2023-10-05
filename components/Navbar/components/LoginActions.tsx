"use client";
import LoginButton from '@components/LoginButton';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { signOut } from "next-auth/react"
import { useTheme } from '@contexts/ThemeContext';

// LoginActions component - displays the login actions on the navbar
const LoginActions = () => {
  const session = useSession();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

  const { toggleTheme } = useTheme();
  
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

  const handleThemeChange = () => {
    toggleTheme();
    handleCloseSubmenu();
  }  

  return (
    <div className="flex-1 sm:flex hidden items-center justify-end">
      <div className="relative" ref={submenuRef}>
        {session.status === 'unauthenticated' ? (
          <LoginButton />
        ) : (
          <div className="relative">
            {session.data?.user && (
              <button className="flex" onClick={handleChange}>
                {session.data.user.image ? (
                  <Image src={session.data.user.image} width={40} height={40} alt="User image" className="rounded-full" />
                ) : 
                  <i className="bi bi-person-circle text-[28px]"></i>
                }
              </button>
            )}
            {showSubmenu && (
              <div className="absolute right-0 mt-1 bg-white dark:bg-zinc-900 dark:border-noneborder border-gray-300 shadow-md min-w-[200px] flex justify-center flex-wrap py-2 font-gilroyBold">
                <Link href="/user/prompts" className="py-2 px-4 text-black w-full text-center hover:bg-gray-100 dark:text-zinc-300 hover:dark:bg-zinc-800" onClick={handleCloseSubmenu}>
                  MY PROMPTS
                </Link>
                {
                  session.data?.user?.provider === 'credentials'
                  ? <Link href="/auth/reset-password" className="py-2 px-4 text-black w-full text-center hover:bg-gray-100 dark:text-zinc-300 hover:dark:bg-zinc-800" onClick={handleCloseSubmenu}>
                      CHANGE PASSWORD
                    </Link>
                  : null
                }
                <p className="py-2 px-4 text-black w-full text-center hover:bg-gray-100 dark:text-zinc-300 hover:dark:bg-zinc-800 cursor-pointer" onClick={handleThemeChange}>
                  CHANGE THEME
                </p>
                <p className="py-2 px-4 text-black w-full text-center hover:bg-gray-100 cursor-pointer dark:text-zinc-300 hover:dark:bg-zinc-800" onClick={() => signOut()}>
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