"use client";
import { userData } from "@interfaces/UserData.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from '@assets/logo.png'
import { RegisterErrors, useLoginValidate } from "@hooks/useLoginValidate";
import Loader from "@components/Loader";

const Register = () => {
  const [userData ,setUserData] = useState<userData>({
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  })
  const [errors, setErrors] = useState<RegisterErrors>({
    email: null,
    password: null,
    firstname: null,
    lastname: null
  })
  const [focusElement, setFocusElement] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { validateRegister } = useLoginValidate();

  const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {...prev , [e.target.name]: e.target.value}
    })
  } 

  console.log(errors)

  const handleSubmit = async (e : React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const validateErrors = validateRegister(userData);
      setErrors({...validateErrors});
      if(validateErrors.email || validateErrors.password || validateErrors.firstname || validateErrors.lastname){
        throw new Error("Validation error");
      }
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
      })
      console.log(res)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusElement(e.target.name)
  }

  const handleBlur = async () => {
    setFocusElement(null)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 px-3 sm:px-0">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        <h1 className="text-4xl font-gilroyHeavy mb-8">Register</h1>
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Firstname" 
            className={`rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold ${errors.firstname ? 'ring-2 ring-red-600' : null}`} 
            name="firstname" 
            onChange={handleWrite} 
            onFocus={handleFocus} 
            onBlur={handleBlur}
            value={userData.firstname}
          />
            {
              errors.firstname && focusElement === 'firstname' ? <p className="text-red-600 font-gilroyBold text-sm">{errors.firstname}</p> : null
            }
          <input 
            type="text" 
            placeholder="Lastname" 
            className={`rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold ${errors.lastname ? 'ring-2 ring-red-600' : null}`} 
            name="lastname" 
            onChange={handleWrite} 
            value={userData.lastname}
            onFocus={handleFocus} 
            onBlur={handleBlur}
          />
            {
              errors.lastname && focusElement === 'lastname' ? <p className="text-red-600 font-gilroyBold text-sm">{errors.lastname}</p> : null
            }
          <input 
            type="email" 
            placeholder="Email" 
            className={`rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold ${errors.email ? 'ring-2 ring-red-600' : null}`} 
            name="email" 
            onChange={handleWrite} 
            value={userData.email}
            onFocus={handleFocus} 
            onBlur={handleBlur}
          />
            {
              errors.email && focusElement === 'email' ? <p className="text-red-600 font-gilroyBold text-sm">{errors.email}</p> : null
            }
          <input 
            type="password" 
            placeholder="Password" 
            className={`rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold ${errors.password ? 'ring-2 ring-red-600' : null}`} 
            name="password" 
            onChange={handleWrite} 
            value={userData.password}
            onFocus={handleFocus} 
            onBlur={handleBlur}
          />
            {
              errors.password && focusElement === 'password' ? <p className="text-red-600 font-gilroyBold text-sm">{errors.password}</p> : null
            }
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold h-10">
            {
              isSubmitting 
              ? 
                <div className="border-4 border-r-transparent border-b-transparent rounded-full border-white animate-spin w-6 h-6 mx-auto" />
              : 
                <span>Register</span>
            }
            
          </button>
        </form>
        <Link href="/auth/login" className="mt-4 font-gilroyBold text-gray-500 hover:text-black">
          Have an account? Login now!
        </Link>
      </div>
    </div>
  )
}
export default Register;