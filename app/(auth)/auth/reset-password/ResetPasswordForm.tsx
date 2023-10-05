"use client";
import AuthButton from "@components/Auth/AuthButton";
import AuthInput from "@components/Auth/AuthInput";
import { ResetPasswordErrors, useLoginValidate } from "@hooks/useLoginValidate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordForm = ({ token } : { token: string }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    passwordConfirmation: ""
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({
    password: null,
    passwordConfirmation: null
  });
  const [focusElement, setFocusElement] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const { validateResetPassword } = useLoginValidate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const validateErrors = validateResetPassword(passwords);
      setErrors(validateErrors);
      
      if(validateErrors.password || validateErrors.passwordConfirmation){
        throw new Error(validateErrors.password || validateErrors.passwordConfirmation || "Error");
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          password: passwords.password,
          passwordConfirmation: passwords.passwordConfirmation
        })
      })
      if(res.ok){  
        router.push("/auth/reset-password/success")
      }else{
        const data = await res.json();
        throw new Error(data);
      }

    } catch (error : unknown) {
      if(error instanceof Error)
      {
        toast.error(error.message);
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusElement(e.target.name)
  }

  const handleBlur = async () => {
    setFocusElement(null)
  }

  return (
    <>
      <h1 className="text-4xl font-gilroyHeavy mb-8 dark:text-white">Reset Password</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInput
          name="password"
          placeholder="Password"
          type="password"
          error={errors.password}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          handleWrite={handleWrite}
          isFocus={focusElement === "password"}
          value={passwords.password}
        />
        <AuthInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          type="password"
          error={errors.passwordConfirmation}
          handleWrite={handleWrite}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocus={focusElement === "passwordConfirmation"}
          value={passwords.passwordConfirmation}
        />
        <AuthButton 
          isSubmitting={isSubmitting}
        >
          Reset password
        </AuthButton>
      </form>
    </>
  )
}
export default ResetPasswordForm;