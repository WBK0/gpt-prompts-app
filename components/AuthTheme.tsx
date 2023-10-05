"use client";

import { useTheme } from "@contexts/ThemeContext";

const AuthTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
      {
        theme === 'dark'
        ? <i className="bi bi-brightness-high-fill text-4xl text-white cursor-pointer hover:text-yellow-200" onClick={toggleTheme}></i>
        : <i className='bi bi-moon-fill text-4xl text-zinc-800 cursor-pointer hover:text-zinc-600' onClick={toggleTheme}></i>

      }

    </div>
  )
}
export default AuthTheme;