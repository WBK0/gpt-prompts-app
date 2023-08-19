import React from 'react'
import Logo from './components/Logo';
import LoginActions from './components/LoginActions';
import Content from './components/Content';

// Navbar component - displays the navbar
const Navbar = () => {
  return (
    <nav className='fixed w-full bg-blue-700 h-12 text-white flex items-center p-3 z-20'>
      <div className='container mx-auto flex gap-2'>
        <Logo />
        <Content />
        <LoginActions />
      </div>
    </nav>
  )
}

export default Navbar;