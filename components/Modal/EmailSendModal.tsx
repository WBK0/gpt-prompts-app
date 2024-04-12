import React, { useEffect, useRef } from 'react'
import { toast } from 'react-toastify';

interface ActiveAccountModalProps{
  handleClose: () => void;
  email: string;
  title: string;
  content: string;
  url: string;
}

const EmailSendModal = ({ handleClose, email, title, content, url } : ActiveAccountModalProps) => { 
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

  const handleResendEmail = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    })

    if(res.ok){
      toast.success("E-mail sent successfully!");
    }else{
      toast.error("Something went wrong during sending e-mail. Please try again later.");
    }
  }
  
  return (
    <div className='fixed bg-black/50 w-full h-screen left-0 top-0 flex justify-center items-center'>
      <div className='bg-white dark:bg-zinc-900 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 2xl:w-1/4 px-6 py-6 rounded-xl relative' ref={elementRef}>
        <button 
          className='absolute right-3 top-2 text-xl font-gilroyHeavy z-10 dark:text-white'
          onClick={handleClose}
        >
          X
        </button>
        <div className='absolute top-3 left-0 w-full'>
          <h3 className='text-center font-gilroyBold uppercase dark:text-white'>
            {title}
          </h3>
        </div>
        <div className='mt-10 flex justify-center flex-wrap mb-4'>
          <h1 className='font-gilroyBold text-center dark:text-zinc-100'>
            {content}
          </h1>
          <p className='font-gilroyMedium mt-5 dark:text-zinc-200'>
            If you didn't receive the e-mail, please check your spam folder. If you still can't find it, click on the button below to resend the e-mail.
          </p>
          <button 
            className='w-full rounded-xl text-center bg-blue-500 text-white py-2 font-gilroyBold hover:bg-blue-600 cursor-pointer mt-6'
            onClick={() => handleResendEmail()}
          >
            Resend e-mail
          </button>
        </div>
      </div>  
    </div>
  )
}

export default EmailSendModal;