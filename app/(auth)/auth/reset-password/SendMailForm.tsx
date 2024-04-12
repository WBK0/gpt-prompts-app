"use client";
import AuthInput from "@components/Auth/AuthInput";
import { useState } from "react";
import AuthButton from "@components/Auth/AuthButton";
import Link from "next/link";
import { toast } from "react-toastify";
import EmailSendModal from "@components/Modal/EmailSendModal";

const SendMailForm = ({ sessionEmail, sessionProvider } : { sessionEmail?: string | null, sessionProvider: string | unknown}) => {
  const [email, setEmail] = useState<string>(sessionEmail || "");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        setIsModalOpen(true);
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
    <>
      {
        isModalOpen
        ? <EmailSendModal
            handleClose={() => setIsModalOpen(false)}
            email={email}
            title="Reset password"
            content="We sent you an email with a link to reset your password. Please check your inbox and follow the instructions."
            url="/auth/reset-password/send-email"
          />
        : null
      }
      {
        sessionProvider === "credentials" || !sessionProvider
        ? 
        <>
          <h1 className="text-4xl font-gilroyHeavy mb-8 dark:text-white">Reset Password</h1>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <AuthInput
                name="email"
                placeholder="Email"
                type="email"
                handleWrite={(e) => setEmail(e.target.value)}
                value={email}
                disabled={sessionEmail ? true : false}
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
    </>
  )
}
export default SendMailForm;