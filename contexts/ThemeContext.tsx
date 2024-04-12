"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children } : { children : React.ReactNode}) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = (typeof window !== 'undefined') ? localStorage.getItem('theme') : null;
    return storedTheme || 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if(localStorage.getItem('theme') === null) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }else{
        setTheme(localStorage.getItem('theme') || 'light');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);