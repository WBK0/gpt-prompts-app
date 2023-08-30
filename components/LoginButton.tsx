"use client";
import { signIn } from 'next-auth/react';

// Reusable LoginButton component - displays the login button
const LoginButton = () => {
  return (
    <>
      <button
        className="bg-white text-black px-6 py-1.5 text-sm font-gilroyBold rounded-full"
        onClick={() => signIn('google')}
      >
        LOGIN
      </button>
    </>
  );
};

export default LoginButton;