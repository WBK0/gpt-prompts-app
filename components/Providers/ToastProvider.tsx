"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar= {false}
        closeOnClick= {true}
        pauseOnHover= {true}
        draggable= {true}
        theme= "colored"
      />
      {children}
      
    </>
  );
}