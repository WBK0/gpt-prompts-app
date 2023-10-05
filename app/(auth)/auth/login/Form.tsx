"use client";
import AuthButton from "@components/Auth/AuthButton";
import AuthInput from "@components/Auth/AuthInput";
import { useLoginValidate } from "@hooks/useLoginValidate";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { userData } from "@interfaces/UserData.interface";
import { useRouter } from "next/navigation";
import EmailSendModal from "@components/Modal/EmailSendModal";

const Form = () => {
  const [userData ,setUserData] = useState<userData>({
    email: "",
    password: ""
  });
  const [emailError, setEmailError] = useState<null | string>(null)
  const [focusElement, setFocusElement] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { validateLogin } = useLoginValidate();
  const router = useRouter();

  const handleFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusElement(e.target.name)
  }

  const handleBlur = async () => {
    setFocusElement(null)
  }

  const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {...prev , [e.target.name]: e.target.value}
    })
  } 

  const handleSubmit = async (e : React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const validateErrors = validateLogin(userData);
      setEmailError(validateErrors)
      if(emailError){
        throw new Error(emailError);
      }
      const res = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
        callbackUrl: "/"
      });

      if(res?.error === "Account is not active"){
        setIsModalOpen(true);
        throw new Error("Please active your account before login");
      }

      if(res && res.error){
        setUserData({
          ...userData,
          password: ''
        });
        throw new Error('Log in failed, you provided wrong email or password');
      }
      router.push("/");
    } catch (error : unknown) {
      if(error instanceof Error){
        toast.error(error.message);
      }
    }
    finally{
      setIsSubmitting(false);
    }
  }
  
  return (
    <>
      {
        isModalOpen
        ? <EmailSendModal 
            handleClose={() => setIsModalOpen(false)}
            email={userData.email}
            title="Active account"
            content="We sent you an e-mail to confirm your account. Please check your inbox and click on the link to activate your account."
            url="/auth/activate/resend-email"
          />
        : null
      }
      <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
        <AuthInput
          name="email"
          placeholder="Email"
          type="email"
          handleWrite={handleWrite}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          value={userData.email}
          error={emailError}
          isFocus={focusElement === 'email'}
        />
        <AuthInput
          name="password"
          placeholder="Password"
          type="password"
          handleWrite={handleWrite}
          value={userData.password}
        />
        <AuthButton
          isSubmitting={isSubmitting}
        >
          Login
        </AuthButton>
      </form>
    </>
  )
}
export default Form;