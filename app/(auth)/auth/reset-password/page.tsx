"use client";
import Image from "next/image";
import logo from '@assets/logo.png'
import AuthInput from "@components/Auth/AuthInput";
import { useEffect, useState } from "react";
import AuthButton from "@components/Auth/AuthButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [provider, setProvider] = useState<unknown>("");

  const session = useSession();

  useEffect(() => {
    if(session.data?.user?.email){
      setEmail(session.data.user.email);
      setProvider(session.data.user.provider);
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/reset-password/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      })
      if(response.ok){
        toast.success("Email sent successfully");
      }else{
        throw new Error("Error sending email");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 px-3">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        {
          provider === "credentials"
          ? 
          <>
            <h1 className="text-4xl font-gilroyHeavy mb-8">Reset Password</h1>
              <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                <AuthInput
                  name="email"
                  placeholder="Email"
                  type="email"
                  handleWrite={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={true}
                />
                <AuthButton
                  isSubmitting={isSubmitting}
                >
                  Reset password
                </AuthButton>
              </form>
          </>
          : 
          <>
            <h1 className="text-2xl font-gilroyHeavy mb-6 text-center">You can't change password using Google provider</h1>
            <Link href={'/'} className="bg-blue-500 hover:bg-blue-600 text-white font-gilroyBold py-2 px-4 rounded-lg w-full text-center">
              Go to home page
            </Link>
          </>
        }
      </div> 
    </div>
  )
}
export default ResetPassword;