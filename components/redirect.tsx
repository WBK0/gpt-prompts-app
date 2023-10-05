"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Redirect = () => {
  const [time, setTime] = useState<number>(4000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 10);
    }, 10);

    if(time === 0){
      clearInterval(intervalId);
      router.push('/auth/login');
    }

    return () => clearInterval(intervalId);
  }, [time])
  
  const router = useRouter();

  return (
    <div className="relative mt-3 ">
      <div className="border-2 border-blue-500 absolute" style={{width: (time * 100 / 4000 + "%"), display: time !== 0 ? 'block' : 'none'}}>
      </div>
    </div>
  )
}
export default Redirect;