"use client";
import { userData } from "@interfaces/UserData.interface";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from '@assets/logo.png'
import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const [userData ,setUserData] = useState<userData>({
    email: "",
    password: ""
  });

  const router = useRouter();
  
  const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {...prev , [e.target.name]: e.target.value}
    })
  } 

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: userData.email,
      password: userData.password,
      callbackUrl: "/"
    });
    if(res && !res.error){
      router.push("/");
    }else{
      toast.error('Invalid email or password');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 px-3">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        <h1 className="text-4xl font-gilroyHeavy mb-8">Login</h1>
        <button className="bg-white text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full mb-5 font-gilroyBold relative h-10">
          <i className="absolute left-5 top-1">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
          </i> 
          <span>Login with Google</span>
        </button>
        <div>
          <p className="font-gilroyHeavy mb-4">OR</p>
        </div>
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className=" rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold" name="email" onChange={handleWrite} value={userData.email}/>
          <input type="password" placeholder="Password" className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold" name="password" onChange={handleWrite} value={userData.password}/>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold">Login</button>
        </form>
        <Link href="/auth/register" className="mt-4 font-gilroyBold text-gray-500 hover:text-black">
          Don't have account? Register now!
        </Link>
      </div>
    </div>
  )
}
export default Login;