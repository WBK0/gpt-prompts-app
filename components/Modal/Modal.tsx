import React, { useEffect, useRef } from 'react'

interface ModalProps{
  handleClose: () => void;
  handleSubmit: () => void;
}

const Modal = ({ handleClose, handleSubmit } : ModalProps) => { 
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);


  const handleClickOutside = (e: MouseEvent) => {
    if(elementRef.current !== null && !elementRef.current.contains(e.target as Node)) {
      handleClose();
    }
  }
  
  return (
    <div className='fixed bg-black/50 w-full h-screen left-0 top-0 flex justify-center items-center'>
      <div className='bg-white dark:bg-zinc-900 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 2xl:w-1/4 px-6 py-6 rounded-xl relative' ref={elementRef}>
        <button 
          className='absolute right-3 top-3 text-xl font-gilroyHeavy z-10 dark:text-white'
          onClick={handleClose}
        >
          X
        </button>
        <div className='absolute top-3 left-0 w-full'>
          <h3 className='text-center font-gilroyBold dark:text-white'>
            DELETE PROMPT
          </h3>
        </div>
        <div className='mt-10 flex justify-center flex-wrap mb-6'>
          <p className='w-full text-center font-gilroyMedium text-lg dark:text-zinc-300'>
            Do you wanna to delete prompt with title:
          </p>
          <p className='w-full text-center font-gilroyBold mt-2 text-lg dark:text-zinc-200'>
            EXAMPLE PROMPT
          </p>
          <button className='bg-red-800 rounded-xl px-5 py-1 text-white font-gilroyBold mt-5 hover:bg-red-900' onClick={handleSubmit}>
            CONFIRM
          </button>
        </div>
        
      </div>  
    </div>
  )
}

export default Modal;