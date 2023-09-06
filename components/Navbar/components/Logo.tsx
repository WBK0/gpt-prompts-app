import React from 'react'
import Image from 'next/image';
import logo from '@assets/logo.png'
import Link from 'next/link';

// Logo component - displays the logo on the navbar
const Logo = () => {
  return (
    <div className='flex-1'>
      <Link href={'/'}>
        <Image src={logo} width={40} height={40} alt='logo' />
      </Link>
    </div>
  )
}

export default Logo;