import LoginButton from '@components/LoginButton';
import React from 'react'

// LoginActions component - displays the login actions on the navbar
const LoginActions = () => {
  return (
    <div className='flex-none sm:flex hidden items-center'>
      <LoginButton />
    </div>
  )
}

export default LoginActions;