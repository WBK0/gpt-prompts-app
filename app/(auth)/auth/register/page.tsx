"use client";
import { userData } from "@interfaces/UserData.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from '@assets/logo.png'
import { signIn } from "next-auth/react";

const Register = () => {
  const [userData ,setUserData] = useState<userData>({
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  })
  
  const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {...prev , [e.target.name]: e.target.value}
    })
  } 

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        firstname: userData.firstname,
        lastname: userData.lastname
      }),
      
    });
    console.log(res)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        <h1 className="text-4xl font-gilroyHeavy mb-8">Register</h1>
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
          <input type="text" placeholder="Firstname" className=" rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold" name="firstname" onChange={handleWrite} value={userData.firstname}/>
          <input type="text" placeholder="Lastname" className=" rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold" name="lastname" onChange={handleWrite} value={userData.lastname}/>
          <input type="email" placeholder="Email" className=" rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold" name="email" onChange={handleWrite} value={userData.email}/>
          <input type="password" placeholder="Password" className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold" name="password" onChange={handleWrite} value={userData.password}/>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold">Register</button>
        </form>
        <Link href="/auth/login" className="mt-4 font-gilroyBold text-gray-500 hover:text-black">
          Have an account? Login now!
        </Link>
      </div>
    </div>
  )
}
export default Register;