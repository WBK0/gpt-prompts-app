import React from 'react'
import Image from 'next/image';
import logo from '@assets/logo.png'

// Logo component - displays the logo on the navbar
const Logo = () => {
  return (
    <div className='flex-none'>
      <Image src={logo} width={40} height={40} alt='logo' />
    </div>
  )
}

export default Logo;